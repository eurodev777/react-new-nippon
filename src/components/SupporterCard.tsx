/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Supporter } from '../types';
import { motion } from 'motion/react';
import { Info } from 'lucide-react';

interface SupporterCardProps {
  key?: string;
  supporter: Supporter;
  onClick: (supporter: Supporter) => void;
}

export default function SupporterCard({ supporter, onClick }: SupporterCardProps) {
  const renderSupporterLogo = () => {
    switch (supporter.id) {
      case 'sicredi':
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <span className="font-sans font-black text-sm tracking-tight text-[#34A853]">
              ★ Sicredi
            </span>
          </div>
        );
      case 'bwm':
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <span className="font-serif font-black text-sm tracking-widest text-stone-900 leading-none">
              BWM
            </span>
            <span className="text-[6px] tracking-widest text-stone-400 font-semibold uppercase leading-none mt-0.5">
              PROPAGANDA
            </span>
          </div>
        );
      case 'dai':
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <span className="font-serif italic font-bold text-sm text-[#A81F25]">
              ★ Dai ★
            </span>
            <span className="text-[6px] tracking-widest text-stone-400 uppercase leading-none">Cervejaria</span>
          </div>
        );
      case 'maxxi-ovos':
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <span className="font-sans font-extrabold text-xs text-[#00529B] italic">
              Maxxi<span className="text-[#FFCC00]">Ovos</span>
            </span>
          </div>
        );
      case 'jadlog':
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <span className="font-sans font-black text-xs text-[#D11A2A] italic tracking-tighter">
              jadlog
            </span>
          </div>
        );
      case 'mr-jeff':
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <span className="font-sans font-extrabold text-xs text-sky-500 uppercase tracking-tight">
              MR <span className="bg-sky-500 text-white px-1 rounded-sm text-[10px]">JEFF</span>
            </span>
          </div>
        );
      case 'ideal-seguros':
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-[6px] font-bold text-[#E65100] uppercase tracking-wide leading-none">Ideal</span>
            <span className="font-sans font-extrabold text-xs text-stone-800 leading-none">SEGUROS</span>
            <span className="text-[5px] text-stone-400 font-mono mt-0.5">(15) 3219-3500</span>
          </div>
        );
      case 'm0-ambiental':
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <span className="font-sans font-extrabold text-[10px] text-teal-700 leading-none">
              Grupo M0
            </span>
            <span className="text-[6px] font-bold tracking-widest text-teal-600 uppercase">Ambiental</span>
          </div>
        );
      case 'simus':
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <span className="font-sans font-black text-[11px] text-[#A81F25] tracking-widest leading-none">
              ★ SIMUS ★
            </span>
            <span className="text-[5px] font-bold text-stone-400 tracking-wider">A CASA DA CARNE</span>
          </div>
        );
      case 'shibata':
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <span className="font-sans font-black text-sm tracking-tight text-[#E53935] uppercase">
              shibata
            </span>
            <span className="text-[5px] text-stone-400 tracking-widest uppercase">quitanda</span>
          </div>
        );
      case 'katia-mayumi':
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <span className="font-serif text-xs font-bold tracking-wide text-stone-900">
              KATIA
            </span>
            <span className="font-serif text-[8px] font-bold tracking-widest text-[#A81F25]">
              MAYUMI
            </span>
          </div>
        );
      case 'prosteel':
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <span className="font-sans font-black text-xs tracking-wider text-amber-600">
              PROSTEEL
            </span>
            <span className="text-[4px] font-bold text-stone-400 uppercase leading-none">Serviços Médicos e Caldeiraria</span>
          </div>
        );
      case 'tammy':
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <span className="font-serif italic font-black text-sm text-[#E91E63]">
              Tammy
            </span>
          </div>
        );
      case 'label-packing':
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <span className="font-sans font-bold text-[9px] text-[#2E7D32] uppercase leading-none">
              LABEL
            </span>
            <span className="font-sans font-black text-[10px] text-stone-800 uppercase leading-none">
              PACKING
            </span>
          </div>
        );
      case 'classic-pan':
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <span className="font-serif text-xs font-extrabold tracking-wide text-amber-700 italic">
              classic pan
            </span>
            <span className="text-[4px] text-stone-400 tracking-wider">PADARIA E CONFEITARIA</span>
          </div>
        );
      case 'celso-amamura':
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-[5px] font-bold text-[#1565C0] uppercase">Dr. Celso Amamura</span>
            <span className="font-sans font-extrabold text-[8px] text-stone-800 tracking-wide mt-0.5">OFTALMOLOGISTA</span>
          </div>
        );
      case 'mira':
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <span className="font-sans font-bold text-xs text-indigo-800 leading-none">
              mira
            </span>
            <span className="text-[4px] text-stone-400 tracking-wider">ASSESSORIA E COBRANÇA</span>
          </div>
        );
      case 'tadao-takeda':
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <span className="font-sans font-black text-xs text-[#b38e41] leading-none">
              Tadao Takeda
            </span>
            <span className="text-[5px] text-stone-400 tracking-widest uppercase mt-0.5">TÊNIS E CORDAS</span>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <span className="font-sans font-bold text-xs text-stone-600 truncate max-w-full">
              {supporter.name}
            </span>
          </div>
        );
    }
  };

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.03, borderColor: '#b38e41', boxShadow: '0 8px 16px -8px rgba(179, 142, 65, 0.15)' }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onClick(supporter)}
      className="group relative flex h-20 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-stone-200 bg-white px-3 py-2 shadow-xs transition-all"
    >
      {/* Background card accent */}
      <div className="absolute inset-0 bg-stone-50/20 opacity-0 transition group-hover:opacity-100" />
      
      {/* Supporter Logo Content */}
      <div className="z-10">{renderSupporterLogo()}</div>

      {/* Micro indicator */}
      <div className="absolute bottom-1 right-1 opacity-0 transition group-hover:opacity-100 text-stone-300">
        <Info className="h-2.5 w-2.5 text-gold" />
      </div>
    </motion.div>
  );
}
