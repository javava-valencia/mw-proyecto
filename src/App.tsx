import React, { useState } from 'react';
import { TableDiner, CartItem, MenuItem } from './types';
import { MENU_ITEMS } from './data/menuData';
import { INITIAL_DINERS, INITIAL_ITEMS } from './data/mockInitialTable';

// Top Bar
import { Navbar } from './components/Navbar';

// Comanda Screens
import { Screen1Landing } from './components/comanda/Screen1Landing';
import { Screen2ConfirmTable } from './components/comanda/Screen2ConfirmTable';
import { Screen3IdentifyUser } from './components/comanda/Screen3IdentifyUser';
import { Screen4Menu } from './components/comanda/Screen4Menu';
import { DishConfigModal } from './components/comanda/DishConfigModal';
import { Screen6Cart } from './components/comanda/Screen6Cart';
import { Screen7KitchenTracker } from './components/comanda/Screen7KitchenTracker';
import { Screen8TableSummary } from './components/comanda/Screen8TableSummary';
import { Screen9Payment } from './components/comanda/Screen9Payment';
import { Screen10WaiterCalled } from './components/comanda/Screen10WaiterCalled';

// Modals
import { WaiterCallModal } from './components/comanda/WaiterCallModal';
import { AddPersonModal } from './components/comanda/AddPersonModal';
import { TicketModal } from './components/comanda/TicketModal';

// Design System & Device Simulator
import { DesignSystemView } from './components/design-system/DesignSystemView';
import { PhoneFrame } from './components/devices/PhoneFrame';

