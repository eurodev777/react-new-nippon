/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sponsor } from '../types';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface SponsorCardProps {
  key?: string;
  sponsor: Sponsor;
  onClick: (sponsor: Sponsor) => void;
}

export default function SponsorCard({ sponsor, onClick }: SponsorCardProps) {
  // Let's create visually faithful renderings of the sponsor logos from the image
  const renderLogo = () => {
    switch (sponsor.id) {
      case 'm-camicado':
        return (
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <span className="font-sans font-extrabold text-2xl tracking-tighter text-[#D2143A] italic">
              M.CAMICADO
            </span>
            <div className="h-[2px] w-16 bg-[#D2143A] my-1" />
            <span className="text-[8px] font-bold tracking-widest text-[#D2143A] uppercase">
              TRADIÇÃO EM PREÇOS BAIXOS
            </span>
          </div>
        );
      case 'hala':
        return (
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <span className="font-serif font-black text-3xl tracking-wide text-stone-900">
              HALA
            </span>
            <span className="text-[9px] font-bold tracking-[0.25em] text-[#6366F1] uppercase mt-0.5">
              SOLUÇÕES ENGENHARIA
            </span>
          </div>
        );
      case 'grupo-unica':
        return (
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <div className="flex items-center space-x-1 justify-center">
              {/* Globe style vector logo */}
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 p-1 text-white shadow-sm">
                <span className="text-[10px] font-extrabold tracking-tighter">U</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[9px] font-bold tracking-widest text-stone-400 uppercase leading-none">GRUPO</span>
                <span className="font-sans font-black text-xl tracking-tight text-blue-700 leading-none">UNICA</span>
              </div>
            </div>
            <span className="text-[7px] text-stone-500 font-semibold tracking-wide mt-2">
              "Porque sua família e patrimônio são únicos."
            </span>
          </div>
        );
      case 'ito':
        return (
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <div className="bg-[#1C1917] text-white px-5 py-1 rounded font-sans font-extrabold text-2xl tracking-wider">
              ITO
            </div>
            <span className="text-[8px] font-bold tracking-widest text-stone-600 uppercase mt-1.5">
              MATERIAIS PARA CONSTRUÇÃO
            </span>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <span className="font-sans font-bold text-xl text-stone-800">{sponsor.name}</span>
          </div>
        );
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02, boxShadow: '0 12px 24px -10px rgba(0, 0, 0, 0.08)' }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(sponsor)}
      className="group relative flex h-32 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition-all"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-stone-50/50 opacity-0 transition group-hover:opacity-100" />
      
      {/* Visual content representation */}
      <div className="z-10">{renderLogo()}</div>

      {/* Decorative arrow helper */}
      <div className="absolute bottom-2.5 right-2.5 rounded-full bg-stone-50 p-1 text-stone-400 opacity-0 transition group-hover:bg-gold/10 group-hover:text-gold-dark group-hover:opacity-100">
        <ArrowUpRight className="h-3 w-3" />
      </div>
    </motion.div>
  );
}
