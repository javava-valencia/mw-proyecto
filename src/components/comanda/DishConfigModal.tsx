import React, { useState } from 'react';
import { X, Users, Check, Utensils } from 'lucide-react';
import { MenuItem, TableDiner, CartItem } from '../../types';

interface Props {
  dish: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: Omit<CartItem, 'cartItemId' | 'orderRound' | 'status'>) => void;
  diners: TableDiner[];
  currentUserId: string;
}

export const DishConfigModal: React.FC<Props> = ({
  dish,
  onClose,
  onAddToCart,
  diners,
  currentUserId,
}) => {
  if (!dish) return null;

  // Selected size
  const defaultSize = dish.sizes ? dish.sizes[1]?.name || dish.sizes[0]?.name : undefined;
  const [selectedSize, setSelectedSize] = useState<string | undefined>(defaultSize);

  // Selected meat / guisado
  const [selectedMeat, setSelectedMeat] = useState<string | undefined>(
    dish.meatOptions ? dish.meatOptions[0] : undefined
  );

  // Shared with other table members
  const [isShared, setIsShared] = useState(false);
  const [sharedMemberIds, setSharedMemberIds] = useState<string[]>([currentUserId]);

  // Notes
  const [notes, setNotes] = useState('');

  // Calculate current price based on size
  const basePrice = dish.sizes && selectedSize
    ? dish.sizes.find((s) => s.name === selectedSize)?.price || dish.basePrice
    : dish.basePrice;

  // Other companions at the table
  const otherDiners = diners.filter((d) => d.id !== currentUserId);

  const toggleShareMember = (dinerId: string) => {
    if (sharedMemberIds.includes(dinerId)) {
      if (sharedMemberIds.length > 1) {
        setSharedMemberIds(sharedMemberIds.filter((id) => id !== dinerId));
      }
    } else {
      setSharedMemberIds([...sharedMemberIds, dinerId]);
    }
  };

  const dinersSharingCount = isShared ? sharedMemberIds.length : 1;
  const pricePerPerson = basePrice / dinersSharingCount;

  const handleConfirm = () => {
    onAddToCart({
      menuItemId: dish.id,
      name: selectedSize ? `${dish.name} ${selectedSize.toLowerCase()}` : dish.name,
      size: selectedSize,
      meat: selectedMeat,
      notes: notes.trim() || undefined,
      unitPrice: basePrice,
      quantity: 1,
      sharedWithUserIds: isShared && sharedMemberIds.length > 1 ? sharedMemberIds : undefined,
      paidByUserId: currentUserId,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header with Close Button */}
        <div className="relative">
          {/* Dish Image */}
          <div className="h-48 sm:h-56 bg-stone-100 overflow-hidden relative">
            {dish.image ? (
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 bg-stone-100">
                <Utensils className="w-12 h-12 stroke-1" />
                <span className="text-xs uppercase tracking-wider font-bold mt-2">Imagen Platillo</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          </div>

          {/* Close button pill (Matches Wireframe 5 top right (X)) */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white text-stone-900 shadow-md flex items-center justify-center hover:bg-stone-100 active:scale-90 transition-transform cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Scrollable Configuration Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Title & Description */}
          <div>
            <h2 className="text-2xl font-black text-stone-950 tracking-tight">
              {dish.name}
            </h2>
            <p className="text-stone-600 text-sm mt-1.5 leading-relaxed">
              {dish.description}
            </p>
          </div>

          {/* Size Options (Wireframe 5: TAMAÑO Obligatorio) */}
          {dish.sizes && (
            <div>
              <p className="text-xs font-black italic uppercase tracking-wider text-stone-950 mb-3">
                Tamaño <span className="font-normal not-italic text-stone-400">(Obligatorio)</span>
              </p>
              <div className="space-y-2.5">
                {dish.sizes.map((s) => {
                  const isSelected = selectedSize === s.name;
                  return (
                    <div
                      key={s.name}
                      onClick={() => setSelectedSize(s.name)}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-black bg-stone-50 shadow-xs'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isSelected ? 'border-black' : 'border-stone-300'
                          }`}
                        >
                          {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-black" />}
                        </div>
                        <span className="font-extrabold text-base text-stone-900">
                          {s.name}
                        </span>
                      </div>
                      <span className="font-black text-base text-stone-900 tabular-nums">
                        ${s.price}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Meat / Guisado options */}
          {dish.meatOptions && (
            <div>
              <p className="text-xs font-black italic uppercase tracking-wider text-stone-950 mb-3">
                Carne / Guisado <span className="font-normal not-italic text-stone-400">(Elige uno)</span>
              </p>
              <div className="grid grid-cols-2 gap-2">
                {dish.meatOptions.map((opt) => {
                  const isSelected = selectedMeat === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSelectedMeat(opt)}
                      className={`p-2.5 rounded-lg text-left text-xs font-bold border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-black bg-black text-white'
                          : 'border-stone-200 bg-white text-stone-800 hover:border-stone-400'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Feature: COMPARTIR ESTE PLATILLO CON ALGUIEN DE LA MESA */}
          <div className="border border-stone-200 rounded-xl p-4 bg-stone-50/70">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-stone-900" />
                <span className="text-xs font-extrabold uppercase tracking-wide text-stone-950">
                  ¿Compartir platillo al centro?
                </span>
              </div>
              <input
                type="checkbox"
                id="share-toggle"
                checked={isShared}
                onChange={(e) => {
                  setIsShared(e.target.checked);
                  if (e.target.checked && otherDiners.length > 0) {
                    // Default share with Ana & Luis or first diners
                    setSharedMemberIds([currentUserId, otherDiners[0].id, ...(otherDiners[1] ? [otherDiners[1].id] : [])]);
                  } else {
                    setSharedMemberIds([currentUserId]);
                  }
                }}
                className="w-5 h-5 accent-black rounded cursor-pointer"
              />
            </div>

            <p className="text-xs text-stone-500 mb-3">
              Divide el costo de este platillo equitativamente entre los comensales elegidos.
            </p>

            {isShared && (
              <div className="space-y-2 pt-2 border-t border-stone-200">
                <p className="text-[11px] font-bold text-stone-700">
                  Selecciona con quién lo compartes:
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-black text-white text-xs font-bold rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3" /> Tú (Dani)
                  </span>
                  {otherDiners.map((diner) => {
                    const isIncluded = sharedMemberIds.includes(diner.id);
                    return (
                      <button
                        key={diner.id}
                        type="button"
                        onClick={() => toggleShareMember(diner.id)}
                        className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                          isIncluded
                            ? 'bg-stone-900 text-white border-black'
                            : 'bg-white text-stone-700 border-stone-300 hover:border-black'
                        }`}
                      >
                        {isIncluded && '✓ '} {diner.name}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-3 p-2.5 bg-white border border-stone-200 rounded-lg flex items-center justify-between text-xs">
                  <span className="text-stone-600">
                    Costo por comensal ({sharedMemberIds.length} personas):
                  </span>
                  <span className="font-extrabold text-stone-950 tabular-nums">
                    ${pricePerPerson.toFixed(2)} c/u
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Notes for kitchen */}
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-stone-950 block mb-1.5">
              Instrucciones para cocina <span className="text-stone-400 font-normal">(Opcional)</span>
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej: Sin cebolla, limón extra, salsa aparte..."
              className="w-full p-3 border border-stone-300 rounded-lg text-sm bg-white focus:outline-hidden focus:border-black placeholder:text-stone-400 font-medium"
            />
          </div>
        </div>

        {/* Bottom CTA (Matches Wireframe 5) */}
        <div className="p-4 border-t border-stone-200 bg-white">
          <button
            onClick={handleConfirm}
            className="w-full h-14 bg-black text-white font-black text-base tracking-wider rounded-xl uppercase hover:bg-stone-800 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Agregar a mi pedido</span>
            <span className="text-stone-400 font-normal">·</span>
            <span className="tabular-nums italic">${(isShared ? pricePerPerson : basePrice).toFixed(2)}</span>
            {isShared && <span className="text-xs text-stone-400 font-normal">(tu parte)</span>}
          </button>
        </div>
      </div>
    </div>
  );
};
