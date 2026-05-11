import React, { useState, useEffect } from 'react';
import { Search, Plus, PlayCircle, Image as ImageIcon, X, Pencil, Trash2 } from 'lucide-react';


export default function BancoExercicios() {
  const [exercicios, setExercicios] = useState([]);
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [editandoId, setEditandoId] = useState(null); // 🚀 Controla se estamos editando
  
  const [formData, setFormData] = useState({ 
    nome: '', 
    categoria: '', 
    descricao: '', 
    url_midia: '' 
  });

  const carregarExercicios = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/exercicios');
      const dados = await res.json();
      setExercicios(dados);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { carregarExercicios(); }, []);

  // 🚀 Abre o modal preparando para EDITAR
  const prepararEdicao = (ex) => {
    setEditandoId(ex.id);
    setFormData({
      nome: ex.nome,
      categoria: ex.categoria,
      descricao: ex.descricao,
      url_midia: ex.url_midia
    });
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setEditandoId(null);
    setFormData({ nome: '', categoria: '', descricao: '', url_midia: '' });
  };

  const handleExcluir = async (id) => {
  if (window.confirm("Tem certeza que deseja excluir este exercício?")) {
    try {
      const res = await fetch(`http://localhost:3000/api/exercicios/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        carregarExercicios(); // Recarrega a lista após apagar
      }
    } catch (err) { console.error(err); }
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Se tiver editandoId, vai para a rota de update, senão para a de criar
    const url = editandoId 
      ? `http://localhost:3000/api/exercicios/${editandoId}` 
      : 'http://localhost:3000/api/exercicios';
    
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        carregarExercicios();
        fecharModal();
      }
    } catch (err) { console.error(err); }
  };

  const filtrarExercicios = exercicios.filter(ex => 
    ex.nome?.toLowerCase().includes(busca.toLowerCase()) || 
    ex.categoria?.toLowerCase().includes(busca.toLowerCase())
  );

  const isVideo = (url) => url?.includes('youtube.com') || url?.includes('youtu.be');

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-[#005477] tracking-tight">Biblioteca de Exercícios</h1>
          <p className="text-slate-500 font-medium mt-1">Gerencie os movimentos do protocolo Maya RPG.</p>
        </div>
        <button 
          onClick={() => setModalAberto(true)}
          className="bg-[#2CB4CC] hover:bg-[#005477] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2"
        >
          <Plus size={20} /> Adicionar Novo
        </button>
      </div>

      {/* BUSCA */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
        <input 
          type="text" 
          placeholder="Filtrar por nome ou categoria..." 
          className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-4 shadow-sm outline-none focus:border-[#2CB4CC] font-medium transition-all"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
        {filtrarExercicios.map((ex) => (
          <div key={ex.id} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 group hover:shadow-2xl hover:border-[#2CB4CC]/50 transition-all relative">
            
            {/* BOTÃO EXCLUIR (AO LADO DO EDITAR) */}
<div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
  <button 
    onClick={() => prepararEdicao(ex)}
    className="p-2 bg-white/90 backdrop-blur-md rounded-xl text-amber-500 shadow-lg hover:bg-amber-500 hover:text-white transition-all"
  >
    <Pencil size={18} />
  </button>
  <button 
    onClick={() => handleExcluir(ex.id)}
    className="p-2 bg-white/90 backdrop-blur-md rounded-xl text-rose-500 shadow-lg hover:bg-rose-500 hover:text-white transition-all"
  >
    <Trash2 size={18} />
  </button>
</div>

            <div className="h-48 bg-slate-100 flex items-center justify-center overflow-hidden">
              {ex.url_midia ? (
                isVideo(ex.url_midia) ? (
                  <div className="flex flex-col items-center text-[#2CB4CC]"><PlayCircle size={40} /><span className="text-[10px] font-black mt-1">YOUTUBE</span></div>
                ) : (
                  <img src={ex.url_midia} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                )
              ) : (
                <ImageIcon size={40} className="text-slate-200" />
              )}
              <div className="absolute top-4 left-4">
                <span className="bg-[#2CB4CC] text-white text-[9px] font-black px-3 py-1 rounded-lg uppercase shadow-lg">
                  {ex.categoria}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-black text-[#005477] mb-2">{ex.nome}</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-3">
                {ex.descricao || 'Sem descrição.'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL REUTILIZÁVEL */}
      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#005477]/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-[#005477]">
                {editandoId ? 'Editar Exercício' : 'Novo Exercício'}
              </h2>
              <button onClick={fecharModal} className="text-slate-400 hover:text-red-500 transition-colors"><X /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Nome</label>
                  <input required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#2CB4CC] font-bold" value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Categoria</label>
                  <select required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#2CB4CC] font-bold text-slate-500" value={formData.categoria} onChange={e => setFormData({...formData, categoria: e.target.value})}>
                    <option value="">Selecione...</option>
                    <option>Alongamento</option><option>Fortalecimento</option><option>Mobilidade</option><option>Postura RPG</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Descrição</label>
                <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#2CB4CC] h-24 resize-none" value={formData.descricao} onChange={e => setFormData({...formData, descricao: e.target.value})}></textarea>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Link da Mídia (Imagem/YouTube)</label>
                <input className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#2CB4CC]" value={formData.url_midia} onChange={e => setFormData({...formData, url_midia: e.target.value})} />
              </div>
              
              <button type="submit" className="w-full bg-[#005477] text-white font-black py-4 rounded-xl mt-4 hover:bg-[#2CB4CC] transition-all shadow-lg uppercase tracking-widest text-sm">
                {editandoId ? 'Salvar Alterações' : 'Cadastrar Exercício'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 