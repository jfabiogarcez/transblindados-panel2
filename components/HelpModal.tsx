import React from "react";

export default function HelpModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] md:w-[600px] relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-500 hover:text-slate-700"
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold mb-2">Ajuda do Painel Transblindados</h2>
        <p className="text-sm text-slate-600">
          Este painel centraliza informações de pagamentos, multas, mensagens e eventos.
          A IA monitora comunicações (e-mail, WhatsApp) e adiciona dados automaticamente.
          O botão "IA Ativa" controla o modo autônomo.
        </p>
      </div>
    </div>
  );
}
