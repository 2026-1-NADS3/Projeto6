import React, { useState, useEffect } from 'react';
import { Plus, Send, Trash2, ClipboardList, MessageSquare } from 'lucide-react';

export default function Prescricao({ pacientes }) {
  const [exerciciosBanco, setExerciciosBanco] = useState([]);
  const [pacienteId, setPacienteId] = useState('');
  const [orientacoes, setOrientacoes] = useState('');
  const [listaPrescrita, setListaPrescrita] = useState([]); // Itens escolhidos

  useEffect(() => {
    fetch('http://localhost:3000/api/exercicios')
      .then(res => res.json())
      .then(setExerciciosBanco);
  }, []);

  const adicionarExercicio = (e) => {
    const exId = e.target.value;
    if (!exId) return;
    const exOriginal = exerciciosBanco.find(ex => ex.id === parseInt(exId));
    
    if (exOriginal) {
      setListaPrescrita([...listaPrescrita, { 
        exercicio_id: exOriginal.id, 
        nome: exOriginal.nome,
        series: '', 
        repeticoes: '', 
        observacoes_especificas: '' 
      }]);
    }
    e.target.value = ""; // Reseta o select
  };

  const removerExercicio = (index) => {
    setListaPrescrita(listaPrescrita.filter((_, i) => i !== index));
  };

  const atualizarItem = (index, campo, valor) => {
    const novaLista = [...listaPrescrita];
    novaLista[index][campo] = valor;
    setListaPrescrita(novaLista);
  };

  const enviarWhatsApp = () => {
    const paciente = pacientes.find(p => p.id === parseInt(pacienteId));
    if (!paciente) return alert("Selecione um paciente!");

    let mensagem = `*CLÍNICA MAYA RPG - Prescrição de Exercícios*\n\n`;
    mensagem += `Olá, *${paciente.nome_completo}*! Aqui estão suas orientações:\n\n`;
    
    listaPrescrita.forEach((item, i) => {
      mensagem += `${i+1}. *${item.nome}*\n`;
      mensagem += `   └ ${item.series} séries de ${item.repeticoes}\n`;
      if (item.observacoes_especificas) mensagem += `   └ Obs: ${item.observacoes_especificas}\n`;
      mensagem += `\n`;
    });

    mensagem += `_Orientações:_ ${orientacoes}\n\n`;
    mensagem += `Bom treino! Qualquer dúvida, estou à disposição.`;

    const url = `https://wa.me/55${paciente.telefone.replace(/\D/g, '')}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  };

  const salvarNoBanco = async () => {
    if (!pacienteId || listaPrescrita.length === 0) return alert("Preencha os dados!");

    const payload = {
      paciente_id: pacienteId,
      data_prescricao: new Date().toISOString().split('T')[0],
      orientacoes_gerais: orientacoes,
      itens: listaPrescrita
    };

    try {
      const res = await fetch('http://localhost:3000/api/prescricoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) alert("Prescrição salva com sucesso!");
    } catch (err) { console.error(err); }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-[#005477] tracking-tight">Prescrição de Exercícios</h1>
          <p className="text-slate-500 font-medium">Monte o protocolo de treinos para casa.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={enviarWhatsApp} className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2">
            <MessageSquare size={20} /> Enviar WhatsApp
          </button>
          <button onClick={salvarNoBanco} className="bg-[#005477] hover:bg-[#2CB4CC] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2">
            <ClipboardList size={20} /> Salvar no Histórico
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CONFIGURAÇÃO GERAL */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/60 backdrop-blur-xl border border-white p-6 rounded-3xl shadow-xl">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Selecionar Paciente</label>
            <select 
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 mt-2 font-bold text-slate-700 outline-none"
              value={pacienteId}
              onChange={e => setPacienteId(e.target.value)}
            >
              <option value="">Escolha...</option>
              {pacientes.map(p => <option key={p.id} value={p.id}>{p.nome_completo}</option>)}
            </select>
          </div>

          <div className="bg-white/60 backdrop-blur-xl border border-white p-6 rounded-3xl shadow-xl">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Adicionar Exercício</label>
            <select 
              className="w-full bg-[#2CB4CC] text-white border-none rounded-xl px-4 py-3 mt-2 font-bold outline-none cursor-pointer"
              onChange={adicionarExercicio}
              defaultValue=""
            >
              <option value="" disabled>+ Escolha um movimento...</option>
              {exerciciosBanco.map(ex => <option key={ex.id} value={ex.id} className="text-slate-700">{ex.nome} ({ex.categoria})</option>)}
            </select>
          </div>

          <div className="bg-white/60 backdrop-blur-xl border border-white p-6 rounded-3xl shadow-xl">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Orientações Gerais</label>
            <textarea 
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 mt-2 text-sm outline-none resize-none h-32"
              placeholder="Ex: Beber água, fazer os exercícios em jejum..."
              value={orientacoes}
              onChange={e => setOrientacoes(e.target.value)}
            />
          </div>
        </div>

        {/* LISTA DE EXERCÍCIOS PRESCRITOS */}
        <div className="lg:col-span-2 space-y-4">
          {listaPrescrita.length === 0 && (
            <div className="bg-white/30 border-2 border-dashed border-slate-200 rounded-3xl h-64 flex items-center justify-center text-slate-400 font-bold">
              Nenhum exercício adicionado à lista.
            </div>
          )}

          {listaPrescrita.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 flex flex-col gap-4 animate-in slide-in-from-right duration-300">
              <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                <h3 className="font-black text-[#005477]">{item.nome}</h3>
                <button onClick={() => removerExercicio(index)} className="text-rose-500 hover:bg-rose-50 p-2 rounded-lg transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-[9px] font-black uppercase text-slate-400">Séries</label>
                  <input 
                    type="text" placeholder="Ex: 3"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#2CB4CC]"
                    value={item.series}
                    onChange={e => atualizarItem(index, 'series', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase text-slate-400">Repetições/Tempo</label>
                  <input 
                    type="text" placeholder="Ex: 15x / 1 min"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#2CB4CC]"
                    value={item.repeticoes}
                    onChange={e => atualizarItem(index, 'repeticoes', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase text-slate-400">Nota Específica</label>
                  <input 
                    type="text" placeholder="Ex: Focar na respiração"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#2CB4CC]"
                    value={item.observacoes_especificas}
                    onChange={e => atualizarItem(index, 'observacoes_especificas', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}