import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp, Bell, PlusCircle, Receipt, Utensils } from 'lucide-react';
import { CartItem, TableDiner } from '../../types';

interface Props {
  tableNumber: number;
  currentRound: number;
  items: CartItem[];
  currentUserId: string;
  diners: TableDiner[];
  onOrderAnotherRound: () => void;
  onCallWaiter: () => void;
  onViewTableSummary: () => void;
}

export const Screen7KitchenTracker: React.FC<Props> = ({
  tableNumber,
  currentRound,
  items,
  currentUserId,
  diners,
  onOrderAnotherRound,
  onCallWaiter,
  onViewTableSummary,
}) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  // Filter items in current round for user
  const roundItems = items.filter(
    (item) =>
      item.orderRound === currentRound &&
      (item.paidByUserId === currentUserId || item.sharedWithUserIds?.includes(currentUserId))
  );

  const roundDishesCount = roundItems.reduce((acc, i) => acc + i.quantity, 0);

  const roundSubtotal = roundItems.reduce((acc, item) => {
    if (item.sharedWithUserIds && item.sharedWithUserIds.length > 0) {
      return acc + (item.unitPrice * item.quantity) / item.sharedWithUserIds.length;
    }
    return acc + item.unitPrice * item.quantity;
  }, 0);

  return (
    <div className="flex flex-col min-h-full bg-white text-stone-900">
      <div className="flex-1 flex flex-col items-center px-6 pt-10 pb-8 max-w-lg mx-auto w-full overflow-y-auto text-center">
        {/* Large Black Check Circle (Wireframe 7) */}
        <div className="w-20 h-20 rounded-full bg-stone-950 text-white flex items-center justify-center mb-6 shadow-md animate-in zoom-in-90 duration-300">
          <Check className="w-10 h-10 stroke-[3]" />
        </div>

        {/* Title and Table Info */}
        <h1 className="text-3xl font-black text-stone-950 tracking-tight mb-1">
          ¡Tu pedido va a la cocina!
        </h1>
        <p className="text-sm font-bold text-stone-500 mb-8">
          Mesa {tableNumber} · Ronda {currentRound}
        </p>

        {/* Vertical Stepper Timeline (Exact match to Wireframe 7) */}
        <div className="w-full max-w-xs text-left mb-8 pl-4">
          {/* Step 1: Recibido (Checked) */}
          <div className="flex items-start gap-4 relative">
            <div className="w-7 h-7 rounded-full bg-stone-950 text-white flex items-center justify-center shrink-0 z-10">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <div className="pt-0.5">
              <p className="font-extrabold text-base text-stone-950">
                Recibido
              </p>
              <p className="text-xs text-stone-500">Impreso en cocina</p>
            </div>
            {/* Connecting line */}
            <div className="absolute left-3.5 top-7 w-[2px] h-10 bg-stone-900" />
          </div>

          {/* Spacer */}
          <div className="h-6" />

          {/* Step 2: En preparación (Active indicator) */}
          <div className="flex items-start gap-4 relative">
            <div className="w-7 h-7 rounded-full border-[3px] border-stone-950 bg-white flex items-center justify-center shrink-0 z-10">
              <div className="w-3 h-3 rounded-full bg-stone-950 animate-pulse" />
            </div>
            <div className="pt-0.5">
              <p className="font-extrabold text-base text-stone-950">
                En preparación
              </p>
              <p className="text-xs text-stone-500">
                Cocinando tu pozole y antojitos al momento
              </p>
            </div>
            {/* Connecting line */}
            <div className="absolute left-3.5 top-7 w-[2px] h-10 bg-stone-200" />
          </div>

          {/* Spacer */}
          <div className="h-6" />

          {/* Step 3: En camino a tu mesa */}
          <div className="flex items-start gap-4">
            <div className="w-7 h-7 rounded-full border-2 border-stone-300 bg-white flex items-center justify-center shrink-0 z-10" />
            <div className="pt-0.5">
              <p className="font-semibold text-base text-stone-400">
                En camino a tu mesa
              </p>
              <p className="text-xs text-stone-400">
                El mesero te lo llevará caliente
              </p>
            </div>
          </div>
        </div>

        {/* Collapsible Order Accordion (Wireframe 7: Ronda 1 · 2 platillos $130.33) */}
        <div className="w-full max-w-sm border border-stone-200 rounded-xl mb-8 overflow-hidden text-left bg-stone-50/50">
          <button
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            className="w-full p-4 flex items-center justify-between hover:bg-stone-50 transition-colors cursor-pointer"
          >
            <div>
              <p className="font-extrabold text-sm text-stone-950">
                Ronda {currentRound} · {roundDishesCount} platillos
              </p>
              <p className="text-xs text-stone-500 tabular-nums font-bold">
                ${roundSubtotal.toFixed(2)}
              </p>
            </div>
            {isAccordionOpen ? (
              <ChevronUp className="w-5 h-5 text-stone-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-stone-500" />
            )}
          </button>

          {isAccordionOpen && (
            <div className="px-4 pb-4 pt-1 border-t border-stone-200 bg-white space-y-2 text-xs">
              {roundItems.map((item) => (
                <div key={item.cartItemId} className="flex justify-between py-1 border-b border-stone-100 last:border-b-0">
                  <div>
                    <span className="font-bold text-stone-900">{item.quantity}x {item.name}</span>
                    {item.meat && <span className="text-stone-500 ml-1">({item.meat})</span>}
                  </div>
                  <span className="font-semibold tabular-nums text-stone-800">
                    ${(item.unitPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons (Wireframe 7) */}
        <div className="w-full max-w-sm mt-auto space-y-3">
          <button
            onClick={onOrderAnotherRound}
            className="w-full h-14 bg-black text-white font-black text-base tracking-wider rounded-xl uppercase hover:bg-stone-800 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Pedir otra ronda</span>
          </button>

          <button
            onClick={onViewTableSummary}
            className="w-full h-12 bg-stone-100 hover:bg-stone-200 text-stone-900 font-extrabold text-sm tracking-wide rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Receipt className="w-4 h-4 text-stone-700" />
            <span>Ver cuenta de la mesa / Pagar</span>
          </button>

          <button
            onClick={onCallWaiter}
            className="w-full h-14 border-2 border-black bg-white text-stone-950 font-black text-base tracking-wider rounded-xl uppercase hover:bg-stone-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Bell className="w-5 h-5 fill-black" />
            <span>Llamar al mesero</span>
          </button>
        </div>
      </div>
    </div>
  );
};
