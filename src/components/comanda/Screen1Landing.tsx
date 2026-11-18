import React from 'react';
import { MapPin, UtensilsCrossed, CreditCard, ChevronRight, HelpCircle } from 'lucide-react';

interface Props {
  onStart: () => void;
  onCallWaiterDirect: () => void;
  tableNumber: number;
  branchName: string;
}

export const Screen1Landing: React.FC<Props> = ({
  onStart,
  onCallWaiterDirect,
  tableNumber,
  branchName,
}) => {
  return (
    <div className="flex flex-col min-h-full bg-white text-stone-900">
      {/* Top Brand Header */}
      <div className="py-4 px-6 border-b border-stone-200 text-center sticky top-0 bg-white/95 backdrop-blur-sm z-10">
        <h1 className="text-xl font-extrabold tracking-tight uppercase">
          La Casa de Toño
        </h1>
      </div>

      <div className="flex-1 flex flex-col px-6 pt-5 pb-8 overflow-y-auto max-w-lg mx-auto w-full">
        {/* Hero Image Box (Matches wireframe placeholder with real warm restaurant photography) */}
        <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-sm aspect-16/10 bg-stone-100 mb-6 group">
          <img
            src="/src/assets/images/hero_comensales_pozoleria_1794453926653.jpg"
            alt="Comensales disfrutando en La Casa de Toño"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white drop-shadow-md">
            <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md font-medium">
              Mesa {tableNumber} · {branchName}
            </span>
            <span className="bg-emerald-600/90 text-white px-2 py-0.5 rounded text-[11px] font-semibold">
              Comanda Digital
            </span>
          </div>
        </div>

        {/* Title and Value Proposition */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-stone-950 mb-2.5">
            Pide desde tu celular
          </h2>
          <p className="text-stone-600 text-base leading-snug max-w-xs mx-auto">
            Cada quien arma su propio pedido y paga solo lo suyo.
          </p>
        </div>

        {/* 3 Step Explanation (Exact match to wireframe 1) */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-4 p-3.5 rounded-xl border border-stone-100 bg-stone-50/70 hover:bg-stone-50 transition-colors">
            <div className="w-12 h-12 rounded-full border border-stone-300 bg-white flex items-center justify-center shrink-0 shadow-xs">
              <MapPin className="w-5 h-5 text-stone-900" />
            </div>
            <div>
              <p className="font-bold text-base text-stone-900">
                1. Confirma tu mesa
              </p>
              <p className="text-xs text-stone-500">
                Verifica que el QR coincida con tu mesa física.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3.5 rounded-xl border border-stone-100 bg-stone-50/70 hover:bg-stone-50 transition-colors">
            <div className="w-12 h-12 rounded-full border border-stone-300 bg-white flex items-center justify-center shrink-0 shadow-xs">
              <UtensilsCrossed className="w-5 h-5 text-stone-900" />
            </div>
            <div>
              <p className="font-bold text-base text-stone-900">
                2. Pide lo que quieras
              </p>
              <p className="text-xs text-stone-500">
                Pozoles, flautas o antojitos directo a cocina.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3.5 rounded-xl border border-stone-100 bg-stone-50/70 hover:bg-stone-50 transition-colors">
            <div className="w-12 h-12 rounded-full border border-stone-300 bg-white flex items-center justify-center shrink-0 shadow-xs">
              <CreditCard className="w-5 h-5 text-stone-900" />
            </div>
            <div>
              <p className="font-bold text-base text-stone-900">
                3. Paga tu parte
              </p>
              <p className="text-xs text-stone-500">
                Divide cuentas o únelas con tus acompañantes sin enredos.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons (Strict to wireframe 1) */}
        <div className="mt-auto space-y-3 pt-4">
          <button
            onClick={onStart}
            className="w-full h-14 bg-black text-white font-black text-lg tracking-wider rounded-xl uppercase hover:bg-stone-800 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            Empezar
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="text-center pt-2">
            <button
              onClick={onCallWaiterDirect}
              className="text-stone-500 hover:text-stone-900 text-sm font-bold uppercase tracking-wider underline underline-offset-4 decoration-stone-400 hover:decoration-stone-900 transition-colors cursor-pointer"
            >
              Pedir con el mesero
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
