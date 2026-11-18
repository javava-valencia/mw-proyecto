import React from 'react';
import { Wifi, BatteryMedium, Signal, Smartphone, RotateCcw } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  isPhoneFrame: boolean;
  activeScreenIndex: number;
  onJumpToScreen: (screen: any) => void;
  onResetTable: () => void;
}

export const PhoneFrame: React.FC<Props> = ({
  children,
  isPhoneFrame,
  activeScreenIndex,
  onJumpToScreen,
  onResetTable,
}) => {
  const screens = [
    { id: 'screen1_landing', label: '1. Inicio' },
    { id: 'screen2_table', label: '2. Mesa' },
    { id: 'screen3_identify', label: '3. Nombre' },
    { id: 'screen4_menu', label: '4. Menú' },
    { id: 'screen6_cart', label: '6. Pedido' },
    { id: 'screen7_tracker', label: '7. Cocina' },
    { id: 'screen8_table_summary', label: '8. Cuentas' },
    { id: 'screen9_payment', label: '9. Pago' },
    { id: 'screen10_waiter_confirm', label: '10. Mesero' },
  ];

  if (!isPhoneFrame) {
    return (
      <div className="w-full min-h-[calc(100vh-60px)] flex flex-col bg-stone-100 py-4 px-2 sm:px-4">
        {/* Quick Screen Bar */}
        <div className="max-w-xl mx-auto w-full mb-3 flex items-center justify-between text-xs text-stone-600 px-2 overflow-x-auto no-scrollbar gap-2">
          <span className="font-bold uppercase tracking-wider shrink-0 text-stone-400 text-[10px]">
            Saltar a pantalla:
          </span>
          <div className="flex items-center gap-1">
            {screens.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => onJumpToScreen(s.id)}
                className="px-2 py-1 rounded bg-white hover:bg-stone-200 border border-stone-200 text-[11px] font-bold shrink-0 cursor-pointer"
              >
                {s.label}
              </button>
            ))}
          </div>
          <button
            onClick={onResetTable}
            title="Reiniciar simulación"
            className="p-1 text-stone-500 hover:text-black shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="max-w-md mx-auto w-full bg-white shadow-xl rounded-2xl overflow-hidden min-h-[800px] border border-stone-200 flex flex-col">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-65px)] flex flex-col items-center justify-start bg-stone-100 py-6 px-4">
      {/* Quick Screen Jumper & Helper Bar */}
      <div className="max-w-xl w-full mb-5 flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-stone-200 shadow-2xs">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 shrink-0">
            Simulador Wireframes:
          </span>
          {screens.map((s) => (
            <button
              key={s.id}
              onClick={() => onJumpToScreen(s.id)}
              className="px-2.5 py-1 rounded-md text-xs font-bold text-stone-700 hover:bg-stone-100 border border-stone-200 shrink-0 transition-colors cursor-pointer"
            >
              {s.label}
            </button>
          ))}
        </div>
        <button
          onClick={onResetTable}
          className="text-xs font-bold text-stone-500 hover:text-black flex items-center gap-1 shrink-0 ml-3 cursor-pointer"
          title="Reiniciar datos de mesa a valores iniciales"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reiniciar</span>
        </button>
      </div>

      {/* Realistic Smartphone Bezel */}
      <div className="relative w-full max-w-[400px] h-[844px] bg-black rounded-[52px] p-3 shadow-2xl ring-1 ring-stone-900/10 flex flex-col shrink-0">
        {/* Outer buttons indicators */}
        <div className="absolute -left-1.5 top-28 w-1 h-10 bg-stone-700 rounded-l-sm" />
        <div className="absolute -left-1.5 top-42 w-1 h-12 bg-stone-700 rounded-l-sm" />
        <div className="absolute -left-1.5 top-58 w-1 h-12 bg-stone-700 rounded-l-sm" />
        <div className="absolute -right-1.5 top-36 w-1 h-16 bg-stone-700 rounded-r-sm" />

        {/* Screen Bezel Interior */}
        <div className="relative w-full h-full bg-white rounded-[40px] overflow-hidden flex flex-col border border-stone-300">
          {/* iOS / Mobile Status Bar */}
          <div className="h-10 px-6 pt-1 flex items-center justify-between text-xs font-semibold text-stone-900 shrink-0 select-none bg-white z-30">
            <span className="font-bold text-[13px] tracking-tight">19:42</span>
            
            {/* Dynamic Island Notch */}
            <div className="w-24 h-5 bg-black rounded-full mx-auto" />

            <div className="flex items-center gap-1.5">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <BatteryMedium className="w-4 h-4" />
            </div>
          </div>

          {/* Screen Content */}
          <div className="flex-1 overflow-y-auto flex flex-col relative">
            {children}
          </div>

          {/* Bottom Home Indicator Bar */}
          <div className="h-5 bg-white flex items-center justify-center shrink-0">
            <div className="w-32 h-1 bg-stone-300 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
