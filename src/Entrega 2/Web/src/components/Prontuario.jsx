import React, { useState, useEffect } from 'react';
import { Save, UserCircle, Clock, Activity, ArrowLeftRight, Trash2 } from 'lucide-react'; // 🚀 Adicionado Trash2

export default function Prontuario({ pacientes }) {
  const [pacienteId, setPacienteId] = useState('');
  const [mapaDor, setMapaDor] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [visaoAtiva, setVisaoAtiva] = useState('frente'); 
  
  const [formData, setFormData] = useState({
    data_avaliacao: new Date().toISOString().split('T')[0],
    queixa_principal: '',
    historico_molestia: '',
    anotacoes_palpacao: '',
    objetivos_clinicos: ''
  });
  
  // 🚀 Função de Excluir
  const excluirEvolucao = async (id) => {
    if (window.confirm("Deseja realmente excluir este registro de evolução?")) {
      try {
        await fetch(`http://localhost:3000/api/prontuarios/${id}`, { method: 'DELETE' });
        // Atualiza a lista após excluir
        const novoHistorico = await fetch(`http://localhost:3000/api/prontuarios/${pacienteId}`).then(r => r.json());
        setHistorico(novoHistorico);
      } catch (err) { console.error(err); }
    }
  };

  const zonasCorpo = [
    { id: 'cabeca', cx: 100, cy: 25, r: 16, label: 'Cabeça', visao: 'frente' },
    { id: 'mandibula', cx: 100, cy: 45, r: 10, label: 'Mandíbula', visao: 'frente' },
    { id: 'pescoco', cx: 100, cy: 60, r: 12, label: 'Pescoço', visao: 'frente' },
    { id: 'ombro_esq', cx: 60, cy: 75, r: 15, label: 'Ombro Esq.', visao: 'frente' },
    { id: 'ombro_dir', cx: 140, cy: 75, r: 15, label: 'Ombro Dir.', visao: 'frente' },
    { id: 'peito', cx: 100, cy: 95, r: 22, label: 'Peito / Tórax', visao: 'frente' },
    { id: 'abdome', cx: 100, cy: 145, r: 20, label: 'Abdome', visao: 'frente' },
    { id: 'quadril_frente', cx: 100, cy: 190, r: 18, label: 'Quadril (Frente)', visao: 'frente' },
    { id: 'cotovelo_esq', cx: 45, cy: 130, r: 12, label: 'Cotovelo Esq.', visao: 'frente' },
    { id: 'cotovelo_dir', cx: 155, cy: 130, r: 12, label: 'Cotovelo Dir.', visao: 'frente' },
    { id: 'punho_esq', cx: 30, cy: 185, r: 14, label: 'Punho e Mão Esq.', visao: 'frente' },
    { id: 'punho_dir', cx: 170, cy: 185, r: 14, label: 'Punho e Mão Dir.', visao: 'frente' },
    { id: 'joelho_esq', cx: 75, cy: 265, r: 16, label: 'Joelho Esq.', visao: 'frente' },
    { id: 'joelho_dir', cx: 125, cy: 265, r: 16, label: 'Joelho Dir.', visao: 'frente' },
    { id: 'pe_esq', cx: 75, cy: 345, r: 14, label: 'Pé/Tornozelo Esq.', visao: 'frente' },
    { id: 'pe_dir', cx: 125, cy: 345, r: 14, label: 'Pé/Tornozelo Dir.', visao: 'frente' },
    { id: 'nuca', cx: 100, cy: 30, r: 15, label: 'Nuca / Cervical', visao: 'costas' },
    { id: 'ombro_esq_costas', cx: 60, cy: 75, r: 15, label: 'Ombro Esq. (Costas)', visao: 'costas' },
    { id: 'ombro_dir_costas', cx: 140, cy: 75, r: 15, label: 'Ombro Dir. (Costas)', visao: 'costas' },
    { id: 'escapula_esq', cx: 75, cy: 85, r: 14, label: 'Escápula Esq.', visao: 'costas' },
    { id: 'escapula_dir', cx: 125, cy: 85, r: 14, label: 'Escápula Dir.', visao: 'costas' },
    { id: 'costas_alta', cx: 100, cy: 80, r: 14, label: 'Col. Torácica Alta', visao: 'costas' },
    { id: 'toracica_media', cx: 100, cy: 115, r: 14, label: 'Col. Torácica Média', visao: 'costas' },
    { id: 'lombar', cx: 100, cy: 155, r: 18, label: 'Lombar', visao: 'costas' },
    { id: 'sacro', cx: 100, cy: 190, r: 14, label: 'Sacro', visao: 'costas' },
    { id: 'gluteo_esq', cx: 80, cy: 220, r: 16, label: 'Glúteo Esq.', visao: 'costas' },
    { id: 'gluteo_dir', cx: 120, cy: 220, r: 16, label: 'Glúteo Dir.', visao: 'costas' },
    { id: 'cotovelo_esq_costas', cx: 45, cy: 130, r: 12, label: 'Cotovelo Esq.', visao: 'costas' },
    { id: 'cotovelo_dir_costas', cx: 155, cy: 130, r: 12, label: 'Cotovelo Dir.', visao: 'costas' },
    { id: 'punho_esq_costas', cx: 30, cy: 185, r: 14, label: 'Punho e Mão Esq.', visao: 'costas' },
    { id: 'punho_dir_costas', cx: 170, cy: 185, r: 14, label: 'Punho e Mão Dir.', visao: 'costas' },
    { id: 'panturrilha_esq', cx: 75, cy: 295, r: 14, label: 'Panturrilha Esq.', visao: 'costas' },
    { id: 'panturrilha_dir', cx: 125, cy: 295, r: 14, label: 'Panturrilha Dir.', visao: 'costas' },
    { id: 'calcanhar_esq', cx: 75, cy: 345, r: 12, label: 'Pé/Tornozelo Esq.', visao: 'costas' },
    { id: 'calcanhar_dir', cx: 125, cy: 345, r: 12, label: 'Pé/Tornozelo Dir.', visao: 'costas' }
  ];

  useEffect(() => {
    if (pacienteId) {
      fetch(`http://localhost:3000/api/prontuarios/${pacienteId}`)
        .then(res => res.json())
        .then(dados => setHistorico(dados))
        .catch(err => console.error("Erro:", err));
    } else {
      setHistorico([]);
    }
  }, [pacienteId]);

  const toggleDor = (id) => {
    if (mapaDor.includes(id)) {
      setMapaDor(mapaDor.filter(item => item !== id));
    } else {
      setMapaDor([...mapaDor, id]);
    }
  };

  const handleSalvar = async (e) => {
    e.preventDefault();
    if (!pacienteId) return alert('Por favor, selecione um paciente primeiro!');
    const payload = { paciente_id: pacienteId, ...formData, mapa_dor_json: mapaDor };

    try {
      const resposta = await fetch('http://localhost:3000/api/prontuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (resposta.ok) {
        alert('Prontuário salvo com sucesso!');
        const novoHistorico = await fetch(`http://localhost:3000/api/prontuarios/${pacienteId}`).then(r => r.json());
        setHistorico(novoHistorico);
        setMapaDor([]);
        setFormData({ ...formData, queixa_principal: '', historico_molestia: '', anotacoes_palpacao: '', objetivos_clinicos: '' });
      }
    } catch (erro) { console.error(erro); }
  };

  const parseDores = (jsonString) => {
    try { return JSON.parse(jsonString) || []; } 
    catch { return []; }
  };

  return (
    <div className="animate-in fade-in duration-500 space-y-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-[#005477] tracking-tight">Avaliação Fisioterapêutica</h1>
          <p className="text-slate-500 font-medium mt-1">Registre a queixa, anamnese e mapeamento anatômico de dor.</p>
        </div>
        <button onClick={handleSalvar} className="bg-[#2CB4CC] hover:bg-[#005477] text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-lg flex items-center gap-2">
          <Save size={20} /> Salvar Sessão
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl shadow-xl p-6 flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-6 pb-4 border-b border-slate-100">
            <h2 className="font-black text-[#005477] text-lg">Body Chart</h2>
            <button onClick={() => setVisaoAtiva(visaoAtiva === 'frente' ? 'costas' : 'frente')} className="px-3 py-1.5 rounded-lg bg-[#2CB4CC]/10 text-[#2CB4CC] text-xs font-bold flex items-center gap-1.5 border border-[#2CB4CC]/20 hover:bg-[#2CB4CC]/20 transition-all shadow-sm">
              <ArrowLeftRight size={14} />
              {visaoAtiva === 'frente' ? 'Ver Costas' : 'Ver Frente'}
            </button>
          </div>
          <div className="relative bg-slate-50 border border-slate-100 rounded-3xl p-4 shadow-inner w-full flex justify-center">
            {visaoAtiva === 'frente' ? (
              <svg viewBox="0 0 200 380" className="w-full max-w-[200px] h-auto drop-shadow-md">
                <g stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="100" y1="25" x2="100" y2="190" />
                  <line x1="60" y1="75" x2="140" y2="75" />
                  <polyline points="60,75 45,130 30,185" fill="none" />
                  <polyline points="140,75 155,130 170,185" fill="none" />
                  <polyline points="100,190 75,265 75,345" fill="none" />
                  <polyline points="100,190 125,265 125,345" fill="none" />
                </g>
                {zonasCorpo.filter(z => z.visao === 'frente').map((zona) => (
                  <circle key={zona.id} cx={zona.cx} cy={zona.cy} r={zona.r} className={`cursor-pointer transition-all duration-300 ${mapaDor.includes(zona.id) ? 'fill-rose-500 stroke-rose-200 stroke-4 shadow-glow animate-pulse' : 'fill-white stroke-slate-300 stroke-[1.5] hover:fill-[#2CB4CC]/20 hover:stroke-[#2CB4CC]'}`} onClick={() => toggleDor(zona.id)} title={`${zona.label} (Frente)`} />
                ))}
              </svg>
            ) : (
              <svg viewBox="0 0 200 380" className="w-full max-w-[200px] h-auto drop-shadow-md">
                <g stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="100" y1="30" x2="100" y2="190" />
                  <line x1="60" y1="75" x2="140" y2="75" />
                  <polyline points="60,75 45,130 30,185" fill="none" />
                  <polyline points="140,75 155,130 170,185" fill="none" />
                  <polyline points="100,190 80,220 75,295 75,345" fill="none" />
                  <polyline points="100,190 120,220 125,295 125,345" fill="none" />
                  <line x1="100" y1="80" x2="75" y2="85" strokeWidth="4" />
                  <line x1="100" y1="80" x2="125" y2="85" strokeWidth="4" />
                </g>
                {zonasCorpo.filter(z => z.visao === 'costas').map((zona) => (
                  <circle key={zona.id} cx={zona.cx} cy={zona.cy} r={zona.r} className={`cursor-pointer transition-all duration-300 ${mapaDor.includes(zona.id) ? 'fill-rose-500 stroke-rose-200 stroke-4 shadow-glow animate-pulse' : 'fill-white stroke-slate-300 stroke-[1.5] hover:fill-[#2CB4CC]/20 hover:stroke-[#2CB4CC]'}`} onClick={() => toggleDor(zona.id)} title={`${zona.label} (Costas)`} />
                ))}
              </svg>
            )}
          </div>
          <div className="mt-6 w-full space-y-3">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Áreas Selecionadas</h3>
            <div className="flex flex-wrap justify-center gap-2 min-h-[30px]">
              {mapaDor.length === 0 && <span className="text-xs text-slate-400 font-medium italic">Nenhum ponto marcado.</span>}
              {mapaDor.map(id => (
                <span key={id} className="bg-rose-100 text-rose-600 text-[11px] font-bold px-2.5 py-1.5 rounded-lg border border-rose-200 shadow-sm animate-in zoom-in duration-200">
                  {zonasCorpo.find(z => z.id === id)?.label || id}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl shadow-xl p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Paciente</label>
              <div className="relative">
                <UserCircle className="absolute left-4 top-3 text-slate-400" size={20} />
                <select value={pacienteId} onChange={e => setPacienteId(e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm outline-none font-bold text-slate-700 shadow-sm focus:border-[#2CB4CC]">
                  <option value="">Selecione o paciente...</option>
                  {pacientes?.map(p => <option key={p.id} value={p.id}>{p.nome_completo}</option>)}
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Data da Avaliação</label>
              <input type="date" value={formData.data_avaliacao} onChange={e => setFormData({...formData, data_avaliacao: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none font-bold text-slate-700 shadow-sm focus:border-[#2CB4CC]" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Queixa Principal (QP)</label>
            <textarea rows="2" value={formData.queixa_principal} onChange={e => setFormData({...formData, queixa_principal: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none resize-none shadow-sm focus:border-[#2CB4CC]"></textarea>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Palpação</label>
              <textarea rows="2" value={formData.anotacoes_palpacao} onChange={e => setFormData({...formData, anotacoes_palpacao: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none resize-none shadow-sm focus:border-[#2CB4CC]"></textarea>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Objetivos</label>
              <textarea rows="2" value={formData.objetivos_clinicos} onChange={e => setFormData({...formData, objetivos_clinicos: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none resize-none shadow-sm focus:border-[#2CB4CC]"></textarea>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl shadow-xl p-8 mt-8">
        <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
          <Activity className="text-[#2CB4CC]" size={24} />
          <h2 className="text-xl font-black text-[#005477]">Histórico de Evolução do Paciente</h2>
        </div>

        {!pacienteId ? (
          <p className="text-center text-slate-400 font-medium py-10">Selecione um paciente acima para carregar o histórico.</p>
        ) : historico.length === 0 ? (
          <p className="text-center text-slate-400 font-medium py-10">Nenhum prontuário registrado para este paciente.</p>
        ) : (
          <div className="space-y-6">
            {historico.map((registro) => {
              const doresArray = parseDores(registro.mapa_dor_json);
              const dataFormatada = new Date(registro.data_avaliacao).toLocaleDateString('pt-BR');

              return (
                <div key={registro.id} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border-l-4 border-l-[#2CB4CC]">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-slate-400" />
                      <span className="font-black text-[#005477] text-lg">{dataFormatada}</span>
                    </div>
                    {/* 🚀 BOTÃO DE EXCLUIR EVOLUÇÃO AQUI */}
                    <button 
                      onClick={() => excluirEvolucao(registro.id)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                      title="Excluir evolução"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-1">
                      <h4 className="text-[10px] uppercase font-black tracking-widest text-[#2CB4CC]">Queixa Principal</h4>
                      <p className="text-sm text-slate-600 font-medium italic">"{registro.queixa_principal || '--'}"</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[10px] uppercase font-black tracking-widest text-[#005477]">Anotações de Palpação</h4>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed">{registro.anotacoes_palpacao || '--'}</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[10px] uppercase font-black tracking-widest text-[#005477]">Objetivos Clínicos</h4>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed">{registro.objetivos_clinicos || '--'}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-[10px] uppercase font-black tracking-widest text-rose-400">Mapa de Dor</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {doresArray.length === 0 ? <span className="text-xs text-slate-400">Nenhum ponto marcado.</span> : doresArray.map(dorId => (
                          <span key={dorId} className="bg-rose-50 text-rose-600 text-[10px] font-bold px-2 py-1 rounded-md border border-rose-100 shadow-sm">{zonasCorpo.find(z => z.id === dorId)?.label || dorId}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}