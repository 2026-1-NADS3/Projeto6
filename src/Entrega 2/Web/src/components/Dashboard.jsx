import React, { useState, useEffect } from 'react';
import { Users, Calendar, FileText, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function Dashboard({ setTelaAtiva }) {
  const [resumo, setResumo] = useState({ total_pacientes: 0, total_agendamentos: 0, total_prontuarios: 0 });
  const [dadosGrafico, setDadosGrafico] = useState([]);

  useEffect(() => {
    // Busca os dados do backend
    fetch('http://localhost:3000/api/stats/resumo').then(res => res.json()).then(setResumo);
    fetch('http://localhost:3000/api/stats/mapa-dor').then(res => res.json()).then(setDadosGrafico);
  }, []);

  const CORES = ['#005477', '#2CB4CC', '#EF6A55', '#FFBB28', '#82ca9d'];

  return (
    <div className="animate-in fade-in duration-500 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-[#005477] tracking-tight">Painel de Controle</h1>
        <p className="text-slate-500 font-medium mt-1">Bem-vinda de volta, Dra. Maya Yamamoto.</p>
      </div>

      {/* CARDS DE INDICADORES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/60 backdrop-blur-xl border border-white p-6 rounded-3xl shadow-xl flex items-center gap-5">
          <div className="w-14 h-14 bg-[#2CB4CC]/10 rounded-2xl flex items-center justify-center text-[#2CB4CC]"><Users size={30} /></div>
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Total de Pacientes</p>
            <h3 className="text-2xl font-black text-[#005477]">{resumo.total_pacientes}</h3>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-xl border border-white p-6 rounded-3xl shadow-xl flex items-center gap-5">
          <div className="w-14 h-14 bg-[#005477]/10 rounded-2xl flex items-center justify-center text-[#005477]"><Calendar size={30} /></div>
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Agendamentos</p>
            <h3 className="text-2xl font-black text-[#005477]">{resumo.total_agendamentos}</h3>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-xl border border-white p-6 rounded-3xl shadow-xl flex items-center gap-5">
          <div className="w-14 h-14 bg-[#EF6A55]/10 rounded-2xl flex items-center justify-center text-[#EF6A55]"><FileText size={30} /></div>
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Avaliações Feitas</p>
            <h3 className="text-2xl font-black text-[#005477]">{resumo.total_prontuarios}</h3>
          </div>
        </div>
      </div>

      {/* GRÁFICOS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* GRÁFICO DE PIZZA: ÁREAS DE DOR */}
        <div className="bg-white/60 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-xl min-h-[400px] flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="text-[#2CB4CC]" size={20} />
            <h2 className="font-black text-[#005477] text-lg uppercase tracking-tighter">Principais Queixas (Top 5)</h2>
          </div>
          
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dadosGrafico}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dadosGrafico.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CARD DE BOAS-VINDAS / DICA */}
        <div className="bg-[#005477] p-8 rounded-3xl shadow-xl text-white flex flex-col justify-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-4">Dica do Dia</h2>
            <p className="text-blue-100 text-lg leading-relaxed font-medium">
              A maioria dos seus pacientes está relatando dores na <span className="text-[#2CB4CC] font-bold">Lombar</span>. Que tal preparar um novo protocolo de exercícios de mobilidade pélvica?
            </p>
            <button 
    onClick={() => setTelaAtiva('exercicios')} // Agora ele redireciona
    className="mt-8 bg-[#2CB4CC] text-white px-6 py-3 rounded-xl font-bold hover:bg-white hover:text-[#005477] transition-all"
  >
    Ver Banco de Exercícios
  </button>
          </div>
          {/* Decoração sutil no fundo */}
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>

      </div>
    </div>
  );
}