export default function App() {
  // Navigation & Frame mode
  const [activeView, setActiveView] = useState<'comanda' | 'design-system'>('comanda');
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);

  // Table & Session State
  const [tableNumber, setTableNumber] = useState(12);
  const [branchName, setBranchName] = useState('SUCURSAL NARVARTE');
  const [diners, setDiners] = useState<TableDiner[]>(INITIAL_DINERS);
  const [currentUserId, setCurrentUserId] = useState('user-dani');
  const [currentUserName, setCurrentUserName] = useState('Dani');
  const [items, setItems] = useState<CartItem[]>(INITIAL_ITEMS);
  const [currentRound, setCurrentRound] = useState(1);

  // Active Screen in Comanda Flow
  const [activeScreen, setActiveScreen] = useState<
    | 'screen1_landing'
    | 'screen2_table'
    | 'screen3_identify'
    | 'screen4_menu'
    | 'screen6_cart'
    | 'screen7_tracker'
    | 'screen8_table_summary'
    | 'screen9_payment'
    | 'screen10_waiter_confirm'
  >('screen1_landing');

  // Modals
  const [selectedDishForModal, setSelectedDishForModal] = useState<MenuItem | null>(null);
  const [isWaiterModalOpen, setIsWaiterModalOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isAddPersonModalOpen, setIsAddPersonModalOpen] = useState(false);

  // Payment Confirmation State
  const [lastPaymentInfo, setLastPaymentInfo] = useState<{
    method: 'tarjeta' | 'mesero';
    total: number;
    tip: number;
  }>({
    method: 'mesero',
    total: 143.36,
    tip: 13.03,
  });

  // Handler: Change Table / Branch
  const handleChangeTable = (newTable: number, newBranch: string) => {
    setTableNumber(newTable);
    setBranchName(newBranch);
  };

  // Handler: Add companion without phone (Wireframe 3)
  const handleAddNonPhoneCompanion = (name: string) => {
    const newDinerId = `diner-sub-${Date.now()}`;
    const newDiner: TableDiner = {
      id: newDinerId,
      name,
      avatarLetter: name.charAt(0).toUpperCase(),
      avatarColor: 'bg-stone-700 text-white',
      hasPhone: false,
      parentDinerId: currentUserId,
      isPaid: false,
      tipPercentage: 10,
    };
    setDiners((prev) => [...prev, newDiner]);
  };

  // Handler: Add to Cart (from Modal)
  const handleAddToCart = (itemData: Omit<CartItem, 'cartItemId' | 'orderRound' | 'status'>) => {
    const newItem: CartItem = {
      ...itemData,
      cartItemId: `item-${Date.now()}`,
      orderRound: currentRound,
      status: 'draft',
    };
    setItems((prev) => [...prev, newItem]);
  };

  // Handler: Update Quantity
  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Handler: Remove item
  const handleRemoveItem = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  // Handler: Send Order to Kitchen
  const handleSendToKitchen = () => {
    setItems((prev) =>
      prev.map((item) =>
        item.paidByUserId === currentUserId && item.status === 'draft'
          ? { ...item, status: 'recibido' }
          : item
      )
    );
    setActiveScreen('screen7_tracker');
  };

  // Handler: Order another round
  const handleOrderAnotherRound = () => {
    setCurrentRound((prev) => prev + 1);
    setActiveScreen('screen4_menu');
  };

  // Handler: Merge Accounts (Dani + Ana)
  const handleMergeDiners = (dinerId1: string, dinerId2: string) => {
    setDiners((prev) =>
      prev.map((d) => {
        if (d.id === dinerId1) return { ...d, mergedWithDinerId: dinerId2 };
        if (d.id === dinerId2) return { ...d, mergedWithDinerId: dinerId1 };
        return d;
      })
    );
  };

  // Handler: Unmerge Account
  const handleUnmergeDiner = (dinerId: string) => {
    const diner = diners.find((d) => d.id === dinerId);
    const partnerId = diner?.mergedWithDinerId;

    setDiners((prev) =>
      prev.map((d) => {
        if (d.id === dinerId || d.id === partnerId) {
          return { ...d, mergedWithDinerId: undefined };
        }
        return d;
      })
    );
  };

  // Handler: Confirm Payment
  const handleConfirmPayment = (
    method: 'tarjeta' | 'mesero',
    totalWithTip: number,
    tipAmount: number
  ) => {
    setLastPaymentInfo({
      method,
      total: totalWithTip,
      tip: tipAmount,
    });

    const currentDiner = diners.find((d) => d.id === currentUserId);
    const partnerId = currentDiner?.mergedWithDinerId;

    setDiners((prev) =>
      prev.map((d) => {
        if (d.id === currentUserId || d.id === partnerId) {
          return {
            ...d,
            isPaid: true,
            paymentMethod: method,
          };
        }
        return d;
      })
    );

    setActiveScreen('screen10_waiter_confirm');
  };

  // Handler: Pay for entire table
  const handlePayEntireTable = () => {
    const grandTotal = items.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0);
    const totalWithTip = grandTotal * 1.1; // 10% tip default
    setLastPaymentInfo({
      method: 'tarjeta',
      total: totalWithTip,
      tip: grandTotal * 0.1,
    });
    setDiners((prev) => prev.map((d) => ({ ...d, isPaid: true, paymentMethod: 'tarjeta' })));
    setActiveScreen('screen10_waiter_confirm');
  };

  // Handler: Reset simulation to initial mock state
  const handleResetTable = () => {
    setDiners(INITIAL_DINERS);
    setItems(INITIAL_ITEMS);
    setCurrentRound(1);
    setActiveScreen('screen1_landing');
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col text-stone-900 font-sans">
      {/* Top Navbar */}
      <Navbar
        activeView={activeView}
        onSelectView={(v) => setActiveView(v)}
        isPhoneFrame={isPhoneFrame}
        onTogglePhoneFrame={() => setIsPhoneFrame(!isPhoneFrame)}
        onOpenTicket={() => setIsTicketModalOpen(true)}
        onOpenWaiter={() => setIsWaiterModalOpen(true)}
        tableNumber={tableNumber}
      />

      {/* Main Body */}
      <main className="flex-1 flex flex-col">
        {activeView === 'design-system' ? (
          <DesignSystemView />
        ) : (
          <PhoneFrame
            isPhoneFrame={isPhoneFrame}
            activeScreenIndex={1}
            onJumpToScreen={(screen) => setActiveScreen(screen)}
            onResetTable={handleResetTable}
          >
            {/* SCREEN 1: LANDING */}
            {activeScreen === 'screen1_landing' && (
              <Screen1Landing
                tableNumber={tableNumber}
                branchName={branchName}
                onStart={() => setActiveScreen('screen2_table')}
                onCallWaiterDirect={() => setIsWaiterModalOpen(true)}
              />
            )}

            {/* SCREEN 2: CONFIRM TABLE */}
            {activeScreen === 'screen2_table' && (
              <Screen2ConfirmTable
                tableNumber={tableNumber}
                branchName={branchName}
                onConfirm={() => setActiveScreen('screen3_identify')}
                onBack={() => setActiveScreen('screen1_landing')}
                onChangeTable={handleChangeTable}
              />
            )}

            {/* SCREEN 3: IDENTIFY USER */}
            {activeScreen === 'screen3_identify' && (
              <Screen3IdentifyUser
                tableNumber={tableNumber}
                existingDiners={diners}
                currentName={currentUserName}
                onSetName={(name) => {
                  setCurrentUserName(name);
                  setDiners((prev) =>
                    prev.map((d) =>
                      d.id === currentUserId
                        ? { ...d, name, avatarLetter: name.charAt(0).toUpperCase() }
                        : d
                    )
                  );
                }}
                onSubmit={() => setActiveScreen('screen4_menu')}
                onBack={() => setActiveScreen('screen2_table')}
                onOpenAddNonPhoneModal={() => setIsAddPersonModalOpen(true)}
              />
            )}

            {/* SCREEN 4: MENU */}
            {activeScreen === 'screen4_menu' && (
              <Screen4Menu
                tableNumber={tableNumber}
                userName={currentUserName}
                menuItems={MENU_ITEMS}
                cartItems={items}
                currentUserId={currentUserId}
                diners={diners}
                onOpenDishModal={(item) => setSelectedDishForModal(item)}
                onViewCart={() => setActiveScreen('screen6_cart')}
                onCallWaiter={() => setIsWaiterModalOpen(true)}
                onViewTableSummary={() => setActiveScreen('screen8_table_summary')}
              />
            )}

            {/* SCREEN 6: CART REVIEW */}
            {activeScreen === 'screen6_cart' && (
              <Screen6Cart
                currentRound={currentRound}
                items={items}
                currentUserId={currentUserId}
                diners={diners}
                onBackToMenu={() => setActiveScreen('screen4_menu')}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onSendToKitchen={handleSendToKitchen}
              />
            )}

            {/* SCREEN 7: KITCHEN TRACKER */}
            {activeScreen === 'screen7_tracker' && (
              <Screen7KitchenTracker
                tableNumber={tableNumber}
                currentRound={currentRound}
                items={items}
                currentUserId={currentUserId}
                diners={diners}
                onOrderAnotherRound={handleOrderAnotherRound}
                onCallWaiter={() => setIsWaiterModalOpen(true)}
                onViewTableSummary={() => setActiveScreen('screen8_table_summary')}
              />
            )}

            {/* SCREEN 8: TABLE SUMMARY & MERGING */}
            {activeScreen === 'screen8_table_summary' && (
              <Screen8TableSummary
                tableNumber={tableNumber}
                diners={diners}
                currentUserId={currentUserId}
                items={items}
                onBack={() => setActiveScreen('screen4_menu')}
                onProceedToPay={(dinerId) => setActiveScreen('screen9_payment')}
                onMergeDiners={handleMergeDiners}
                onUnmergeDiner={handleUnmergeDiner}
                onPayEntireTable={handlePayEntireTable}
              />
            )}

            {/* SCREEN 9: PAYMENT & SPLIT/MERGE BILL */}
            {activeScreen === 'screen9_payment' && (
              <Screen9Payment
                tableNumber={tableNumber}
                currentUserId={currentUserId}
                diners={diners}
                items={items}
                onBack={() => setActiveScreen('screen8_table_summary')}
                onConfirmPayment={handleConfirmPayment}
              />
            )}

            {/* SCREEN 10: WAITER CALLED / RECEIPT CONFIRM */}
            {activeScreen === 'screen10_waiter_confirm' && (
              <Screen10WaiterCalled
                totalPaid={lastPaymentInfo.total}
                paymentMethod={lastPaymentInfo.method}
                tableNumber={tableNumber}
                userName={currentUserName}
                onReturnToTable={() => setActiveScreen('screen8_table_summary')}
                onViewTicket={() => setIsTicketModalOpen(true)}
              />
            )}
          </PhoneFrame>
        )}
      </main>

      {/* Dish Configuration Modal (Screen 5) */}
      <DishConfigModal
        dish={selectedDishForModal}
        onClose={() => setSelectedDishForModal(null)}
        onAddToCart={handleAddToCart}
        diners={diners}
        currentUserId={currentUserId}
      />

      {/* Quick Waiter Call Modal */}
      <WaiterCallModal
        isOpen={isWaiterModalOpen}
        onClose={() => setIsWaiterModalOpen(false)}
        tableNumber={tableNumber}
        onConfirmCall={(reason) => {
          // Can notify or log
        }}
      />

      {/* Add companion without phone Modal */}
      <AddPersonModal
        isOpen={isAddPersonModalOpen}
        onClose={() => setIsAddPersonModalOpen(false)}
        onAddDiner={handleAddNonPhoneCompanion}
      />

      {/* Printable / Viewable Digital Ticket Modal */}
      <TicketModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        tableNumber={tableNumber}
        branchName={branchName}
        diners={diners}
        items={items}
      />
    </div>
  );
}
