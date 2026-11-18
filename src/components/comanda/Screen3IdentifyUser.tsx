import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Plus, UserPlus } from 'lucide-react';
import { TableDiner } from '../../types';

interface Props {
  tableNumber: number;
  existingDiners: TableDiner[];
  currentName: string;
  onSetName: (name: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  onOpenAddNonPhoneModal: () => void;
}

export const Screen3IdentifyUser: React.FC<Props> = ({
  tableNumber,
  existingDiners,
  currentName,
  onSetName,
  onSubmit,
  onBack,
  onOpenAddNonPhoneModal,
}) => {
  const [error, setError] = useState('');

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentName.trim()) {
      setError('Por favor escribe tu nombre o apodo');
      return;
    }
    setError('');
    onSubmit();
  };

  // Diners other than the current user being configured
  const otherDiners = existingDiners.filter((d) => !d.isCurrentUser);

  return (
    <div className="flex flex-col min-h-full bg-white text-stone-900">
      {/* Top Header */}
      <div className="h-14 px-4 border-b border-stone-200 flex items-center justify-between sticky top-0 bg-white z-10">
        <button
          onClick={onBack}
          aria-label="Volver atrás"
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-stone-100 active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-6 h-6 text-stone-900" />
        </button>
        <h2 className="text-lg font-bold text-stone-900">Mesa {tableNumber}</h2>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col px-6 pt-5 pb-8 max-w-lg mx-auto w-full overflow-y-auto">
        {/* Step Indicator */}
        <div className="mb-6">
          <div className="flex justify-between items-center text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
            <span>Paso 2 de 2</span>
            <span className="font-extrabold text-stone-900">¡Casi listo!</span>
          </div>
          {/* Progress Bar 100% */}
          <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-black h-full w-full rounded-full" />
          </div>
        </div>

        {/* Name input section */}
        <form onSubmit={handleJoin} className="mb-6">
          <h1 className="text-2xl font-black italic text-stone-950 mb-3 tracking-tight">
            ¿Cómo te llamamos??
          </h1>

          <div className="relative">
            <input
              type="text"
              value={currentName}
              onChange={(e) => {
                onSetName(e.target.value);
                if (error) setError('');
              }}
              placeholder="Tu nombre o apodo"
              className="w-full h-14 px-4 border-[2.5px] border-black rounded-lg text-lg font-bold placeholder:text-stone-400 placeholder:font-normal focus:outline-hidden focus:ring-2 focus:ring-black/20"
              autoFocus
            />
          </div>
          {error && <p className="text-xs text-red-600 mt-1 font-semibold">{error}</p>}
          <p className="text-xs text-stone-500 italic mt-2">
            Así te verán los demás en la mesa.
          </p>
        </form>

        {/* Existing Diners in Table */}
        <div className="mb-6">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-stone-500 mb-3">
            Ya están en la mesa ({otherDiners.length})
          </h3>

          <div className="space-y-2.5">
            {otherDiners.map((diner) => (
              <div
                key={diner.id}
                className="flex items-center gap-4 p-3.5 border border-stone-200 rounded-lg bg-white shadow-2xs hover:border-stone-400 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-black text-sm shrink-0">
                  {diner.avatarLetter}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-extrabold text-base text-stone-900 truncate">
                    {diner.name}
                  </p>
                  <p className="text-[11px] text-stone-400">
                    {diner.isPaid ? 'Cuenta pagada' : 'Ordenando...'}
                  </p>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="En línea" />
              </div>
            ))}
          </div>
        </div>

        {/* Add someone without phone card (Exact to Wireframe 3) */}
        <button
          type="button"
          onClick={onOpenAddNonPhoneModal}
          className="flex items-start gap-4 p-3.5 border-2 border-dashed border-stone-300 hover:border-black rounded-xl bg-stone-50/50 hover:bg-stone-50 transition-all text-left mb-6 group cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full border-2 border-dashed border-stone-500 flex items-center justify-center shrink-0 group-hover:border-black transition-colors">
            <Plus className="w-5 h-5 text-stone-800" />
          </div>
          <div>
            <p className="font-extrabold text-sm text-stone-950 underline decoration-2 underline-offset-2">
              Agregar a alguien sin celular
            </p>
            <p className="text-xs text-stone-500 mt-0.5 leading-snug">
              Su pedido quedará dentro del tuyo (ideal para niños o adultos mayores).
            </p>
          </div>
        </button>

        {/* Primary CTA */}
        <div className="mt-auto pt-4">
          <button
            onClick={handleJoin}
            className="w-full h-14 bg-black text-white font-black text-base tracking-wider rounded-xl uppercase hover:bg-stone-800 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            Unirme a la mesa
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
