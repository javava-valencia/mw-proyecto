export type DishCategory = 'pozoles' | 'antojitos' | 'postres' | 'bebidas';

export interface DishOption {
  id: string;
  name: string;
  priceDelta: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: DishCategory;
  description: string;
  basePrice: number;
  image?: string;
  sizes?: { name: string; price: number }[];
  meatOptions?: string[];
  extras?: string[];
  popular?: boolean;
}

export interface CartItem {
  cartItemId: string;
  menuItemId: string;
  name: string;
  size?: string;
  meat?: string;
  notes?: string;
  unitPrice: number;
  quantity: number;
  sharedWithUserIds?: string[]; // IDs of friends sharing this dish
  paidByUserId: string;
  orderRound: number;
  status: 'draft' | 'recibido' | 'preparacion' | 'camino' | 'entregado';
}

export interface TableDiner {
  id: string;
  name: string;
  isCurrentUser?: boolean;
  avatarLetter: string;
  avatarColor: string;
  hasPhone: boolean;
  parentDinerId?: string; // If added by someone without a phone
  mergedWithDinerId?: string; // If bills are merged
  isPaid: boolean;
  paymentMethod?: 'tarjeta' | 'mesero';
  tipPercentage: number;
  customTip?: number;
}

export interface TableSession {
  tableNumber: number;
  branchName: string;
  diners: TableDiner[];
  currentDinerId: string;
  items: CartItem[];
  currentRound: number;
  activeScreen: 
    | 'screen1_landing'
    | 'screen2_table'
    | 'screen3_identify'
    | 'screen4_menu'
    | 'screen5_dish_modal'
    | 'screen6_cart'
    | 'screen7_tracker'
    | 'screen8_table_summary'
    | 'screen9_payment'
    | 'screen10_waiter_confirm';
  waiterCallActive: boolean;
  waiterCallReason?: string;
}
