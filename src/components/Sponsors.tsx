/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SPONSORS, SUPPORTERS } from '../data';
import { Sponsor, Supporter } from '../types';
import SponsorCard from './SponsorCard';
import SupporterCard from './SupporterCard';
import { ShieldCheck, Heart, Award } from 'lucide-react';

interface SponsorsProps {
  onSelectItem: (item: Sponsor | Supporter) => void;
}

export default function Sponsors({ onSelectItem }: SponsorsProps) {
  return (
    <section className="bg-[#FCFAF2] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">

        {/* APOIO (Supporters) Section */}
        <div id="apoio" className="space-y-8 scroll-mt-20">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-nippon-red/10 text-nippon-red">
                <Heart className="h-4.5 w-4.5" />
              </span>
            </div>
            <h3 className="mt-1 font-serif text-3xl font-extrabold text-stone-900 tracking-tight">
              APOIO
            </h3>
            <p className="mt-2 text-xs font-medium text-stone-500 max-w-md mx-auto">
              Clique para detalhes e contatos diretos.
            </p>
          </div>

          {/* Compact Grid for Supporters */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 max-w-6xl mx-auto">
            {SUPPORTERS.map((supporter) => (
              <SupporterCard
                key={supporter.id}
                supporter={supporter}
                onClick={(s) => onSelectItem(s)}
              />
            ))}
            
            {/* Elegant placeholder cards as seen in Canva photo to keep visual balance */}
            <div className="hidden lg:flex h-20 items-center justify-center rounded-xl border border-dashed border-stone-200 bg-stone-50/20 text-stone-300 font-serif italic text-xs">
              Espaço Disponível
            </div>
            <div className="hidden lg:flex h-20 items-center justify-center rounded-xl border border-dashed border-stone-200 bg-stone-50/20 text-stone-300 font-serif italic text-xs">
              Espaço Disponível
            </div>
          </div>
        </div>

                {/* PATROCÍNIO (Sponsors) Section */}
                <div id="patrocinio" className="space-y-8 scroll-mt-20">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 text-gold-dark">
                <Award className="h-4.5 w-4.5" />
              </span>
            </div>
            <h3 className="mt-1 font-serif text-3xl font-extrabold text-stone-900 tracking-tight">
              PATROCÍNIO
            </h3>
            <p className="mt-2 text-xs font-medium text-stone-500 max-w-md mx-auto">
              Clique nos logotipos abaixo para visualizar informações.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-6xl mx-auto">
            {SPONSORS.map((sponsor) => (
              <SponsorCard
                key={sponsor.id}
                sponsor={sponsor}
                onClick={(s) => onSelectItem(s)}
              />
            ))}
          </div>
        </div>

        {/* Safety Disclaimer bar */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-white/50 border border-gold/15 p-5 flex flex-col md:flex-row items-center justify-between text-center md:text-left space-y-4 md:space-y-0 md:space-x-6">
          <div className="flex items-center space-x-3 text-[#c93b2b]">
            <ShieldCheck className="h-6 w-6 shrink-0" />
            <div>
              <h4 className="font-sans font-bold text-xs text-stone-800 uppercase tracking-wider">Compromisso com o Atleta</h4>
              <p className="text-xs text-stone-500 leading-snug">Todos os patrocinadores são verificados e garantem atendimento prioritário aos competidores do Intercolonial.</p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-gold/10 text-gold-dark px-3 py-1 rounded-full whitespace-nowrap">
            Parceria Oficial 2026
          </span>
        </div>

      </div>
    </section>
  );
}
