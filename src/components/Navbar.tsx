/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, ArrowLeft, BookOpen, Users, Trophy, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentPage: 'home' | 'regulamento';
  setCurrentPage: (page: 'home' | 'regulamento') => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function Navbar({ currentPage, setCurrentPage, onScrollToSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setIsOpen(false);
    if (currentPage !== 'home') {
      setCurrentPage('home');
      // Wait for page transition, then scroll
      setTimeout(() => {
        onScrollToSection(sectionId);
      }, 300);
    } else {
      onScrollToSection(sectionId);
    }
  };

  const handleRegulamentoClick = () => {
    setIsOpen(false);
    setCurrentPage('regulamento');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header id="app-navbar" className="sticky top-0 z-40 w-full border-b border-gold/10 bg-[#FCFAF2]/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Brand */}
          <div 
            onClick={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex cursor-pointer items-center space-x-2"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-nippon-red text-white font-serif font-bold text-sm tracking-tighter">
              11º
            </span>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-xs tracking-wider text-sorocaba-blue sm:text-sm">
                NIPPON SOROCABA
              </span>
              <span className="font-serif text-[10px] italic text-gold font-semibold tracking-widest sm:text-xs">
                Tênis Intercolonial 2026
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {currentPage === 'home' ? (
              <>
                <button
                  onClick={() => handleNavClick('diretoria')}
                  className="group flex items-center space-x-1 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-stone-600 transition hover:text-nippon-red"
                >
                  <Users className="h-3.5 w-3.5 text-stone-400 group-hover:text-nippon-red" />
                  <span>Nova Direção</span>
                </button>
                <button
                  onClick={() => handleNavClick('patrocinio')}
                  className="group flex items-center space-x-1 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-stone-600 transition hover:text-nippon-red"
                >
                  <Trophy className="h-3.5 w-3.5 text-stone-400 group-hover:text-nippon-red" />
                  <span>Patrocínio</span>
                </button>
                <button
                  onClick={() => handleNavClick('apoio')}
                  className="group flex items-center space-x-1 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-stone-600 transition hover:text-nippon-red"
                >
                  <Heart className="h-3.5 w-3.5 text-stone-400 group-hover:text-nippon-red" />
                  <span>Apoio</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setCurrentPage('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#c93b2b] transition hover:text-[#c93b2b]/80"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Voltar ao Início</span>
              </button>
            )}

            <button
              onClick={handleRegulamentoClick}
              className={`flex items-center space-x-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
                currentPage === 'regulamento'
                  ? 'bg-nippon-red text-white shadow-sm'
                  : 'bg-gold/10 text-gold-dark hover:bg-gold/20'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Regulamento</span>
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-stone-500 hover:bg-gold/10 hover:text-stone-950 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menu principal</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gold/10 bg-[#FCFAF2]"
          >
            <div className="space-y-1 px-2 pb-4 pt-2">
              {currentPage === 'home' ? (
                <>
                  <button
                    onClick={() => handleNavClick('diretoria')}
                    className="flex w-full items-center space-x-2 rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-wider text-stone-600 hover:bg-gold/10 hover:text-nippon-red"
                  >
                    <Users className="h-4 w-4" />
                    <span>Nova Direção</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('patrocinio')}
                    className="flex w-full items-center space-x-2 rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-wider text-stone-600 hover:bg-gold/10 hover:text-nippon-red"
                  >
                    <Trophy className="h-4 w-4" />
                    <span>Patrocínio</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('apoio')}
                    className="flex w-full items-center space-x-2 rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-wider text-stone-600 hover:bg-gold/10 hover:text-nippon-red"
                  >
                    <Heart className="h-4 w-4" />
                    <span>Apoio</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setCurrentPage('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex w-full items-center space-x-2 rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-wider text-[#c93b2b] hover:bg-[#c93b2b]/5"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Voltar ao Início</span>
                </button>
              )}

              <button
                onClick={handleRegulamentoClick}
                className={`flex w-full items-center space-x-2 rounded-md px-3 py-2 text-sm font-bold uppercase tracking-wider ${
                  currentPage === 'regulamento'
                    ? 'bg-nippon-red text-white'
                    : 'bg-gold/10 text-gold-dark'
                }`}
              >
                <BookOpen className="h-4 w-4" />
                <span>Regulamento (Pág. Inteira)</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
