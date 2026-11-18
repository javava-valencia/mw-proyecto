import React from 'react';
import { X, Printer, Check, Copy } from 'lucide-react';
import { TableDiner, CartItem } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  tableNumber: number;
  branchName: string;
  diners: TableDiner[];
  items: CartItem[];
}

export const TicketModal: React.FC<Props> = ({
  isOpen,
  onClose,
  tableNumber,
  branchName,
  diners,
  items,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const total = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
        {/* Top toolbar */}
        <div className="p-3 bg-stone-900 text-white flex items-center justify-between text-xs font-bold">
          <span>Ticket Digital de Comanda</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1 hover:bg-stone-800 rounded"
              title="Imprimir ticket"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-stone-800 rounded"
              title="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Paper receipt design */}
        <div className="flex-1 overflow-y-auto p-6 font-mono text-xs text-stone-900 bg-[#FAF9F5] border-y border-stone-200 space-y-4">
          <div className="text-center space-y-1">
            <h2 className="font-sans font-black text-lg tracking-wider text-black">
              LA CASA DE TOÑO
            </h2>
            <p className="font-bold text-[10px] uppercase text-stone-700">{branchName}</p>
            <p className="text-[10px] text-stone-500">RFC: CDT-850314-XX1</p>
            <p className="text-[10px] text-stone-500">CDMX, MÉXICO</p>
            <div className="border-b border-dashed border-stone-400 my-2" />
          </div>

          <div className="flex justify-between text-[11px]">
            <span>MESA: <strong>{tableNumber}</strong></span>
            <span>COMENSALES: <strong>{diners.length}</strong></span>
          </div>
          <div className="flex justify-between text-[11px] text-stone-600">
            <span>FOLIO: #CDT-09482</span>
            <span>HORA: 19:42</span>
          </div>

          <div className="border-b border-dashed border-stone-400 my-2" />

          {/* Grouped by Diner */}
          <div className="space-y-3">
            {diners.map((diner) => {
              const userItems = items.filter(
                (item) => item.paidByUserId === diner.id || item.sharedWithUserIds?.includes(diner.id)
              );
              if (userItems.length === 0) return null;

              const dinerSubtotal = userItems.reduce((acc, item) => {
                if (item.sharedWithUserIds && item.sharedWithUserIds.length > 0) {
                  return acc + (item.unitPrice * item.quantity) / item.sharedWithUserIds.length;
                }
                return acc + item.unitPrice * item.quantity;
              }, 0);

              return (
                <div key={diner.id} className="space-y-1">
                  <div className="font-bold text-stone-950 flex justify-between border-b border-stone-200 pb-0.5">
                    <span>{diner.name.toUpperCase()} {diner.isCurrentUser ? '(TÚ)' : ''}</span>
                    <span>${dinerSubtotal.toFixed(2)}</span>
                  </div>
                  {userItems.map((item) => {
                    const isShared = item.sharedWithUserIds && item.sharedWithUserIds.length > 1;
                    const price = isShared
                      ? (item.unitPrice * item.quantity) / item.sharedWithUserIds!.length
                      : item.unitPrice * item.quantity;
                    return (
                      <div key={item.cartItemId} className="flex justify-between text-[10px] text-stone-700 pl-2">
                        <span>
                          {item.quantity}x {item.name} {isShared ? '(comp)' : ''}
                        </span>
                        <span className="tabular-nums">${price.toFixed(2)}</span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div className="border-b border-dashed border-stone-400 my-2" />

          {/* Total summary */}
          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between">
              <span>SUBTOTAL MESA:</span>
              <span className="font-bold tabular-nums">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>PROPINA SUGERIDA (10%):</span>
              <span className="tabular-nums">${(total * 0.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-sm text-black pt-1 border-t border-stone-300">
              <span>TOTAL ESTIMADO:</span>
              <span className="tabular-nums">${(total * 1.1).toFixed(2)}</span>
            </div>
          </div>

          <div className="border-b border-dashed border-stone-400 my-2" />

          <div className="text-center text-[10px] text-stone-600 space-y-1">
            <p className="font-bold">¡GRACIAS POR SU VISITA!</p>
            <p>Comanda Digital impulsada por QR</p>
            <p>Facturación electrónica en lacasadetono.mx</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-white border-t border-stone-200">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-black text-white text-xs font-bold uppercase rounded-lg hover:bg-stone-800"
          >
            Cerrar ticket
          </button>
        </div>
      </div>
    </div>
  );
};
