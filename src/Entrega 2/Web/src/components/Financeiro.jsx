import React, { useState, useEffect } from 'react';
import { DollarSign, CheckCircle, Clock, Plus, Filter, TrendingUp } from 'lucide-react';

export default function Financeiro({ pacientes }) {
  const [transacoes, setTransacoes] = useState([]);
  const [resumo, setResumo] = useState({ pago: 0, pendente: 0 });
  const [modalAberto, setModalAberto] = useState(false);
  const [novoLancamento, setNovoLancamento] = useState({
    paciente_id: '', valor: '', data_sessao: new Date().toISOString().split('T')[0], status: 'Pendente', metodo_pagamento: 'Pix'
  });

  const carregarFinanceiro = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/financeiro/resumo');
      const dados = await res.json();
      setTransacoes(dados);
      
      const totalPago = dados.filter(t => t.status === 'Pago').reduce((acc, curr) => acc + Number(curr.valor), 0);
      const totalPendente = dados.filter(t => t.status === 'Pendente').reduce((acc, curr) => acc + Number(curr.valor), 0);
      setResumo({ pago: totalPago, pendente: totalPendente });
    } catch (err) { console.error(err); }
  };

  useEffect(() => { carregarFinanceiro(); }, []);

  const alternarStatus = async (id, statusAtual) => {
    const novoStatus = statusAtual === 'Pago' ? 'Pendente' : 'Pago';
    await fetch(`http://localhost:3000/api/financeiro/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: novoStatus })
    });
    carregarFinanceiro();
  };

  const salvarLancamento = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:3000/api/financeiro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoLancamento)
    });
    setModalAberto(false);
    carregarFinanceiro();
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-[#005477] tracking-tight">Fluxo de Caixa</h1>
          <p className="text-slate-500 font-medium mt-1">Controle de receitas e recebimentos da clínica.</p>
        </div>
        <button onClick={() => setModalAberto(true)} className="bg-[#005477] text-white px-6 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 hover:bg-[#2CB4CC] transition-all">
          <Plus size={20} /> Novo Lançamento
        </button>
      </div>

      {/* CARDS DE RESUMO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-emerald-500 text-white p-6 rounded-3xl shadow-xl flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase opacity-80">Total Recebido</p>
            <h2 className="text-3xl font-black">R$ {resumo.pago.toLocaleString('pt-BR')}</h2>
          </div>
          <TrendingUp size={40} className="opacity-30" />
        </div>
        <div className="bg-amber-500 text-white p-6 rounded-3xl shadow-xl flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase opacity-80">A Receber</p>
            <h2 className="text-3xl font-black">R$ {resumo.pendente.toLocaleString('pt-BR')}</h2>
          </div>
          <Clock size={40} className="opacity-30" />
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-lg flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase text-slate-400">Total Previsto</p>
            <h2 className="text-3xl font-black text-[#005477]">R$ {(resumo.pago + resumo.pendente).toLocaleString('pt-BR')}</h2>
          </div>
          <DollarSign size={40} className="text-slate-100" />
        </div>
      </div>

      {/* LISTA DE TRANSAÇÕES */}
      <div className="bg-white/60 backdrop-blur-xl border border-white rounded-3xl shadow-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#005477]/5 text-[#005477] text-xs font-black uppercase">
            <tr>
              <th className="px-6 py-4">Data</th>
              <th className="px-6 py-4">Paciente</th>
              <th className="px-6 py-4">Valor</th>
              <th className="px-6 py-4">Método</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {transacoes.map(t => (
              <tr key={t.id} className="hover:bg-white/80 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-500">{new Date(t.data_sessao).toLocaleDateString('pt-BR')}</td>
                <td className="px-6 py-4 font-black text-[#005477]">{t.paciente_nome}</td>
                <td className="px-6 py-4 font-black text-slate-700">R$ {Number(t.valor).toFixed(2)}</td>
                <td className="px-6 py-4"><span className="bg-slate-100 px-3 py-1 rounded-full text-[10px] font-black uppercase text-slate-500">{t.metodo_pagamento}</span></td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => alternarStatus(t.id, t.status)}
                    className={`flex items-center gap-2 font-black text-[10px] uppercase px-4 py-2 rounded-xl border transition-all ${
                      t.status === 'Pago' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-rose-50 border-rose-200 text-rose-600'
                    }`}
                  >
                    {t.status === 'Pago' ? <CheckCircle size={14} /> : <Clock size={14} />}
                    {t.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL DE LANÇAMENTO */}
      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#005477]/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">
            <h2 className="text-xl font-black text-[#005477] mb-6">Novo Lançamento Financeiro</h2>
            <form onSubmit={salvarLancamento} className="space-y-4">
              <select required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold" value={novoLancamento.paciente_id} onChange={e => setNovoLancamento({...novoLancamento, paciente_id: e.target.value})}>
                <option value="">Selecione o Paciente...</option>
                {pacientes.map(p => <option key={p.id} value={p.id}>{p.nome_completo}</option>)}
              </select>
              <div className="grid grid-cols-2 gap-4">
                <input required type="number" step="0.01" placeholder="Valor R$" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold" value={novoLancamento.valor} onChange={e => setNovoLancamento({...novoLancamento, valor: e.target.value})} />
                <input required type="date" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold" value={novoLancamento.data_sessao} onChange={e => setNovoLancamento({...novoLancamento, data_sessao: e.target.value})} />
              </div>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold" value={novoLancamento.metodo_pagamento} onChange={e => setNovoLancamento({...novoLancamento, metodo_pagamento: e.target.value})}>
                <option>Pix</option><option>Cartão Crédito</option><option>Cartão Débito</option><option>Dinheiro</option>
              </select>
              <div className="flex gap-4 mt-6">
                <button type="button" onClick={() => setModalAberto(false)} className="flex-1 py-4 font-black text-slate-400">CANCELAR</button>
                <button type="submit" className="flex-1 bg-[#2CB4CC] text-white py-4 rounded-2xl font-black shadow-lg">SALVAR</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}