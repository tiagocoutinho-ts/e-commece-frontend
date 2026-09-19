import type { Cart, CartAction } from "./cart.types";

export function cartReducer(state: Cart | null, action: CartAction): Cart | null {
  switch (action.type) {
    case "SET_CART":
      return action.payload;

    case "ADD_TO_CARD": {
      const { product, quantity } = action.payload;

      if (!state) {
        return {
          id: "",
          userId: "",
          items: [{ id: "", quantity, product }],
        };
      }

      const productExist = state.items.find(
        (item) => item.product.id === product.id
      );

      const updatedItems = productExist
        ? state.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...state.items, { id: "", quantity, product }];

      return { ...state, items: updatedItems };
    }

    case "CLEAR_CART":
      return null;

    default:
      return state;
  }
}