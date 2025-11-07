import React, { useMemo, useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, parseISO } from "date-fns";

export default function TransblindadosDashboard() {
  // Mock de pagamentos
  const [payments, setPayments] = useState([
    { id: "p1", title: "Leasing Hilux BL-2022", due: "2025-11-10", amount: 8240.32, vendor: "Santander", paid: false },
    { id: "p2", title: "Seguro Frota Nov/25", due: "2025-11-12", amount: 15230.00, vendor: "Porto", paid: false },
    { id: "p3", title: "IPVA Jeep Renegade ABC-4D55", due: "2025-11-22", amount: 1830.90, vendor: "SEFAZ", paid: false },
    { id: "p4", title: "Manutenção Preventiva BMW X5", due: "2025-10-28", amount: 1290.00, vendor: "Oficina Blindados Pro", paid: true },
  ]);

  // Mock de multas
  const [fines] = useState([
    { id: "m1", plate: "HJK-9F22", model: "BMW X5", date: "2025-11-03", due: "2025-12-03", amount: 293.47, infraction: "Velocidade", source: "email" },
    { id: "m2", plate: "ABC-4D55", model: "Jeep Renegade", date: "2025-10-30", due: "2025-11-29", amount: 130.16, infraction: "Rotatória / Preferência", source: "whatsapp" },
  ]);

  // IA desativada por padrão (modo aprendizado)
  const [aiEnabled, setAiEnabled] = useState(false);

  // Calendário
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [helpOpen, setHelpOpen] = useState(false);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  // Eventos do calendário
  const events = useMemo(() => {
    const payEvents = payments.map(p => ({
      type: "payment" as const,
      date: parseISO(p.due + "T00:00:00"),
      label: p.title
    }));
    const fineEvents = fines.map(f => ({
      type: "fine" as const,
      date: parseISO(f.due + "T00:00:00"),
      label: `Multa ${f.plate}`
    }));
    return [...payEvents, ...fineEvents];
  }, [payments, fines]);

  const togglePaid = (id: string) => {
    setPayments(prev => prev.map(p => p.id === id ? { ...p, paid: !p.paid } : p));
  };

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const currency = (v:number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Barra superior */}
      <header className="px-6 py-4 bg-white shadow flex justify-between items-center">
        <h1 className="text-xl font-bold">Painel Transblindados</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setAiEnabled(!aiEnabled)}
            className={`px-4 py-2 rounded-xl ${aiEnabled ? "bg-green-600 text-white" : "bg-slate-200 text-slate-800"}`}>
            {aiEnabled ? "IA Ativa" : "IA Desativada (aprendendo)"}
          </button>
          <button
            onClick={() => setHelpOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
            Ajuda
          </button>
        </div>
      </header>

      {/* Banner de aprendizado quando IA está OFF */}
      {!aiEnabled && (
        <div className="bg-amber-50 border-y border-amber-200 text-amber-900">
          <div className="max-w-7xl mx-auto px-6 py-3 text-sm">
            <strong>Modo Aprendizado:</strong> a IA está desabilitada. Suas ações serão registradas e replicadas quando reativar.
          </div>
        </div>
      )}

      {/* Conteúdo */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* 1) Calendário */}
        <section className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs px-2 py-1 rounded bg-slate-900 text-white">1) Calendário Operacional</div>
            <div className="flex items-center gap-2">
              <button onClick={prevMonth} className="p-2 bg-slate-100 rounded-xl hover:bg-slate-200">◀</button>
              <h2 className="text-lg font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>
              <button onClick={nextMonth} className="p-2 bg-slate-100 rounded-xl hover:bg-slate-200">▶</button>
            </div>
            <div className="hidden md:flex gap-2 text-xs">
              <span className="px-2 py-1 rounded bg-blue-100 text-blue-700">Pagamento</span>
              <span className="px-2 py-1 rounded bg-purple-100 text-purple-700">Multa</span>
            </div>
          </div>

          <div className="grid grid-cols-7 text-xs font-semibold text-slate-500 mb-1">
            {["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"].map(d => <div key={d} className="text-center">{d}</div>)}
          </div>

          <div className="grid grid-cols-7 gap-1 md:gap-2 text-xs">
            {(() => {
              const days: React.ReactElement[] = [];
              let day = startDate;
              while (day <= endDate) {
                for (let i = 0; i < 7; i++) {
                  const inMonth = isSameMonth(day, monthStart);
                  const dayEvents = events.filter(e => isSameDay(e.date, day));
                  days.push(
                    <div key={day.toISOString()} className={`min-h-[90px] rounded-xl p-2 border ${inMonth ? "bg-white" : "bg-slate-100 text-slate-400"}`}>
                      <div className="font-medium">{format(day, "d")}</div>
                      <div className="mt-1 space-y-1">
                        {dayEvents.map((e, idx) => (
                          <div key={idx} className={`px-2 py-1 rounded ${e.type === "payment" ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"}`}>
                            {e.type === "payment" ? "Pagamento: " : "Multa: "}{e.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                  day = addDays(day, 1);
                }
              }
              return days;
            })()}
          </div>
        </section>

        {/* Coluna lateral */}
        <aside className="space-y-4">
          {/* 2) A Pagar */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-semibold mb-2">2) A Pagar (checklist)</h3>
            <ul className="space-y-2 text-sm">
              {payments.map(p => (
                <li key={p.id} className="flex justify-between items-center border rounded-xl p-2">
                  <div>
                    <div>{p.title}</div>
                    <div className="text-xs text-slate-500">{currency(p.amount)} · {p.vendor}</div>
                  </div>
                  <label className="inline-flex items-center gap-2 text-xs">
                    <input type="checkbox" checked={p.paid} onChange={() => togglePaid(p.id)} />
                    {p.paid ? "Pago" : "Pendente"}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* 3) Multas */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-semibold mb-2">3) Multas (associadas à placa)</h3>
            <ul className="space-y-2 text-sm">
              {fines.map(f => (
                <li key={f.id} className="flex justify-between items-center border rounded-xl p-2">
                  <div>
                    <div>{f.plate} · {f.model}</div>
                    <div className="text-xs text-slate-500">{currency(f.amount)} · {f.infraction}</div>
                  </div>
                  <div className="text-xs text-slate-400">{f.source.toUpperCase()}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* 5) Frota & Agenda */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-semibold mb-2">5) Frota & Agenda</h3>
            <p className="text-sm">Utilização média da frota (30 dias): <strong>78%</strong></p>
            <ul className="text-sm list-disc pl-5 mt-2">
              <li>BMW X5 · ABC1D23 · até 12/11</li>
              <li>Hilux · HJK9F22 · até 10/11</li>
              <li>Renegade · ABC-4D55 · 22/11 (preventiva)</li>
            </ul>
          </div>

          {/* 6) Políticas & Pricing */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-semibold mb-2">6) Políticas & Pricing</h3>
            <p className="text-sm">Caução mínima R$ 12.000 · 300 km/dia incluídos · Idade mínima 25 anos.</p>
            <div className="text-sm mt-2">IA: <strong>{aiEnabled ? "Ativa" : "Desabilitada (aprendendo)"}</strong></div>
          </div>
        </aside>
      </main>

      {/* Modal de Ajuda embutido */}
      {helpOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] md:w-[600px] relative">
            <button onClick={() => setHelpOpen(false)} className="absolute top-3 right-3 text-slate-500 hover:text-slate-700">✕</button>
            <h2 className="text-lg font-semibold mb-2">Ajuda do Painel</h2>
            <div className="text-sm text-slate-600 space-y-2">
              <p>• O botão "IA Ativa/Desativada" controla o modo autônomo. Quando desativada, o painel registra suas ações para aprender.</p>
              <p>• O Calendário mostra Pagamentos e Multas por data de vencimento.</p>
              <p>• Em "A Pagar", marque o checkbox para registrar pagamento efetuado.</p>
            </div>
          </div>
        </div>
      )}

      <footer className="p-4 text-xs text-slate-500 text-center">
        * Protótipo visual - Transblindados © 2025
      </footer>
    </div>
  );
}
