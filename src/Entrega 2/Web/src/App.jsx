import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Agenda from './components/Agenda';
import GestaoPacientes from './components/GestaoPacientes';
import Prontuario from './components/Prontuario';
import BancoExercicios from './components/BancoExercicios';
import Prescricao from './components/Prescricao';
import Login from './components/Login';
import Relatorio from './components/Relatorio';
import Financeiro from './components/Financeiro';

export default function App() {
  const [isAutenticado, setIsAutenticado] = useState(false);
  const [telaAtiva, setTelaAtiva] = useState('dashboard');
  const [pacientes, setPacientes] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/api/pacientes')
      .then(res => res.json())
      .then(dados => setPacientes(dados))
      .catch(err => console.error("Erro:", err));
  }, []);

  // 🚀 FUNÇÃO DE LOGOUT
  const handleLogout = () => {
    setIsAutenticado(false);
    setTelaAtiva('dashboard'); // Garante que, ao logar de novo, volte pro Início
  };

  return (
    <div className="flex h-screen bg-[#F0F8FA] font-sans text-slate-800 relative overflow-hidden">
      
      {/* LUZES DE FUNDO AURORA */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{ background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(44, 180, 204, 0.15), transparent 80%)` }}
      />
      <div className="absolute -top-[10%] -left-[10%] w-[800px] h-[800px] rounded-full opacity-40 blur-[120px] pointer-events-none z-0 animate-pulse" style={{ backgroundColor: '#2CB4CC', animationDuration: '8s' }}></div>
      <div className="absolute -bottom-[10%] -right-[5%] w-[600px] h-[600px] rounded-full opacity-30 blur-[100px] pointer-events-none z-0 animate-pulse" style={{ backgroundColor: '#EF6A55', animationDuration: '10s' }}></div>

      <div className="absolute inset-0 z-10 flex p-4 gap-4">
        
        {/* CONDICIONAL: TELA DE LOGIN OU SISTEMA PRINCIPAL */}
        {!isAutenticado ? (
          
          /* --- TELA DE LOGIN --- */
          <div className="w-full h-full flex flex-col items-center justify-center">
            <Login onLogin={() => setIsAutenticado(true)} />
          </div>

        ) : (
          
          /* --- SISTEMA ADMINISTRATIVO --- */
          <>
            {/* 🚀 PASSANDO A FUNÇÃO PARA A SIDEBAR */}
            <Sidebar telaAtiva={telaAtiva} setTelaAtiva={setTelaAtiva} onLogout={handleLogout} />
            
            <div className="flex-1 flex flex-col bg-white/50 backdrop-blur-2xl rounded-3xl border border-white/60 shadow-2xl overflow-hidden relative">
              
              <header className="h-20 bg-white/30 border-b border-white/40 flex items-center justify-between px-10">
                <div className="text-sm font-medium text-slate-500">
                  CLÍNICA MAYA RPG / <span className="text-[#2CB4CC] capitalize font-black tracking-tight text-lg ml-1">{telaAtiva}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-[#005477]">Dra. Maya Yamamoto</p>
                    <p className="text-[10px] text-[#2CB4CC] uppercase font-black tracking-widest mt-0.5">Fisioterapeuta Especialista</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#2CB4CC] font-bold shadow-md border border-slate-100 rotate-3 hover:rotate-0 transition-all cursor-pointer">MY</div>
                </div>
              </header>

              <main className="flex-1 overflow-y-auto p-10 bg-transparent esconder-scroll">
                {telaAtiva === 'dashboard' && <Dashboard setTelaAtiva={setTelaAtiva} />}
                {telaAtiva === 'agenda' && <Agenda pacientes={pacientes} />}
                {telaAtiva === 'pacientes' && <GestaoPacientes pacientes={pacientes} setPacientes={setPacientes} setTelaAtiva={setTelaAtiva} />}
                {telaAtiva === 'prontuario' && <Prontuario pacientes={pacientes} />}
                {telaAtiva === 'exercicios' && <BancoExercicios />}
                {telaAtiva === 'prescricao' && <Prescricao pacientes={pacientes} />}
                {telaAtiva === 'relatorio' && <Relatorio pacientes={pacientes} setTelaAtiva={setTelaAtiva} />}
                {telaAtiva === 'financeiro' && <Financeiro pacientes={pacientes} />}
              </main>
            </div>
          </>

        )}

      </div>
    </div>
  );
}