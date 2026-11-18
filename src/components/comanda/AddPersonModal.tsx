import React, { useState } from 'react';
import { X, UserPlus, Heart } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddDiner: (name: string) => void;
}

export const AddPersonModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onAddDiner,
}) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Escribe el nombre de la persona');
      return;
    }
    onAddDiner(name.trim());
    setName('');
    setError('');
    onClose();
  };

  const suggestions = ['Abuelita', 'Mateo (niño)', 'Sofía (hija)', 'Tío Jorge'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-900"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center">
            <UserPlus className="w-4 h-4 text-stone-900" />
          </div>
          <h3 className="font-black text-lg text-stone-950">
            Agregar a alguien sin celular
          </h3>
        </div>

        <p className="text-xs text-stone-500 mb-4 leading-relaxed">
          Su comanda y cuenta se sumarán automáticamente a la tuya para que puedas ordenar y pagar por ellos fácilmente.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Nombre o parentesco:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder="Ej. Abuela Rosa, Sobrino..."
              className="w-full h-11 px-3 border border-stone-300 rounded-lg text-sm bg-white focus:outline-hidden focus:border-black font-semibold"
              autoFocus
            />
            {error && <p className="text-xs text-red-600 font-bold mt-1">{error}</p>}
          </div>

          <div>
            <span className="text-[11px] font-bold text-stone-500 block mb-1.5">
              Sugerencias rápidas:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setName(s)}
                  className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-md transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-stone-300 rounded-xl font-bold text-xs text-stone-700 hover:bg-stone-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-black text-white rounded-xl font-black text-xs uppercase tracking-wider hover:bg-stone-800"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
