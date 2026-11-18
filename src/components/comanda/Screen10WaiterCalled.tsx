import React from 'react';
import { Bell, CheckCircle2, Receipt, ArrowLeft } from 'lucide-react';

interface Props {
  totalPaid: number;
  paymentMethod: 'tarjeta' | 'mesero';
  tableNumber: number;
  userName: string;
  onReturnToTable: () => void;
  onViewTicket: () => void;
}

export const Screen10WaiterCalled: React.FC<Props> = ({
  totalPaid,
  paymentMethod,
  tableNumber,
  userName,
  onReturnToTable,
  onViewTicket,
}) => {
  const isPaidCard = paymentMethod === 'tarjeta';

  return (
    <div className="flex flex-col min-h-full bg-white text-stone-900">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-lg mx-auto w-full text-center">
        {/* Large Round Bell / Checkmark Icon (Exact to Wireframe 10) */}
        <div className="w-24 h-24 rounded-full border-2 border-black flex items-center justify-center mb-8 shadow-sm">
          {isPaidCard ? (
            <CheckCircle2 className="w-12 h-12 text-black stroke-[2.2]" />
          ) : (
            <Bell className="w-12 h-12 fill-black text-black" />
          )}
        </div>

        {/* Title (Wireframe 10: El mesero va a tu mesa) */}
        <h1 className="text-3xl font-black text-stone-950 tracking-tight mb-8">
          {isPaidCard ? '¡Pago realizado con éxito!' : 'El mesero va a tu mesa'}
        </h1>

        {/* Central Info Card (Wireframe 10) */}
        <div className="w-full max-w-xs border border-stone-200 rounded-2xl p-7 bg-stone-50/70 shadow-xs mb-8">
          <p className="text-stone-700 font-semibold text-base mb-1">
            {isPaidCard ? 'Monto cobrado' : 'Ten listo tu pago de'}
          </p>
          <h2 className="text-4xl font-black text-stone-950 my-2 tabular-nums tracking-tight">
            ${totalPaid.toFixed(2)}
          </h2>
          <p className="text-stone-600 text-sm font-medium">
            {isPaidCard ? 'Aprobado con tarjeta digital' : 'en efectivo o tarjeta'}
          </p>
        </div>

        {/* Courtesy notice (Wireframe 10) */}
        <p className="text-stone-500 font-medium text-sm mb-12">
          Gracias por tu preferencia
        </p>

        {/* Action Buttons */}
        <div className="w-full max-w-xs mt-auto space-y-3">
          <button
            onClick={onReturnToTable}
            className="w-full h-14 bg-black text-white font-black text-base tracking-wider rounded-xl uppercase hover:bg-stone-800 active:scale-[0.98] transition-all shadow-md flex items-center justify-center cursor-pointer"
          >
            Volver a la mesa
          </button>

          <button
            onClick={onViewTicket}
            className="w-full py-2.5 text-stone-600 hover:text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Receipt className="w-4 h-4" />
            <span>Ver ticket digital detallado</span>
          </button>
        </div>
      </div>
    </div>
  );
};
