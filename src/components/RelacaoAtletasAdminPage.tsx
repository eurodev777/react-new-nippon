import React, { useState, useEffect } from 'react';
import { ArrowLeft, Loader2, CheckCircle, Plus, PlusCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function RelacaoAtletasAdminPage() {
  const [dados, setDados] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [categoriaAtual, setCategoriaAtual] = useState(0);
  const [savingStatus, setSavingStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // FUNÇÃO EXTRATORA UNIVERSAL DE ID
  const obterId = (obj: any): string | number | undefined => {
    if (!obj || typeof obj !== 'object') return undefined;
    
    const chavesComuns = [
      'id', 'categoria_id', 'id_categoria', 
      'equipe_id', 'id_equipe', 'atleta_id', 'id_atleta',
      'idCategoria', 'idEquipe', 'idAtleta'
    ];
    
    for (const chave of chavesComuns) {
      if (obj[chave] !== undefined && obj[chave] !== null && String(obj[chave]) !== 'undefined') {
        return obj[chave];
      }
    }

    const chaveAlternativa = Object.keys(obj).find(k => 
      k.toLowerCase().includes('id') && 
      obj[k] !== undefined && 
      obj[k] !== null && 
      String(obj[k]) !== 'undefined'
    );

    if (chaveAlternativa) return obj[chaveAlternativa];
    return undefined;
  };

  const carregarDados = async () => {
    try {
      const response = await fetch('https://sothink.com.br/apinippon/api/v2/nippon/listar?tabela=completo');
      const json = await response.json();
      setDados(json);
    } catch (error) {
      console.warn('API falhou ao carregar dados oficiais.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const salvarAlteracaoNoServidor = async (
    tipo: 'categoria' | 'equipe' | 'atleta',
    id: any,
    novoValor: string,
    parentId?: number | string,
    eqIdx?: number,
    atlIdx?: number
  ) => {
    if (!novoValor.trim()) return;

    const ehNovoRegistro = 
      !id ||
      String(id).startsWith('novo-') || 
      String(id).startsWith('atl-temp-');

    // INSPEÇÃO DEFENSIVA: Se for novo e o ID do pai sumiu, para tudo e analisa o objeto
    if (ehNovoRegistro && (tipo === 'equipe' || tipo === 'atleta')) {
      if (!parentId || String(parentId) === 'undefined' || String(parentId) === 'null') {
        
        // Pega o objeto pai real para ver o que tem dentro dele
        const objetoPai = tipo === 'equipe' 
          ? dados?.categorias?.[categoriaAtual] 
          : dados?.categorias?.[categoriaAtual]?.equipes?.[eqIdx!];
        
        const chavesExistentes = objetoPai ? Object.keys(objetoPai) : [];
        
        console.error(`[BLOQUEIO] Objeto pai da ${tipo} não possui um ID válido.`, objetoPai);
        
        alert(
          `[Erro de Vínculo] Não foi possível salvar esta ${tipo}.\n\n` +
          `O ID do pai veio como UNDEFINED. Isso significa que o React não sabe a qual pai esse item pertence.\n\n` +
          `Campos reais que existem dentro desse pai no seu banco:\n` +
          `[${chavesExistentes.join(', ')}]\n\n` +
          `Abra o console do navegador (F12) para ver a estrutura completa que a API mandou.`
        );
        return;
      }
    }

    setSavingStatus('saving');
    console.log(`[Disparando API] Tipo: ${tipo} | ID: ${id} | Valor: ${novoValor} | ID Pai: ${parentId}`);

    try {
      let response;

      if (ehNovoRegistro) {
        const formData = new FormData();
        if (tipo === 'equipe') {
          formData.append('tabela', 'equipes');
          formData.append('categoria_id', String(parentId));
          formData.append('nome', novoValor);
        } else if (tipo === 'atleta') {
          formData.append('tabela', 'atletas');
          formData.append('equipe_id', String(parentId));
          formData.append('nome', novoValor);
        }

        response = await fetch('https://sothink.com.br/apinippon/api/v2/nippon/inserir', {
          method: 'POST',
          body: formData,
        });
      } else {
        response = await fetch('https://sothink.com.br/apinippon/api/v2/nippon/editar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tipo, id, valor: novoValor }),
        });
      }

      const textoResposta = await response.text();
      console.log('[Resposta Bruta do Servidor]:', textoResposta);

      if (!response.ok) {
        throw new Error(`Status ${response.status}. Detalhes: ${textoResposta}`);
      }

      if (!textoResposta.trim()) {
        throw new Error('O servidor respondeu com uma string vazia.');
      }

      let resJson;
      try {
        resJson = JSON.parse(textoResposta);
      } catch (e) {
        throw new Error(`Resposta não é um JSON válido:\n${textoResposta}`);
      }

      if (ehNovoRegistro && resJson.sucesso && resJson.id_inserido) {
        const novosDados = { ...dados };
        if (tipo === 'equipe' && eqIdx !== undefined) {
          const eq = novosDados.categorias[categoriaAtual].equipes[eqIdx];
          eq.id = resJson.id_inserido;
          eq.equipe_id = resJson.id_inserido;
          eq.id_equipe = resJson.id_inserido;
        } else if (tipo === 'atleta' && eqIdx !== undefined && atlIdx !== undefined) {
          const atl = novosDados.categorias[categoriaAtual].equipes[eqIdx].atletas[atlIdx];
          if (typeof atl === 'object' && atl !== null) {
            atl.id = resJson.id_inserido;
            atl.atleta_id = resJson.id_inserido;
            atl.id_atleta = resJson.id_inserido;
          }
        }
        setDados(novosDados);
      } else if (resJson.erro) {
        alert(`Aviso do Banco: ${resJson.erro}`);
      }

      setSavingStatus('saved');
      setTimeout(() => setSavingStatus('idle'), 2000);
    } catch (error: any) {
      console.error('Erro no salvamento:', error);
      alert(error.message);
      setSavingStatus('idle');
    }
  };

  const adicionarEquipeLocal = () => {
    const novosDados = { ...dados };
    const novaEquipe = {
      id: `novo-equipe-${Date.now()}`,
      nome: '',
      atletas: []
    };
    novosDados.categorias[categoriaAtual].equipes.push(novaEquipe);
    setDados(novosDados);
  };

  const adicionarAtletaLocal = (equipeIndex: number) => {
    const novosDados = { ...dados };
    const novoAtleta = {
      id: `novo-atleta-${Date.now()}`,
      nome: ''
    };

    if (!novosDados.categorias[categoriaAtual].equipes[equipeIndex].atletas) {
      novosDados.categorias[categoriaAtual].equipes[equipeIndex].atletas = [];
    }

    novosDados.categorias[categoriaAtual].equipes[equipeIndex].atletas.push(novoAtleta);
    setDados(novosDados);
  };

  const handleCategoriaChange = (novoTitulo: string) => {
    const novosDados = { ...dados };
    novosDados.categorias[categoriaAtual].titulo = novoTitulo;
    setDados(novosDados);
  };

  const handleEquipeChange = (equipeIndex: number, novoNome: string) => {
    const novosDados = { ...dados };
    novosDados.categorias[categoriaAtual].equipes[equipeIndex].nome = novoNome;
    setDados(novosDados);
  };

  const handleAtletaChange = (equipeIndex: number, atletaIndex: number, novoNome: string) => {
    const novosDados = { ...dados };
    const atletaAlvo = novosDados.categorias[categoriaAtual].equipes[equipeIndex].atletas[atletaIndex];

    if (typeof atletaAlvo === 'object' && atletaAlvo !== null) {
      novosDados.categorias[categoriaAtual].equipes[equipeIndex].atletas[atletaIndex].nome = novoNome;
    } else {
      novosDados.categorias[categoriaAtual].equipes[equipeIndex].atletas[atletaIndex] = {
        id: `novo-atleta-${Date.now()}`,
        nome: novoNome
      };
    }
    setDados(novosDados);
  };

  if (loading) {
    return <div className="p-20 text-center text-stone-500">Carregando painel de controle...</div>;
  }

  const categoria = dados?.categorias?.[categoriaAtual];
  if (!categoria) {
    return <div className="p-20 text-center text-stone-500">Nenhuma categoria encontrada.</div>;
  }

  // Monitoramento via console de como a categoria está estruturada na renderização
  console.log('[DEBUG] Dados da Categoria Ativa no estado:', categoria);

  const categoriaIdReal = obterId(categoria);

  return (
    <div className="bg-stone-50 min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto relative">

        <div className="fixed bottom-5 right-5 bg-white shadow-lg border border-gray-200 rounded-lg p-3 z-50 flex items-center gap-2 text-sm">
          {savingStatus === 'idle' && <span className="text-gray-400">As alterações salvam ao clicar fora do campo</span>}
          {savingStatus === 'saving' && (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
              <span className="text-blue-500 font-medium">Salvando dados...</span>
            </>
          )}
          {savingStatus === 'saved' && (
            <>
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-green-500 font-medium">Atualizado com sucesso!</span>
            </>
          )}
        </div>

        <button className="flex items-center text-[#c93b2b] font-semibold mb-8 hover:opacity-80 transition">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar para a Home
        </button>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {dados?.categorias?.map((cat: any, index: number) => (
              <button
                key={`cat-btn-${index}`}
                onClick={() => setCategoriaAtual(index)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition ${
                  categoriaAtual === index ? 'bg-[#c93b2b] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.titulo ? cat.titulo.replace('RELAÇÃO DOS ATLETAS - ', '') : `Categoria ${index + 1}`}
              </button>
            ))}
          </div>

          <div className="mb-6 max-w-2xl mx-auto">
            <input
              type="text"
              value={categoria.titulo || ''}
              onChange={(e) => handleCategoriaChange(e.target.value)}
              onBlur={() => salvarAlteracaoNoServidor('categoria', categoriaIdReal, categoria.titulo)}
              className="w-full text-center font-bold text-xl md:text-2xl uppercase tracking-widest text-black bg-transparent border-b border-transparent hover:border-gray-300 focus:border-black focus:bg-white px-2 py-1 outline-none transition rounded"
            />
          </div>

          <div className="flex justify-center mb-10">
            <button
              onClick={adicionarEquipeLocal}
              className="flex items-center gap-2 bg-stone-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-stone-800 transition shadow-sm"
            >
              <Plus className="w-4 h-4" /> Adicionar Nova Equipe
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {categoria?.equipes?.map((equipe: any, eqIdx: number) => {
              const equipeIdReal = obterId(equipe);
              
              return (
                <div key={equipeIdReal || `equipe-${eqIdx}`} className="flex flex-col bg-white p-4 rounded-xl shadow-sm border border-gray-100">

                  <input
                    type="text"
                    placeholder="Nome da Equipe..."
                    value={equipe.nome || ''}
                    onChange={(e) => handleEquipeChange(eqIdx, e.target.value)}
                    onBlur={() => salvarAlteracaoNoServidor('equipe', equipeIdReal, equipe.nome, categoriaIdReal, eqIdx)}
                    className="text-[#e31818] font-bold text-center text-sm md:text-[15px] mb-3 uppercase bg-transparent border-b border-gray-200 focus:border-black focus:bg-stone-50 px-1 py-1 outline-none text-ellipsis transition"
                  />

                  <div className="border-[1.5px] border-black flex flex-col bg-white rounded overflow-hidden">
                    {equipe?.atletas && equipe.atletas.length > 0 ? (
                      equipe.atletas.map((atleta: any, atlIdx: number) => {
                        const atletaNome = typeof atleta === 'object' && atleta !== null ? atleta.nome : atleta;
                        const atletaId = obterId(atleta) || `atl-temp-${atlIdx}`;
                        const isCaptain = atletaNome ? atletaNome.includes('(C)') : false;

                        return (
                          <div key={atletaId} className="border-b border-black last:border-b-0 px-2 py-1 flex items-center justify-center">
                            <input
                              type="text"
                              placeholder="Nome do atleta..."
                              value={atletaNome || ''}
                              onChange={(e) => handleAtletaChange(eqIdx, atlIdx, e.target.value)}
                              onBlur={() => salvarAlteracaoNoServidor(
                                'atleta', 
                                atletaId, 
                                atletaNome, 
                                equipeIdReal, 
                                eqIdx, 
                                atlIdx
                              )}
                              className={`w-full text-center text-[15px] text-black bg-transparent border border-transparent hover:border-gray-100 focus:border-black focus:bg-stone-50 outline-none py-1.5 px-1 rounded transition ${
                                isCaptain ? 'font-bold' : ''
                              }`}
                            />
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-4 px-2 text-center text-gray-400 text-xs italic">Nenhum atleta nesta equipe</div>
                    )}
                  </div>

                  <button
                    onClick={() => adicionarAtletaLocal(eqIdx)}
                    className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-black transition"
                  >
                    <PlusCircle className="w-3.5 h-3.5" /> Adicionar Atleta
                  </button>

                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}t