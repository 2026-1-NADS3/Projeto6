import React, { useState, useEffect } from 'react';
import { Printer, FileText } from 'lucide-react';

export default function Relatorio({ pacientes }) {
  const [pacienteId, setPacienteId] = useState('');
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(false);

  const buscarDadosRelatorio = async (id) => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/pacientes/${id}/relatorio`);
      const json = await res.json();
      setDados(json);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  useEffect(() => { if (pacienteId) buscarDadosRelatorio(pacienteId); }, [pacienteId]);

  const imprimir = () => { window.print(); };

  const parseDores = (jsonString) => {
    try { return JSON.parse(jsonString) || []; } 
    catch { return []; }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20 flex flex-col items-center w-full">
      
      {/* BARRA DE FERRAMENTAS - SUMIRÁ NA IMPRESSÃO */}
      <div className="flex justify-between items-center mb-8 print:hidden w-full max-w-[21cm]">
        <div>
          <h1 className="text-3xl font-black text-[#005477] tracking-tight">Exportar Relatório</h1>
          <p className="text-slate-500 font-medium">Gere um resumo clínico profissional em PDF.</p>
        </div>
        <div className="flex gap-3">
          <select 
            className="bg-white border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700 outline-none shadow-sm"
            onChange={(e) => setPacienteId(e.target.value)}
          >
            <option value="">Selecionar Paciente...</option>
            {pacientes.map(p => <option key={p.id} value={p.id}>{p.nome_completo}</option>)}
          </select>
          {dados && (
            <button onClick={imprimir} className="bg-[#005477] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg">
              <Printer size={20} /> Imprimir / PDF
            </button>
          )}
        </div>
      </div>

      {/* DOCUMENTO (A FOLHA DE PAPEL) */}
      {!dados ? (
        <div className="bg-white/40 border-2 border-dashed border-slate-200 rounded-3xl h-96 w-full max-w-[21cm] flex flex-col items-center justify-center text-slate-400">
          <FileText size={48} className="mb-4 opacity-20" />
          <p className="font-bold">Selecione um paciente para visualizar o relatório.</p>
        </div>
      ) : (
        <div id="relatorio-print" className="bg-white shadow-2xl rounded-sm p-[2cm] min-h-[29.7cm] w-[21cm] text-slate-800 transition-all">
          
          <div className="flex justify-between items-start border-b-2 border-[#2CB4CC] pb-8 mb-8">
            <div>
              <h2 className="text-2xl font-black text-[#005477]">CLÍNICA MAYA</h2>
              <p className="text-xs font-bold text-[#2CB4CC] uppercase tracking-widest">Reeducação Postural Global (RPG)</p>
            </div>
            <div className="text-right text-[10px] text-slate-400 font-bold leading-tight">
              <p>Dra. Maya Yamamoto - CREFITO 12345-F</p>
              <p>Rua da Fisioterapia, 100 - São Paulo, SP</p>
              <p>contato@clinicamaya.com.br</p>
            </div>
          </div>

          <h1 className="text-center text-xl font-black uppercase tracking-tighter mb-10 border-y py-2 border-slate-100">
            Relatório de Evolução Clínica
          </h1>

          <section className="mb-10">
            <h3 className="text-xs font-black uppercase text-[#2CB4CC] mb-3 border-l-4 border-[#2CB4CC] pl-2">Identificação do Paciente</h3>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <p><span className="font-bold">Nome:</span> {dados.paciente.nome_completo}</p>
              <p><span className="font-bold">CPF:</span> {dados.paciente.cpf}</p>
              <p><span className="font-bold">Data de Nasc:</span> {new Date(dados.paciente.data_nascimento).toLocaleDateString('pt-BR')}</p>
              <p><span className="font-bold">Profissão:</span> {dados.paciente.profissao || '--'}</p>
            </div>
          </section>

          <section className="mb-10">
            <h3 className="text-xs font-black uppercase text-[#2CB4CC] mb-3 border-l-4 border-[#2CB4CC] pl-2">Histórico de Atendimentos</h3>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b-2 border-slate-100 text-left">
                  <th className="py-2">Data</th>
                  <th className="py-2">Evolução / Palpação</th>
                  <th className="py-2">Áreas de Dor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {dados.prontuarios.map((p, i) => (
                  <tr key={i}>
                    <td className="py-3 font-bold">{new Date(p.data_avaliacao).toLocaleDateString('pt-BR')}</td>
                    <td className="py-3 pr-4">{p.anotacoes_palpacao || 'Sessão de manutenção.'}</td>
                    <td className="py-3">
                      <div className="flex flex-wrap gap-1">
                        {parseDores(p.mapa_dor_json).map(dor => (
                          <span key={dor} className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] font-bold border border-slate-200">{dor}</span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <div className="mt-20 flex flex-col items-center">
            <div className="w-64 border-t border-slate-400 mb-2"></div>
            <p className="text-xs font-bold text-slate-500">Dra. Maya Yamamoto</p>
            <p className="text-[10px] text-slate-400">Fisioterapeuta Especialista em RPG</p>
          </div>

          <div className="mt-auto pt-10 text-[9px] text-slate-300 text-center uppercase tracking-widest font-bold">
            Documento gerado digitalmente pelo Sistema Clínica Maya - {new Date().toLocaleDateString('pt-BR')}
          </div>
        </div>
      )}

      {/* 🚀 O RESET DEFINITIVO PARA IMPRESSÃO */}
      <style>{`
        @media print {
          /* 1. Esconde absolutamente TUDO do site */
          body * {
            display: none !important;
          }

          /* 2. Mostra APENAS o container do relatório */
          #relatorio-print, #relatorio-print * {
            display: block !important;
          }

          /* 3. Força o relatório a ocupar a folha inteira sem as margens do App */
          #relatorio-print {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 210mm !important; /* Largura A4 */
            min-height: 297mm !important;
            margin: 0 !important;
            padding: 2cm !important;
            box-shadow: none !important;
            border: none !important;
            background: white !important;
          }

          /* 4. Tira as margens que o Chrome coloca sozinho */
          @page {
            size: A4;
            margin: 0;
          }

          /* Garante que cores e fundos apareçam */
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>
    </div>
  );
}