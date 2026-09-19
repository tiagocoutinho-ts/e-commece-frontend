export interface CartItem {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    images: { url: string }[];
  };
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
}

export type CartAction =
  | { type: "SET_CART"; payload: Cart }
  | { type: "ADD_TO_CARD"; payload: { product: any; quantity: number } }
  | { type: "CLEAR_CART" };

export interface CardContextData {
  card: Cart | null;
  dispatch: React.Dispatch<CartAction>;
  itemsCount: number;
}
