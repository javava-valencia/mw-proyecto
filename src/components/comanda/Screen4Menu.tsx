import React, { useState } from 'react';
import { Search, Bell, Plus, ArrowRight, Utensils, Users } from 'lucide-react';
import { MenuItem, DishCategory, CartItem, TableDiner } from '../../types';

interface Props {
  tableNumber: number;
  userName: string;
  menuItems: MenuItem[];
  cartItems: CartItem[];
  currentUserId: string;
  diners: TableDiner[];
  onOpenDishModal: (item: MenuItem) => void;
  onViewCart: () => void;
  onCallWaiter: () => void;
  onViewTableSummary: () => void;
}

export const Screen4Menu: React.FC<Props> = ({
  tableNumber,
  userName,
  menuItems,
  cartItems,
  currentUserId,
  diners,
  onOpenDishModal,
  onViewCart,
  onCallWaiter,
  onViewTableSummary,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<DishCategory>('pozoles');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate current user's items and total
  const userItems = cartItems.filter(
    (item) => item.paidByUserId === currentUserId || item.sharedWithUserIds?.includes(currentUserId)
  );

  const totalUserDishes = userItems.reduce((acc, item) => acc + item.quantity, 0);

  const userSubtotal = userItems.reduce((acc, item) => {
    if (item.sharedWithUserIds && item.sharedWithUserIds.length > 0) {
      return acc + (item.unitPrice * item.quantity) / item.sharedWithUserIds.length;
    }
    return acc + item.unitPrice * item.quantity;
  }, 0);

  // Filtered menu
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return searchQuery ? matchesSearch : matchesCategory;
  });

  const categories: { key: DishCategory; label: string }[] = [
    { key: 'pozoles', label: 'Pozoles' },
    { key: 'antojitos', label: 'Antojitos' },
    { key: 'postres', label: 'Postres' },
    { key: 'bebidas', label: 'Bebidas' },
  ];

  return (
    <div className="flex flex-col min-h-full bg-white text-stone-900 pb-20">
      {/* Top Header matching Wireframe 4 */}
      <div className="py-3 px-4 border-b border-stone-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-sm z-20">
        <div>
          <h2 className="text-xl font-black text-stone-950 tracking-tight">
            Mesa {tableNumber}
          </h2>
          <p className="text-xs font-semibold text-stone-600 italic">
            Hola, {userName}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Table Group View */}
          <button
            onClick={onViewTableSummary}
            title="Ver comensales de la mesa"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-stone-200 hover:border-black text-xs font-bold text-stone-800 transition-colors"
          >
            <Users className="w-4 h-4 text-stone-700" />
            <span className="hidden sm:inline">Mesa</span>
            <span className="bg-stone-900 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
              {diners.length}
            </span>
          </button>

          {/* Waiter Button (Exact to Wireframe 4) */}
          <button
            onClick={onCallWaiter}
            className="flex flex-col items-center justify-center border-2 border-black rounded-md px-3 py-1 bg-white hover:bg-stone-50 active:scale-95 transition-all shadow-xs cursor-pointer"
          >
            <Bell className="w-4 h-4 fill-black text-black" />
            <span className="text-[10px] font-black tracking-wider uppercase mt-0.5">
              Mesero
            </span>
          </button>
        </div>
      </div>

      <div className="px-4 pt-3 pb-4 max-w-lg mx-auto w-full">
        {/* Search Input */}
        <div className="relative mb-3.5">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar platillo"
            className="w-full h-11 pl-10 pr-4 border border-stone-300 rounded-lg text-sm bg-white placeholder:text-stone-400 focus:outline-hidden focus:border-black font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 hover:text-stone-700"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Tabs (Matches Wireframe 4 pill styling) */}
        {!searchQuery && (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-1">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-5 py-2 rounded-lg font-black italic text-sm tracking-wide transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-black text-white shadow-xs'
                      : 'bg-white text-stone-900 border border-stone-300 hover:border-black'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Dishes List (Exact structure to Wireframe 4) */}
        <div className="space-y-3.5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenDishModal(item)}
              className="flex items-center gap-3.5 p-3.5 border border-stone-200 rounded-xl bg-white hover:border-stone-400 transition-all shadow-2xs hover:shadow-xs group cursor-pointer"
            >
              {/* Dish Image Box */}
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-stone-100 border border-stone-200 shrink-0 relative flex items-center justify-center">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-stone-400">
                    <Utensils className="w-6 h-6 stroke-[1.5]" />
                    <span className="text-[9px] uppercase tracking-wider font-bold mt-1">Platillo</span>
                  </div>
                )}
                {item.popular && (
                  <span className="absolute top-1 left-1 bg-amber-500 text-white text-[9px] font-black uppercase px-1 rounded">
                    Top
                  </span>
                )}
              </div>

              {/* Dish Details */}
              <div className="flex-1 min-w-0 pr-1">
                <h3 className="font-extrabold italic text-base text-stone-950 leading-tight group-hover:text-black">
                  {item.name}
                </h3>
                <p className="text-xs text-stone-600 line-clamp-2 mt-1 leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-1.5 flex items-baseline gap-1">
                  <span className="text-xs font-semibold text-stone-500">
                    {item.sizes ? 'Desde' : ''}
                  </span>
                  <span className="text-sm font-black text-stone-900 tabular-nums">
                    ${item.basePrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* (+) Action Button with border circle */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDishModal(item);
                }}
                className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center shrink-0 hover:bg-black hover:text-white transition-colors cursor-pointer group-hover:scale-105"
                title="Personalizar y agregar"
              >
                <Plus className="w-5 h-5 text-current stroke-[2.5]" />
              </button>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="text-center py-12 text-stone-500 border border-dashed border-stone-200 rounded-xl">
              <p className="font-bold text-sm">No encontramos platillos para "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-2 text-xs text-black underline font-bold"
              >
                Limpiar búsqueda
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Bar (Exact match to Wireframe 4) */}
      {totalUserDishes > 0 && (
        <div className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto p-3 z-30 pointer-events-none">
          <div
            onClick={onViewCart}
            className="w-full bg-black text-white p-3.5 rounded-xl shadow-xl flex items-center justify-between cursor-pointer pointer-events-auto hover:bg-stone-900 active:scale-[0.99] transition-all"
          >
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-stone-400 italic">
                Mi Pedido
              </p>
              <p className="text-sm font-extrabold text-white tracking-tight tabular-nums">
                {totalUserDishes} {totalUserDishes === 1 ? 'platillo' : 'platillos'} · ${userSubtotal.toFixed(2)}
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-black tracking-wider uppercase bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">
              <span>Ver Pedido</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
