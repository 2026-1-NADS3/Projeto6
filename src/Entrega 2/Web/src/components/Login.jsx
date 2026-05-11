import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  // 🚀 Nova função de Login (Conectada ao Banco de Dados real!)
  const handleLogin = async (e) => {
    e.preventDefault();
    setErro(''); // Limpa qualquer erro antigo da tela

    try {
      const resposta = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha }) // Manda o que o usuário digitou
      });

      const dados = await resposta.json();

      if (resposta.ok && dados.sucesso) {
        console.log("Usuário logado:", dados.usuario);
        onLogin(); // Libera o acesso para o Dashboard!
      } else {
        // Se a senha tiver errada, mostra a mensagem de erro que veio do Node
        setErro(dados.erro || 'Erro ao tentar acessar o sistema.');
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setErro('Erro de conexão. Verifique se o servidor backend está rodando.');
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-2xl p-10 rounded-3xl border border-white/60 shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-500">
      
      {/* LOGO DA CLÍNICA */}
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="flex flex-col font-black text-2xl text-white shadow-sm rotate-3 hover:rotate-0 transition-transform cursor-pointer mb-4">
          <div className="flex gap-0.5 mb-0.5">
            <div className="w-10 h-10 rounded-xl bg-[#2CB4CC] flex items-center justify-center border border-white/50 shadow-sm">M</div>
            <div className="w-10 h-10 rounded-xl bg-[#2CB4CC]/80 flex items-center justify-center border border-white/50 shadow-sm">Y</div>
          </div>
          <div className="flex gap-0.5">
            <div className="w-10 h-10 rounded-xl bg-[#005477] flex items-center justify-center border border-white/50 shadow-sm">R</div>
            <div className="w-10 h-10 rounded-xl bg-[#005477]/80 flex items-center justify-center border border-white/50 shadow-sm">G</div>
          </div>
        </div>
        <h1 className="text-2xl font-black text-[#005477] tracking-tight">CLÍNICA <span className="text-[#2CB4CC]">MAYA RPG</span></h1>
        <p className="text-slate-500 text-sm font-bold mt-1">Acesso Administrativo</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        {/* Mensagem de Erro Dinâmica */}
        {erro && <p className="text-[#EF6A55] text-xs text-center font-bold bg-[#EF6A55]/10 p-3 rounded-xl border border-[#EF6A55]/20">{erro}</p>}

        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">E-mail</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-white/50 border border-white/80 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2CB4CC]/50 focus:border-[#2CB4CC] outline-none transition-all placeholder:text-slate-400 font-bold text-slate-700 shadow-sm"
            placeholder="admin@maya.com"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Senha</label>
          <input
            type="password"
            required
            value={senha}
            onChange={e => setSenha(e.target.value)}
            className="w-full bg-white/50 border border-white/80 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2CB4CC]/50 focus:border-[#2CB4CC] outline-none transition-all placeholder:text-slate-400 font-bold text-slate-700 shadow-sm"
            placeholder="••••••••"
          />
        </div>

        <button type="submit" className="w-full bg-[#005477] hover:bg-[#2CB4CC] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg mt-4">
          Entrar no Sistema
        </button>
      </form>
    </div>
  );
}