import React from 'react';
import { ArrowLeft, Trash2, Plus, Minus, Users, Info, ArrowRight } from 'lucide-react';
import { CartItem, TableDiner } from '../../types';

interface Props {
  currentRound: number;
  items: CartItem[];
  currentUserId: string;
  diners: TableDiner[];
  onBackToMenu: () => void;
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onSendToKitchen: () => void;
}

export const Screen6Cart: React.FC<Props> = ({
  currentRound,
  items,
  currentUserId,
  diners,
  onBackToMenu,
  onUpdateQuantity,
  onRemoveItem,
  onSendToKitchen,
}) => {
  // Filter items in which current user participates
  const userItems = items.filter(
    (item) => item.paidByUserId === currentUserId || item.sharedWithUserIds?.includes(currentUserId)
  );

  // Calculate subtotal for user
  const subtotal = userItems.reduce((acc, item) => {
    if (item.sharedWithUserIds && item.sharedWithUserIds.length > 0) {
      return acc + (item.unitPrice * item.quantity) / item.sharedWithUserIds.length;
    }
    return acc + item.unitPrice * item.quantity;
  }, 0);

  // Helper to get diner names for sharing
  const getSharedNames = (ids?: string[]) => {
    if (!ids) return '';
    const otherNames = ids
      .filter((id) => id !== currentUserId)
      .map((id) => diners.find((d) => d.id === id)?.name || 'Comensal');
    if (otherNames.length === 0) return '';
    if (otherNames.length === 1) return otherNames[0];
    return `${otherNames.slice(0, -1).join(', ')} y ${otherNames[otherNames.length - 1]}`;
  };

  return (
    <div className="flex flex-col min-h-full bg-white text-stone-900">
      {/* Top Navigation matching Wireframe 6 */}
      <div className="h-14 px-4 border-b border-stone-200 flex items-center justify-between sticky top-0 bg-white z-10">
        <button
          onClick={onBackToMenu}
          aria-label="Volver al menú"
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-stone-100 active:scale-95 transition-transform cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6 text-stone-900" />
        </button>
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-black text-stone-900">Mi pedido</h2>
          <span className="text-xs font-bold px-2 py-0.5 rounded border border-stone-300 text-stone-700 bg-stone-50">
            Ronda {currentRound}
          </span>
        </div>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col px-6 pt-5 pb-8 max-w-lg mx-auto w-full overflow-y-auto">
        {/* Items List */}
        <div className="space-y-4 mb-6">
          {userItems.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed border-stone-200 rounded-2xl">
              <p className="text-stone-400 font-bold mb-3">No tienes platillos en este pedido</p>
              <button
                onClick={onBackToMenu}
                className="px-5 py-2.5 bg-black text-white text-xs font-bold uppercase rounded-lg hover:bg-stone-800"
              >
                Ver Menú
              </button>
            </div>
          ) : (
            userItems.map((item) => {
              const isShared = item.sharedWithUserIds && item.sharedWithUserIds.length > 1;
              const userPartPrice = isShared
                ? (item.unitPrice * item.quantity) / item.sharedWithUserIds!.length
                : item.unitPrice * item.quantity;

              return (
                <div
                  key={item.cartItemId}
                  className="pb-4 border-b border-stone-200 last:border-b-0 space-y-2.5"
                >
                  {/* Item Title and Price */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-extrabold text-base text-stone-950">
                        {item.name}
                      </h3>
                      {item.meat && (
                        <p className="text-xs text-stone-500 font-medium">
                          {item.meat}
                        </p>
                      )}
                      {item.notes && (
                        <p className="text-[11px] text-stone-400 italic">
                          "{item.notes}"
                        </p>
                      )}
                    </div>
                    <span className="font-black text-base text-stone-950 tabular-nums">
                      ${userPartPrice.toFixed(2)}
                    </span>
                  </div>

                  {/* Shared pill badge (Exact match to Wireframe 6) */}
                  {isShared && (
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-stone-300 bg-stone-50 text-[11px] font-bold text-stone-800">
                        <Users className="w-3.5 h-3.5 text-stone-600" />
                        <span>Compartido con {getSharedNames(item.sharedWithUserIds)}</span>
                      </div>
                      <p className="text-xs text-stone-500">
                        Tu parte:{' '}
                        <span className="font-bold text-stone-900 tabular-nums">
                          ${userPartPrice.toFixed(2)}
                        </span>{' '}
                        de ${ (item.unitPrice * item.quantity).toFixed(0) }
                      </p>
                    </div>
                  )}

                  {/* Quantity and Remove Controls */}
                  <div className="flex items-center gap-2 pt-1">
                    <div className="flex items-center border border-stone-300 rounded-lg bg-white h-9 px-1">
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                        className="w-7 h-7 flex items-center justify-center hover:bg-stone-100 rounded text-stone-700 cursor-pointer"
                        title="Disminuir"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center font-black text-sm tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                        className="w-7 h-7 flex items-center justify-center hover:bg-stone-100 rounded text-stone-700 cursor-pointer"
                        title="Aumentar"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.cartItemId)}
                      className="w-9 h-9 border border-stone-300 rounded-lg flex items-center justify-center text-stone-400 hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Eliminar del pedido"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Add more dishes button */}
        <button
          onClick={onBackToMenu}
          className="w-full py-3 border-2 border-stone-900 rounded-xl font-extrabold text-sm text-stone-900 hover:bg-stone-50 active:scale-[0.99] transition-all flex items-center justify-center gap-2 mb-8 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Agregar más platillos</span>
        </button>

        {/* Subtotal of your order (Wireframe 6: Subtotal de tu pedido $130.33) */}
        <div className="pt-4 border-t border-stone-200 mb-4 flex items-center justify-between">
          <span className="font-extrabold text-base text-stone-950">
            Subtotal de tu pedido
          </span>
          <span className="font-black text-xl text-stone-950 tabular-nums">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {/* Notice Info Box (Wireframe 6: (i) Al enviarlo, tu pedido llega directo a cocina.) */}
        <div className="flex items-center gap-3 p-3.5 border border-stone-200 rounded-xl bg-stone-50/80 mb-6">
          <Info className="w-5 h-5 text-stone-500 shrink-0" />
          <p className="text-xs text-stone-600 font-medium">
            Al enviarlo, tu pedido llega directo a cocina.
          </p>
        </div>

        {/* Primary CTA Enviar a Cocina */}
        <div className="mt-auto">
          <button
            onClick={onSendToKitchen}
            disabled={userItems.length === 0}
            className="w-full h-14 bg-black text-white font-black text-base tracking-wider rounded-xl uppercase hover:bg-stone-800 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
          >
            <span>Enviar a cocina</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
