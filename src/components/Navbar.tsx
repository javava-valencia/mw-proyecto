import React from 'react';
import { Bell, Smartphone, Monitor, Receipt } from 'lucide-react';

interface Props {
  activeView: 'comanda' | 'design-system';
  onSelectView: (view: 'comanda' | 'design-system') => void;
  isPhoneFrame: boolean;
  onTogglePhoneFrame: () => void;
  onOpenTicket: () => void;
  onOpenWaiter: () => void;
  tableNumber: number;
}

export const Navbar: React.FC<Props> = ({
  activeView,
  onSelectView,
  isPhoneFrame,
  onTogglePhoneFrame,
  onOpenTicket,
  onOpenWaiter,
  tableNumber,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 bg-white border-b border-stone-200 sticky top-0 z-40">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => onSelectView('comanda')}
          className="text-lg font-black tracking-tight text-stone-950 uppercase whitespace-nowrap shrink-0 hover:opacity-80 transition-opacity cursor-pointer text-left"
        >
          La Casa de Toño
        </button>
      </div>

      {/* Zone 2: 4 concise single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-stone-600">
        <button
          onClick={() => onSelectView('comanda')}
          className={`hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeView === 'comanda' ? 'text-black font-extrabold underline underline-offset-8 decoration-2' : ''
          }`}
        >
          Comanda Digital
        </button>
        <button
          onClick={() => onSelectView('design-system')}
          className={`hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeView === 'design-system' ? 'text-black font-extrabold underline underline-offset-8 decoration-2' : ''
          }`}
        >
          Sistema de Diseño
        </button>
        <button
          onClick={onTogglePhoneFrame}
          className="text-stone-500 hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer text-xs uppercase tracking-wider"
          title="Alternar vista simulador móvil / pantalla completa"
        >
          {isPhoneFrame ? (
            <>
              <Monitor className="w-4 h-4" />
              <span>Modo Escritorio</span>
            </>
          ) : (
            <>
              <Smartphone className="w-4 h-4" />
              <span>Simulador Celular</span>
            </>
          )}
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenTicket}
          className="px-3.5 py-2 text-xs font-bold text-stone-900 border border-stone-300 rounded-lg hover:border-black transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
        >
          <Receipt className="w-3.5 h-3.5" />
          <span>Ticket Mesa {tableNumber}</span>
        </button>
      </div>
    </header>
  );
};
