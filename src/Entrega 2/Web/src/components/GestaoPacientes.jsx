import React, { useState } from 'react';
import { Search, Plus, Eye, X, Pencil, Trash2 } from 'lucide-react';

export default function GestaoPacientes({ pacientes, setPacientes, setTelaAtiva }) {
  const [busca, setBusca] = useState('');
  
  // Estados do Modal
  const [isModalAberto, setIsModalAberto] = useState(false);
  const [editandoId, setEditandoId] = useState(null); // Sabe se é novo cadastro ou edição
  
  const [formData, setFormData] = useState({
    nome_completo: '',
    cpf: '',
    telefone: '',
    data_nascimento: '',
    profissao: ''
  });

  // Função para calcular a idade
  const calcularIdade = (dataNascimento) => {
    if (!dataNascimento) return '--';
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  // Filtro da tabela (Busca)
  const pacientesFiltrados = pacientes.filter(p => 
    p.nome_completo?.toLowerCase().includes(busca.toLowerCase()) || 
    p.cpf?.includes(busca)
  );

  // Prepara o modal para edição
  const abrirModalParaEditar = (paciente) => {
    setEditandoId(paciente.id);
    const dataFormatada = paciente.data_nascimento ? new Date(paciente.data_nascimento).toISOString().split('T')[0] : '';
    setFormData({ ...paciente, data_nascimento: dataFormatada });
    setIsModalAberto(true);
  };

  // 🚀 Salvar (Serve tanto para CRIAR quanto para EDITAR)
  const handleSalvar = async (e) => {
    e.preventDefault();
    const url = editandoId ? `http://localhost:3000/api/pacientes/${editandoId}` : 'http://localhost:3000/api/pacientes';
    const metodo = editandoId ? 'PUT' : 'POST';

    try {
      const resposta = await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (resposta.ok) {
        // Atualiza a lista buscando do banco novamente para garantir os dados
        const listaAtualizada = await fetch('http://localhost:3000/api/pacientes').then(r => r.json());
        setPacientes(listaAtualizada);
        fecharModal();
      } else {
        alert('Erro ao salvar paciente.');
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert('Erro de conexão com o servidor.');
    }
  };

  // 🚀 Deletar Paciente
  const handleEliminar = async (id) => {
    if (window.confirm("Tem certeza que deseja remover este paciente? Essa ação não pode ser desfeita.")) {
      try {
        await fetch(`http://localhost:3000/api/pacientes/${id}`, { method: 'DELETE' });
        setPacientes(pacientes.filter(p => p.id !== id));
      } catch (err) { 
        console.error(err); 
      }
    }
  };

  // Limpa tudo ao fechar o modal
  const fecharModal = () => {
    setIsModalAberto(false);
    setEditandoId(null);
    setFormData({ nome_completo: '', cpf: '', telefone: '', data_nascimento: '', profissao: '' });
  };

  return (
    <div className="animate-in fade-in duration-500 relative">
      
      {/* CABEÇALHO */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-[#005477] tracking-tight">Pacientes</h1>
          <p className="text-slate-500 font-medium mt-1">Gerenciamento de prontuários e evolução.</p>
        </div>
        <button 
          onClick={() => setIsModalAberto(true)}
          className="bg-[#2CB4CC] hover:bg-[#005477] text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-[#2CB4CC]/30 flex items-center gap-2 group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          Cadastrar Paciente
        </button>
      </div>

      {/* CARTÃO DA TABELA */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl shadow-xl overflow-hidden">
        
        {/* BARRA DE BUSCA */}
        <div className="p-6 border-b border-slate-100 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Buscar por nome ou CPF..." 
              className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-[#2CB4CC]/50 focus:border-[#2CB4CC] outline-none font-medium text-slate-700 shadow-sm"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>

        {/* TABELA DE PACIENTES */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] uppercase tracking-widest text-slate-400 font-black border-b border-slate-100">
                <th className="p-5 pl-6 rounded-tl-3xl">Paciente</th>
                <th className="p-5">Contato</th>
                <th className="p-5">Profissão</th>
                <th className="p-5">Status</th>
                <th className="p-5 text-center pr-6 rounded-tr-3xl">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pacientesFiltrados.map((paciente) => (
                <tr key={paciente.id} className="hover:bg-white/50 transition-colors group">
                  <td className="p-5 pl-6">
                    <p className="font-bold text-slate-700 group-hover:text-[#005477] transition-colors">{paciente.nome_completo}</p>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                      {calcularIdade(paciente.data_nascimento)} anos • CPF: {paciente.cpf}
                    </p>
                  </td>
                  <td className="p-5 text-sm font-medium text-slate-600">{paciente.telefone}</td>
                  <td className="p-5 text-sm font-medium text-slate-600 capitalize">{paciente.profissao || '--'}</td>
                  <td className="p-5">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-wider rounded-lg border border-emerald-200">
                      ATIVO
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center justify-center gap-2">
                      {/* BOTÃO PRONTUÁRIO */}
                      <button 
                        onClick={() => setTelaAtiva('prontuario')}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-[#2CB4CC] hover:bg-[#2CB4CC] hover:text-white transition-all border border-[#2CB4CC]/20"
                        title="Ver Prontuário"
                      >
                        <Eye size={18} />
                      </button>
                      
                      {/* BOTÃO EDITAR */}
                      <button 
                        onClick={() => abrirModalParaEditar(paciente)}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-white transition-all border border-amber-500/20"
                        title="Editar Paciente"
                      >
                        <Pencil size={18} />
                      </button>

                      {/* BOTÃO DELETAR */}
                      <button 
                        onClick={() => handleEliminar(paciente.id)}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition-all border border-rose-500/20"
                        title="Remover Paciente"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {pacientesFiltrados.length === 0 && (
            <div className="p-10 text-center text-slate-500 font-medium flex flex-col items-center">
              <p className="text-lg text-slate-400 mb-1">Nenhum paciente encontrado.</p>
              <p className="text-sm">Tente mudar os termos da sua busca.</p>
            </div>
          )}
        </div>
      </div>

      {/* MODAL DE CADASTRO/EDIÇÃO PREMIUM */}
      {isModalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-300">
            
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-black text-[#005477]">
                {editandoId ? 'Editar Paciente' : 'Novo Paciente'}
              </h2>
              <button 
                onClick={fecharModal}
                className="text-slate-400 hover:text-[#EF6A55] transition-colors p-1"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSalvar} className="p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Nome Completo</label>
                <input 
                  type="text" required
                  value={formData.nome_completo}
                  onChange={(e) => setFormData({...formData, nome_completo: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2CB4CC]/50 focus:border-[#2CB4CC] outline-none transition-all font-medium text-slate-700"
                  placeholder="Ex: João da Silva"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">CPF</label>
                  <input 
                    type="text" required
                    value={formData.cpf}
                    onChange={(e) => setFormData({...formData, cpf: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2CB4CC]/50 focus:border-[#2CB4CC] outline-none transition-all font-medium text-slate-700"
                    placeholder="000.000.000-00"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Telefone (WhatsApp)</label>
                  <input 
                    type="text" required
                    value={formData.telefone}
                    onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2CB4CC]/50 focus:border-[#2CB4CC] outline-none transition-all font-medium text-slate-700"
                    placeholder="(11) 90000-0000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Data de Nascimento</label>
                  <input 
                    type="date" required
                    value={formData.data_nascimento}
                    onChange={(e) => setFormData({...formData, data_nascimento: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2CB4CC]/50 focus:border-[#2CB4CC] outline-none transition-all font-medium text-slate-700"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Profissão</label>
                  <input 
                    type="text"
                    value={formData.profissao}
                    onChange={(e) => setFormData({...formData, profissao: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2CB4CC]/50 focus:border-[#2CB4CC] outline-none transition-all font-medium text-slate-700"
                    placeholder="Ex: Arquiteto"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={fecharModal}
                  className="flex-1 px-4 py-3.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-[#005477] hover:bg-[#2CB4CC] text-white px-4 py-3.5 rounded-xl font-bold transition-colors shadow-lg"
                >
                  {editandoId ? 'Salvar Alterações' : 'Salvar Paciente'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}