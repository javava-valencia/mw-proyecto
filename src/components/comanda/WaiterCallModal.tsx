import React, { useState } from 'react';
import { X, Bell, Utensils, Receipt, Sparkles, HelpCircle, Check } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  tableNumber: number;
  onConfirmCall: (reason: string) => void;
}

export const WaiterCallModal: React.FC<Props> = ({
  isOpen,
  onClose,
  tableNumber,
  onConfirmCall,
}) => {
  const [selectedReason, setSelectedReason] = useState('Pedir la cuenta');
  const [customNote, setCustomNote] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const reasons = [
    { label: 'Pedir la cuenta', icon: Receipt },
    { label: 'Servilletas o cubiertos', icon: Utensils },
    { label: 'Limones, orégano o salsas extra', icon: Sparkles },
    { label: 'Asistencia con mi pedido', icon: HelpCircle },
  ];

  const handleSend = () => {
    const fullReason = customNote ? `${selectedReason}: ${customNote}` : selectedReason;
    onConfirmCall(fullReason);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-900"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 bg-stone-900 text-white rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-xl font-black text-stone-950">¡Mesero notificado!</h3>
            <p className="text-xs text-stone-500">
              Un miembro del equipo va en camino a la Mesa {tableNumber}.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center">
                <Bell className="w-4 h-4 text-stone-900 fill-stone-900" />
              </div>
              <h3 className="font-black text-lg text-stone-950">Llamar al mesero</h3>
            </div>
            <p className="text-xs text-stone-500 mb-4">
              Mesa {tableNumber} · Selecciona qué necesitas para que te atiendan de inmediato.
            </p>

            <div className="space-y-2 mb-4">
              {reasons.map((r) => {
                const Icon = r.icon;
                const isSelected = selectedReason === r.label;
                return (
                  <button
                    key={r.label}
                    onClick={() => setSelectedReason(r.label)}
                    type="button"
                    className={`w-full p-3 rounded-xl border flex items-center gap-3 text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-black bg-stone-50 font-black text-stone-950 shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 text-stone-700 text-sm font-semibold'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0 text-stone-800" />
                    <span className="text-xs">{r.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mb-5">
              <label className="text-[11px] font-bold text-stone-600 block mb-1">
                Nota adicional (opcional):
              </label>
              <input
                type="text"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="Ej. Traer salsa habanero..."
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs bg-white focus:outline-hidden focus:border-black font-medium"
              />
            </div>

            <button
              onClick={handleSend}
              className="w-full h-12 bg-black text-white font-black text-xs uppercase tracking-wider rounded-xl hover:bg-stone-800 active:scale-[0.99] transition-all cursor-pointer"
            >
              Confirmar llamada
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
