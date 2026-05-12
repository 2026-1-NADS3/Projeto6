import React, { useState, useEffect } from 'react';
import { X, MessageCircle, CheckCircle2, Clock, Calendar as CalendarIcon } from 'lucide-react';

export default function Agenda({ pacientes }) {
  const hoje = new Date();
  const [dataSelecionada, setDataSelecionada] = useState(hoje.toISOString().split('T')[0]);
  const [agendamentos, setAgendamentos] = useState([]);
  const [modal, setModal] = useState(false);
  const [novo, setNovo] = useState({ paciente_id: '', hora_agendamento: '', observacoes: '' });

  // Lógica do Calendário
  const diasNoMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0).getDate();
  const diasArray = Array.from({ length: diasNoMes }, (_, i) => i + 1);
  const nomeMes = hoje.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  // 🚀 BUSCAR AGENDAMENTOS REAIS
  const carregarAgenda = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/agendamentos');
      const dados = await res.json();
      setAgendamentos(dados);
    } catch (err) { console.error("Erro ao carregar agenda:", err); }
  };

  useEffect(() => { carregarAgenda(); }, []);

  // 🚀 SALVAR NO BANCO DE DADOS
  const salvar = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/agendamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paciente_id: novo.paciente_id,
          data_agendamento: dataSelecionada,
          hora_agendamento: novo.hora_agendamento,
          observacoes: novo.observacoes
        })
      });

      if (res.ok) {
        carregarAgenda();
        setModal(false);
        setNovo({ paciente_id: '', hora_agendamento: '', observacoes: '' });
      }
    } catch (err) { console.error(err); }
  };

  const abrirWhatsApp = (telefone, paciente) => {
    if (!telefone) return alert("Paciente sem telefone cadastrado!");
    const limpo = telefone.replace(/\D/g, ''); // Remove parênteses e traços
    const texto = encodeURIComponent(`Olá, ${paciente}! Aqui é da Clínica Maya. Confirmamos sua sessão para hoje?`);
    window.open(`https://wa.me/55${limpo}?text=${texto}`, '_blank');
  };

  // Filtra agendamentos apenas para o dia selecionado no calendário
  const agendamentosDoDia = agendamentos.filter(ag => {
    const dataAg = new Date(ag.data_agendamento).toISOString().split('T')[0];
    return dataAg === dataSelecionada;
  });

  return (
    <div className="animate-in fade-in duration-300 pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Agenda Interativa</h1>
        <p className="text-slate-500 text-sm mt-1 font-medium">Gestão de horários e integração com WhatsApp.</p>
      </div>

      <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-white/50 shadow-xl flex flex-col lg:flex-row overflow-hidden min-h-[500px]">
        
        {/* LADO ESQUERDO: Calendário */}
        <div className="lg:w-2/5 p-8 border-b lg:border-b-0 lg:border-r border-slate-200/50 bg-white/30">
          <h2 className="text-xl font-black text-[#005477] mb-6 capitalize flex items-center gap-2">
            <CalendarIcon size={20} /> {nomeMes}
          </h2>
          
          <div className="grid grid-cols-7 gap-2 mb-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((dia, i) => <div key={i}>{dia}</div>)}
          </div>
          
          <div className="grid grid-cols-7 gap-y-3 gap-x-2 text-center text-sm font-bold">
            {diasArray.map(dia => {
              const dataISO = new Date(hoje.getFullYear(), hoje.getMonth(), dia).toISOString().split('T')[0];
              const isSelecionado = dataSelecionada === dataISO;
              
              return (
                <button 
                  key={dia}
                  onClick={() => setDataSelecionada(dataISO)}
                  className={`py-2 rounded-xl transition-all ${
                    isSelecionado 
                      ? 'bg-[#2CB4CC] text-white shadow-lg shadow-[#2CB4CC]/40 scale-110 z-10' 
                      : 'text-slate-600 hover:bg-white hover:text-[#2CB4CC]'
                  }`}
                >
                  {dia}
                </button>
              );
            })}
          </div>
        </div>

        {/* LADO DIREITO: Lista Real */}
        <div className="lg:w-3/5 p-8 flex flex-col bg-white/10">
          <h2 className="text-lg font-black text-[#005477] mb-6 flex items-center justify-between">
            <span>Sessões: {new Date(dataSelecionada + 'T12:00:00').toLocaleDateString('pt-BR')}</span>
            <span className="text-[10px] bg-[#2CB4CC]/10 text-[#2CB4CC] px-3 py-1 rounded-full uppercase tracking-tighter">
               {agendamentosDoDia.length} pacientes
            </span>
          </h2>
          
          <div className="space-y-4 flex-1 overflow-y-auto pr-2 esconder-scroll">
            {agendamentosDoDia.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 opacity-60">
                <Clock size={40} className="mb-2" />
                <p className="font-bold">Nenhum horário para este dia.</p>
              </div>
            )}

            {agendamentosDoDia.map((ag) => (
              <div key={ag.id} className="flex gap-4 items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm group hover:border-[#2CB4CC]/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex flex-col items-center justify-center font-black text-[#005477] border border-slate-100">
                  <span className="text-xs uppercase opacity-40">Hora</span>
                  <span className="text-sm">{ag.hora_agendamento.substring(0, 5)}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-black text-slate-800">{ag.nome_completo}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-black uppercase tracking-wider flex items-center gap-1 text-emerald-500">
                      <CheckCircle2 size={12}/> Confirmado
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => abrirWhatsApp(ag.telefone, ag.nome_completo)}
                  className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all shadow-sm border border-emerald-100"
                >
                  <MessageCircle size={20} />
                </button>
              </div>
            ))}
          </div>
          
          <button onClick={() => setModal(true)} className="mt-6 w-full py-4 border-2 border-dashed border-[#2CB4CC]/30 rounded-2xl text-[#2CB4CC] font-black text-sm uppercase tracking-widest hover:bg-[#2CB4CC]/5 transition-all">
            + Agendar Paciente
          </button>
        </div>
      </div>

      {/* MODAL DE AGENDAMENTO CONECTADO AO BANCO */}
      {modal && (
        <div className="fixed inset-0 bg-[#005477]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-[#005477]">Novo Agendamento</h2>
              <button onClick={() => setModal(false)}><X className="text-slate-400 hover:text-red-500" /></button>
            </div>
            <form onSubmit={salvar} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Selecionar Paciente</label>
                <select 
                  required 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#2CB4CC] font-bold text-slate-700" 
                  value={novo.paciente_id} 
                  onChange={e => setNovo({...novo, paciente_id: e.target.value})}
                >
                  <option value="">Escolha um paciente...</option>
                  {pacientes.map(p => <option key={p.id} value={p.id}>{p.nome_completo}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Hora da Sessão</label>
                  <input required type="time" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700 outline-none focus:border-[#2CB4CC]" value={novo.hora_agendamento} onChange={e => setNovo({...novo, hora_agendamento: e.target.value})} />
                </div>
                <div className="space-y-1">
                   <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Dia Selecionado</label>
                   <div className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-400 text-sm">
                      {new Date(dataSelecionada + 'T12:00:00').toLocaleDateString('pt-BR')}
                   </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Observações (Opcional)</label>
                <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#2CB4CC] resize-none" rows="2" value={novo.observacoes} onChange={e => setNovo({...novo, observacoes: e.target.value})}></textarea>
              </div>

              <button type="submit" className="w-full bg-[#005477] text-white font-black py-4 rounded-xl mt-4 hover:shadow-lg hover:bg-[#2CB4CC] transition-all uppercase tracking-widest text-sm">
                Confirmar Agendamento
              </button>
            </form>
          </div>  
        </div>
      )}
    </div>
  );
}