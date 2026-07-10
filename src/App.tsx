/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Diretoria from './components/Diretoria';
import Sponsors from './components/Sponsors';
import LogoPopup from './components/LogoPopup';
import RegulamentoPage from './components/RegulamentoPage';
import Footer from './components/Footer';
import { Sponsor, Supporter } from './types';
import { motion, AnimatePresence } from 'motion/react';
import RelacaoAtletasPageProps from './components/RelacaoAtletasPageProps';
import TabelasPage from './components/TabelasPage';
import chave1 from './assets/1.png'
import chave2 from './assets/2.png'
import chave3 from './assets/3.png'
import chave4 from './assets/4.png'
import chave5 from './assets/5.png'

// Exact path from generated image output
const AERIAL_IMAGE_PATH = '/src/assets/drone.jpg';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'regulamento' | 'equipes'>('home');
  const [selectedLogo, setSelectedLogo] = useState<Sponsor | Supporter | null>(null);

  // Helper to scroll smoothly to sections
  const handleScrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectLogo = (item: Sponsor | Supporter) => {
    setSelectedLogo(item);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FCFAF2] text-stone-800">
      {/* Sticky navigation header */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onScrollToSection={handleScrollToSection}
      />

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero Banner with logos, dates, coordinates & intro */}
              <HeroSection aerialImagePath={AERIAL_IMAGE_PATH} />

              {/* Nova Diretoria (New Directorate) Section */}
              <Diretoria />

              {/* Patrocínio and Apoio sections */}
              <Sponsors onSelectItem={handleSelectLogo} />
            </motion.div>
          )}
          {currentPage === 'regulamento' && (
            <motion.div key="regulamento" /* ...props do framer motion... */ className="bg-white min-h-[80vh]">
              <RegulamentoPage onBack={() => setCurrentPage('home')} />
            </motion.div>
          )}

          {/* NOVA PÁGINA AQUI */}
          {currentPage === 'equipes' && (
            <motion.div
              key="equipes"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.3 }}
              className="bg-[#FCFAF2] min-h-[80vh]"
            >
              <RelacaoAtletasPageProps onBack={() => setCurrentPage('home')} />
            </motion.div>
          )}
          {/* NOVA PÁGINA AQUI */}
          {currentPage === 'tabelas' && (
            <motion.div
              key="tabelas"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.3 }}
              className="bg-[#FCFAF2] min-h-[80vh]"
            >
              {/* <TabelasPage onBack={() => setCurrentPage('home')} /> */}
              <div className="flex flex-col gap-6 items-center justify-center h-auto">
                <img src={chave1} />
                <img src={chave2} />
                <img src={chave3} />
                <img src={chave4} />
                <img src={chave5} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer matching exactly the style in the images */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* Interactive logo popup */}
      <LogoPopup
        item={selectedLogo}
        onClose={() => setSelectedLogo(null)}
      />
    </div>
  );
}
