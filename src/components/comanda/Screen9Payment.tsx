import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Handshake, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { TableDiner, CartItem } from '../../types';

interface Props {
  tableNumber: number;
  currentUserId: string;
  diners: TableDiner[];
  items: CartItem[];
  onBack: () => void;
  onConfirmPayment: (method: 'tarjeta' | 'mesero', totalWithTip: number, tipAmount: number) => void;
}

export const Screen9Payment: React.FC<Props> = ({
  tableNumber,
  currentUserId,
  diners,
  items,
  onBack,
  onConfirmPayment,
}) => {
  const currentDiner = diners.find((d) => d.id === currentUserId);
  const mergedPartner = diners.find((d) => d.id === currentDiner?.mergedWithDinerId);

  // Tip state (defaults to 10% matching wireframe 9)
  const [tipOption, setTipOption] = useState<'10' | '15' | '20' | 'custom'>('10');
  const [customTipPercent, setCustomTipPercent] = useState<number>(10);

  // Payment method (defaults to 'mesero' or 'tarjeta')
  const [paymentMethod, setPaymentMethod] = useState<'tarjeta' | 'mesero'>('mesero');

  // Compute items for current user + any merged partner
  const dinersToInclude = [currentUserId, ...(mergedPartner ? [mergedPartner.id] : [])];

  const relevantItems = items.filter(
    (item) =>
      dinersToInclude.includes(item.paidByUserId) ||
      item.sharedWithUserIds?.some((id) => dinersToInclude.includes(id))
  );

  // Separate individual vs shared items
  const individualItems = relevantItems.filter(
    (item) => !item.sharedWithUserIds || item.sharedWithUserIds.length <= 1
  );

  const sharedItems = relevantItems.filter(
    (item) => item.sharedWithUserIds && item.sharedWithUserIds.length > 1
  );

  // Calculate subtotal
  const individualSubtotal = individualItems.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0
  );

  const sharedSubtotal = sharedItems.reduce((acc, item) => {
    const totalDinersSharing = item.sharedWithUserIds!.length;
    // How many in our group share this item?
    const sharesInGroup = item.sharedWithUserIds!.filter((id) =>
      dinersToInclude.includes(id)
    ).length;
    return acc + (item.unitPrice * item.quantity * sharesInGroup) / totalDinersSharing;
  }, 0);

  const subtotal = individualSubtotal + sharedSubtotal;

  // Calculate tip
  const activePercent = tipOption === 'custom' ? customTipPercent : Number(tipOption);
  const tipAmount = (subtotal * activePercent) / 100;
  const totalToPay = subtotal + tipAmount;

  const handlePay = () => {
    onConfirmPayment(paymentMethod, totalToPay, tipAmount);
  };

  return (
    <div className="flex flex-col min-h-full bg-white text-stone-900">
      {/* Top Navigation */}
      <div className="h-14 px-4 border-b border-stone-200 flex items-center justify-between sticky top-0 bg-white z-10">
        <button
          onClick={onBack}
          aria-label="Volver"
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-stone-100 active:scale-95 transition-transform cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6 text-stone-900" />
        </button>
        <div className="text-center">
          <h2 className="text-lg font-black text-stone-900">Mi cuenta</h2>
          <p className="text-xs text-stone-500 font-medium">
            Mesa {tableNumber} · {currentDiner?.name}{' '}
            {mergedPartner && `+ ${mergedPartner.name}`}
          </p>
        </div>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col px-6 pt-5 pb-8 max-w-lg mx-auto w-full overflow-y-auto">
        {/* Breakdown Section: TUS PLATILLOS (Wireframe 9) */}
        {individualItems.length > 0 && (
          <div className="mb-5">
            <h3 className="text-xs font-black uppercase tracking-wider text-stone-500 mb-2.5">
              Tus platillos
            </h3>
            <div className="space-y-2">
              {individualItems.map((item) => (
                <div key={item.cartItemId} className="flex justify-between items-start">
                  <div>
                    <p className="font-extrabold text-base text-stone-950">
                      {item.name}
                    </p>
                    {item.meat && (
                      <p className="text-xs text-stone-500 font-medium">
                        {item.meat}
                      </p>
                    )}
                  </div>
                  <span className="font-black text-base text-stone-950 tabular-nums">
                    ${(item.unitPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Breakdown Section: TU PARTE DE LO COMPARTIDO (Wireframe 9) */}
        {sharedItems.length > 0 && (
          <div className="mb-6 pt-3 border-t border-stone-100">
            <h3 className="text-xs font-black uppercase tracking-wider text-stone-500 mb-2.5">
              Tu parte de lo compartido
            </h3>
            <div className="space-y-2">
              {sharedItems.map((item) => {
                const totalSharing = item.sharedWithUserIds!.length;
                const userPortion =
                  (item.unitPrice * item.quantity) / totalSharing;
                return (
                  <div key={item.cartItemId} className="flex justify-between items-start">
                    <div>
                      <p className="font-extrabold text-base text-stone-950">
                        {item.name}{' '}
                        <span className="text-xs text-stone-500 font-normal">
                          (entre {totalSharing})
                        </span>
                      </p>
                      {item.meat && (
                        <p className="text-xs text-stone-500 font-medium">
                          {item.meat}
                        </p>
                      )}
                    </div>
                    <span className="font-black text-base text-stone-950 tabular-nums">
                      ${userPortion.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Subtotal */}
        <div className="py-3 border-t border-stone-200 flex justify-between items-center mb-6">
          <span className="font-extrabold text-base text-stone-900">
            Subtotal
          </span>
          <span className="font-black text-xl text-stone-950 tabular-nums">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {/* Propina Section (Wireframe 9: [10%] [15%] [20%] [Otra]) */}
        <div className="mb-6">
          <p className="font-extrabold text-sm text-stone-950 mb-2.5">
            Propina
          </p>

          <div className="grid grid-cols-4 gap-2 mb-2">
            {(['10', '15', '20', 'custom'] as const).map((opt) => {
              const isSelected = tipOption === opt;
              const label = opt === 'custom' ? 'Otra' : `${opt}%`;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setTipOption(opt)}
                  className={`h-12 rounded-xl font-black text-sm transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-black text-white shadow-xs'
                      : 'bg-white text-stone-900 border border-stone-300 hover:border-black'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {tipOption === 'custom' && (
            <div className="mt-2 flex items-center gap-2 p-2 bg-stone-50 border border-stone-200 rounded-lg">
              <span className="text-xs font-bold text-stone-600">Porcentaje:</span>
              <input
                type="number"
                min="0"
                max="50"
                value={customTipPercent}
                onChange={(e) => setCustomTipPercent(Number(e.target.value) || 0)}
                className="w-16 p-1 border border-stone-300 rounded text-center font-bold text-sm bg-white"
              />
              <span className="text-xs font-bold text-stone-600">%</span>
            </div>
          )}

          <p className="text-xs font-bold text-stone-600 mt-1.5 tabular-nums">
            Propina: <span className="font-black text-stone-900">${tipAmount.toFixed(2)}</span>
          </p>
        </div>

        {/* Total a pagar Banner (Wireframe 9) */}
        <div className="p-4 bg-stone-100 rounded-xl flex items-center justify-between mb-6 border border-stone-200">
          <span className="font-extrabold text-lg text-stone-950">
            Total a pagar
          </span>
          <span className="font-black text-3xl text-stone-950 tabular-nums tracking-tight">
            ${totalToPay.toFixed(2)}
          </span>
        </div>

        {/* Payment Method Selector (Wireframe 9) */}
        <div className="mb-8">
          <h3 className="font-extrabold text-base text-stone-950 mb-3">
            ¿Cómo quieres pagar?
          </h3>

          <div className="space-y-3">
            {/* Option 1: Card online */}
            <div
              onClick={() => setPaymentMethod('tarjeta')}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                paymentMethod === 'tarjeta'
                  ? 'border-black bg-stone-50 shadow-xs'
                  : 'border-stone-200 hover:border-stone-300 bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'tarjeta' ? 'border-black' : 'border-stone-300'
                  }`}
                >
                  {paymentMethod === 'tarjeta' && (
                    <div className="w-2.5 h-2.5 rounded-full bg-black" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-stone-900" />
                  <span className="font-black text-base text-stone-950">
                    Pagar aquí con tarjeta
                  </span>
                </div>
              </div>
            </div>

            {/* Option 2: Pay to Waiter (Exact to Wireframe 9) */}
            <div
              onClick={() => setPaymentMethod('mesero')}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                paymentMethod === 'mesero'
                  ? 'border-black bg-stone-50 shadow-xs'
                  : 'border-stone-200 hover:border-stone-300 bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'mesero' ? 'border-black' : 'border-stone-300'
                  }`}
                >
                  {paymentMethod === 'mesero' && (
                    <div className="w-2.5 h-2.5 rounded-full bg-black" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Handshake className="w-5 h-5 text-stone-900" />
                    <span className="font-black text-base text-stone-950">
                      Pagarle al mesero
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5 ml-7">
                    Efectivo o terminal en tu mesa
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          <button
            onClick={handlePay}
            className="w-full h-14 bg-black text-white font-black text-base tracking-wider rounded-xl uppercase hover:bg-stone-800 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>
              {paymentMethod === 'mesero' ? 'Llamar al mesero con la cuenta' : 'Pagar con tarjeta'}
            </span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
