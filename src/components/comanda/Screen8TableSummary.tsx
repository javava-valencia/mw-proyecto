import React, { useState } from 'react';
import { ArrowLeft, Users, ChevronDown, ChevronUp, Link2, Unlink, CheckCircle2, CreditCard, ArrowRight } from 'lucide-react';
import { TableDiner, CartItem } from '../../types';

interface Props {
  tableNumber: number;
  diners: TableDiner[];
  currentUserId: string;
  items: CartItem[];
  onBack: () => void;
  onProceedToPay: (dinerId: string) => void;
  onMergeDiners: (dinerId1: string, dinerId2: string) => void;
  onUnmergeDiner: (dinerId: string) => void;
  onPayEntireTable: () => void;
}

export const Screen8TableSummary: React.FC<Props> = ({
  tableNumber,
  diners,
  currentUserId,
  items,
  onBack,
  onProceedToPay,
  onMergeDiners,
  onUnmergeDiner,
  onPayEntireTable,
}) => {
  const [expandedDinerIds, setExpandedDinerIds] = useState<string[]>([currentUserId]);
  const [showMergeModal, setShowMergeModal] = useState(false);
  const [selectedMergeTarget, setSelectedMergeTarget] = useState<string>('');

  // Helper to calculate total for any diner (accounting for shared items and merges)
  const calculateDinerTotal = (dinerId: string): { total: number; itemCount: number; details: { name: string; price: number; isShared?: boolean }[] } => {
    const userItems = items.filter(
      (item) => item.paidByUserId === dinerId || item.sharedWithUserIds?.includes(dinerId)
    );

    let total = 0;
    const details: { name: string; price: number; isShared?: boolean }[] = [];

    userItems.forEach((item) => {
      const isShared = item.sharedWithUserIds && item.sharedWithUserIds.length > 1;
      const partPrice = isShared
        ? (item.unitPrice * item.quantity) / item.sharedWithUserIds!.length
        : item.unitPrice * item.quantity;

      total += partPrice;
      details.push({
        name: isShared ? `Su parte: ${item.name}` : item.name,
        price: partPrice,
        isShared,
      });
    });

    return { total, itemCount: userItems.length, details };
  };

  // Grand table total
  const grandTotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  const toggleExpand = (id: string) => {
    if (expandedDinerIds.includes(id)) {
      setExpandedDinerIds(expandedDinerIds.filter((item) => item !== id));
    } else {
      setExpandedDinerIds([...expandedDinerIds, id]);
    }
  };

  const currentDiner = diners.find((d) => d.id === currentUserId);
  const isCurrentDinerMerged = !!currentDiner?.mergedWithDinerId;
  const mergedPartner = diners.find((d) => d.id === currentDiner?.mergedWithDinerId);

  // Unmerged eligible diners to merge with
  const eligibleMergePartners = diners.filter(
    (d) => d.id !== currentUserId && !d.mergedWithDinerId && !d.isPaid
  );

  const handleConfirmMerge = () => {
    if (selectedMergeTarget) {
      onMergeDiners(currentUserId, selectedMergeTarget);
      setShowMergeModal(false);
      setSelectedMergeTarget('');
    }
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
          <h2 className="text-lg font-black text-stone-900">Mesa {tableNumber}</h2>
          <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
            {diners.length} personas en la mesa
          </p>
        </div>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col px-4 pt-4 pb-8 max-w-lg mx-auto w-full overflow-y-auto">
        {/* Big Table Total Card (Wireframe 8: Total de la mesa $820) */}
        <div className="border-[2.5px] border-black rounded-2xl p-6 bg-white shadow-xs mb-5">
          <p className="text-stone-500 font-semibold text-sm">
            Total de la mesa
          </p>
          <h1 className="text-5xl font-black text-stone-950 tracking-tight my-1 tabular-nums">
            ${grandTotal.toFixed(0)}
          </h1>
          <div className="mt-2 flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100">
            <span>{items.reduce((acc, i) => acc + i.quantity, 0)} platillos totales</span>
            <span className="font-bold text-stone-800">
              {diners.filter((d) => d.isPaid).length} de {diners.length} pagados
            </span>
          </div>
        </div>

        {/* Feature: Cuenta unificada / Mezclar cuentas (User Request) */}
        <div className="mb-5 p-3.5 bg-stone-50 border border-stone-200 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link2 className="w-4 h-4 text-stone-800" />
              <span className="text-xs font-black uppercase tracking-wider text-stone-900">
                Mezclar cuentas entre amigos
              </span>
            </div>
            {isCurrentDinerMerged ? (
              <button
                onClick={() => onUnmergeDiner(currentUserId)}
                className="text-xs font-bold text-red-600 hover:text-red-800 flex items-center gap-1 cursor-pointer"
              >
                <Unlink className="w-3.5 h-3.5" />
                Separar de nuevo
              </button>
            ) : (
              <button
                onClick={() => setShowMergeModal(true)}
                disabled={eligibleMergePartners.length === 0}
                className="text-xs font-extrabold text-stone-900 underline hover:text-stone-700 cursor-pointer disabled:opacity-40"
              >
                + Mezclar mi cuenta
              </button>
            )}
          </div>
          <p className="text-xs text-stone-500 mt-1">
            {isCurrentDinerMerged && mergedPartner
              ? `Tu cuenta está unida con ${mergedPartner.name}. El mesero les traerá un solo ticket conjunto.`
              : '¿Vienes en pareja o pagas por alguien? Pueden juntar sus cuentas en un solo ticket.'}
          </p>
        </div>

        {/* Diner Cards List (Matches Wireframe 8) */}
        <div className="space-y-3 mb-6">
          {diners.map((diner) => {
            const isMe = diner.id === currentUserId;
            const isExpanded = expandedDinerIds.includes(diner.id);
            const data = calculateDinerTotal(diner.id);
            const isPartner = diner.id === currentDiner?.mergedWithDinerId;

            // Header card styling
            return (
              <div
                key={diner.id}
                className={`rounded-xl border transition-all overflow-hidden ${
                  isMe
                    ? 'border-black bg-stone-950 text-white shadow-md'
                    : 'border-stone-200 bg-white text-stone-900 hover:border-stone-300'
                }`}
              >
                {/* Main Row */}
                <div
                  onClick={() => toggleExpand(diner.id)}
                  className="p-4 flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    {/* Avatar circle / drawing */}
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center font-black text-sm shrink-0 border ${
                        isMe
                          ? 'bg-white text-black border-white'
                          : 'bg-stone-900 text-white border-stone-900'
                      }`}
                    >
                      {diner.avatarLetter}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-base leading-tight">
                          {diner.name} {isMe && '(tú)'}
                        </h3>
                        {isPartner && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-400 text-stone-950">
                            Unida contigo
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-xs mt-0.5 font-medium ${
                          isMe ? 'text-stone-300' : 'text-stone-500'
                        }`}
                      >
                        {data.itemCount} platillos ·{' '}
                        {diner.isPaid ? (
                          <span className="text-emerald-500 font-bold uppercase tracking-wider">
                            PAGADO
                          </span>
                        ) : (
                          'Pendiente'
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Price & Expand Chevron */}
                  <div className="flex items-center gap-3">
                    <span className="font-black text-lg tabular-nums">
                      ${data.total.toFixed(2)}
                    </span>
                    {isExpanded ? (
                      <ChevronUp
                        className={`w-4 h-4 ${
                          isMe ? 'text-stone-400' : 'text-stone-500'
                        }`}
                      />
                    ) : (
                      <ChevronDown
                        className={`w-4 h-4 ${
                          isMe ? 'text-stone-400' : 'text-stone-500'
                        }`}
                      />
                    )}
                  </div>
                </div>

                {/* Expanded Details matching Wireframe 8 */}
                {isExpanded && (
                  <div
                    className={`px-4 pb-4 pt-1 space-y-1.5 text-xs border-t ${
                      isMe
                        ? 'border-stone-800 bg-stone-900/60 text-stone-200'
                        : 'border-stone-100 bg-stone-50/50 text-stone-700'
                    }`}
                  >
                    {data.details.map((detail, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-1 border-b border-white/5 last:border-b-0"
                      >
                        <span className="font-medium">{detail.name}</span>
                        <span className="font-extrabold tabular-nums">
                          ${detail.price.toFixed(2)}
                        </span>
                      </div>
                    ))}

                    {/* Quick pay button inside card for current user */}
                    {isMe && !diner.isPaid && (
                      <div className="pt-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onProceedToPay(currentUserId);
                          }}
                          className="w-full py-2.5 bg-white text-stone-950 font-black text-xs uppercase tracking-wider rounded-lg hover:bg-stone-100 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Pagar mi cuenta (${data.total.toFixed(2)})</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Global Action: Option to pay entire table */}
        <div className="mt-auto space-y-2.5 pt-2">
          <button
            onClick={() => onProceedToPay(currentUserId)}
            className="w-full h-14 bg-black text-white font-black text-base tracking-wider rounded-xl uppercase hover:bg-stone-800 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>
              {isCurrentDinerMerged && mergedPartner
                ? `Pagar cuenta unificada (${currentDiner?.name} + ${mergedPartner.name})`
                : 'Pagar mi cuenta'}
            </span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onPayEntireTable}
            className="w-full py-3 border border-stone-300 text-stone-700 hover:text-black hover:border-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Invitar y pagar toda la mesa (${grandTotal.toFixed(0)})
          </button>
        </div>
      </div>

      {/* Merge Accounts Modal */}
      {showMergeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-2xl border border-stone-200">
            <h3 className="font-black text-lg text-stone-950 mb-1">
              Mezclar tu cuenta con...
            </h3>
            <p className="text-xs text-stone-500 mb-4 leading-relaxed">
              Selecciona con quién deseas unir tu cuenta. Al momento de pagar, el mesero generará un ticket conjunto para ambos.
            </p>

            <div className="space-y-2 mb-5">
              {eligibleMergePartners.map((partner) => {
                const partnerData = calculateDinerTotal(partner.id);
                const isSelected = selectedMergeTarget === partner.id;
                return (
                  <div
                    key={partner.id}
                    onClick={() => setSelectedMergeTarget(partner.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-black bg-stone-50 shadow-xs'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">
                        {partner.avatarLetter}
                      </div>
                      <div>
                        <p className="font-extrabold text-sm text-stone-900">
                          {partner.name}
                        </p>
                        <p className="text-[11px] text-stone-400">
                          {partnerData.itemCount} platillos
                        </p>
                      </div>
                    </div>
                    <span className="font-black text-sm tabular-nums text-stone-900">
                      ${partnerData.total.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowMergeModal(false);
                  setSelectedMergeTarget('');
                }}
                className="flex-1 py-3 border border-stone-300 rounded-xl font-bold text-xs text-stone-700 hover:bg-stone-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmMerge}
                disabled={!selectedMergeTarget}
                className="flex-1 py-3 bg-black text-white rounded-xl font-black text-xs uppercase hover:bg-stone-800 disabled:opacity-40"
              >
                Unir cuentas
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
