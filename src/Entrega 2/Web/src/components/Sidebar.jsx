import React from 'react';
import { LogOut } from 'lucide-react';

export default function Sidebar({ telaAtiva, setTelaAtiva, onLogout }) {
  const menus = [
    { id: 'dashboard', label: 'Dashboard', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { id: 'agenda', label: 'Agenda', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'pacientes', label: 'Pacientes', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { id: 'prontuario', label: 'Prontuário', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'exercicios', label: 'Banco de Exercícios', icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z' },
    { id: 'prescricao', label: 'Prescrição', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { id: 'relatorio', label: 'Relatórios', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'financeiro', label: 'Financeiro', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
];

  return (
    <aside className="w-64 bg-white/40 backdrop-blur-2xl border border-white/60 rounded-3xl flex flex-col shadow-xl z-20 m-4 mr-0">
      
      {/* CABEÇALHO DO SIDEBAR */}
      <div className="h-24 flex items-center px-5 gap-3 border-b border-white/40">
        <div className="flex flex-col font-black text-xl text-white shadow-sm rotate-3 hover:rotate-0 transition-transform cursor-pointer">
          <div className="flex gap-0.5 mb-0.5">
            <div className="w-6 h-6 rounded-md bg-[#2CB4CC] flex items-center justify-center border border-white/50 shadow-sm">M</div>
            <div className="w-6 h-6 rounded-md bg-[#2CB4CC]/80 flex items-center justify-center border border-white/50 shadow-sm">Y</div>
          </div>
          <div className="flex gap-0.5">
            <div className="w-6 h-6 rounded-md bg-[#005477] flex items-center justify-center border border-white/50 shadow-sm">R</div>
            <div className="w-6 h-6 rounded-md bg-[#005477]/80 flex items-center justify-center border border-white/50 shadow-sm">G</div>
          </div>
        </div>

        <div className="flex-1 text-slate-800 ml-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">CLÍNICA</p>
          <p className="text-lg font-black text-[#005477] tracking-tight leading-tight">MAYA RPG</p>
          <p className="text-[10px] font-black text-[#2CB4CC] uppercase tracking-wider leading-none">- ADMIN</p>
        </div>
      </div>
      
      {/* MENU DE NAVEGAÇÃO */}
      <nav className="flex-1 p-4 space-y-2 mt-2 esconder-scroll overflow-y-auto">
        {menus.map((menu) => (
          <button
            key={menu.id}
            onClick={() => setTelaAtiva(menu.id)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all duration-300 ${
              telaAtiva === menu.id 
                ? 'bg-white text-[#2CB4CC] shadow-md shadow-[#2CB4CC]/10 border border-white translate-x-1' 
                : 'text-slate-500 hover:text-[#005477] hover:bg-white/50'
            }`}
          >
            <svg className={`w-5 h-5 ${telaAtiva === menu.id ? 'text-[#EF6A55]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={menu.icon} />
            </svg>
            {menu.label}
          </button>
        ))}
      </nav>
      
      {/* RODAPÉ DO SIDEBAR: PERFIL E LOGOUT */}
      <div className="p-5 border-t border-white/40 mt-auto">
        <div className="bg-white/60 p-3 rounded-2xl shadow-sm border border-white flex flex-col items-center text-center backdrop-blur-md group hover:bg-white transition-colors cursor-pointer mb-4">
          <img 
            src="/maya.jpg" 
            alt="Dra. Maya Yamamoto" 
            className="w-14 h-14 object-cover rounded-full border-2 border-white shadow-md mb-2 group-hover:scale-105 transition-transform" 
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div style={{display: 'none'}} className="w-14 h-14 rounded-full bg-[#2CB4CC]/20 border-2 border-white text-[#2CB4CC] font-black items-center justify-center mb-2 shadow-md">
            MY
          </div>
          <p className="text-[9px] font-black text-[#2CB4CC] uppercase tracking-widest">Fisioterapeuta</p>
          <p className="text-xs font-bold text-slate-800 mt-0.5">Dra. Maya Yamamoto</p>
        </div>

        <button 
          onClick={onLogout}
          className="flex items-center gap-3 w-full p-3 text-slate-400 hover:bg-rose-50 hover:text-rose-500 rounded-xl transition-all font-bold group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Sair do Sistema</span>
        </button>
      </div>
    </aside>
  );
}