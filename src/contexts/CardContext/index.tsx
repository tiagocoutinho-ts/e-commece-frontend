import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import { api } from "../../service/api";
import { useAuth } from "../AuthContext";
import type { CardContextData } from "./cart.types";
import { cartReducer } from "./cart.reducer";
import { toast } from "react-toastify";

const CardContext = createContext<CardContextData>({} as CardContextData);

export function CardProvider({ children }: { children: ReactNode }) {
  const [card, dispatch] = useReducer(cartReducer, null);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      dispatch({ type: "CLEAR_CART" });
      return;
    }

    api.get("/cart").then(({ data }) => {
      if (data?.items) dispatch({ type: "SET_CART", payload: data });
    }).catch(err => toast.error("Erro ao carregar carrinho:", err));
  }, [token]);

  const addToCard = (product: any, quantity: number) => {
    dispatch({ type: "ADD_TO_CARD", payload: { product, quantity } });
  };

  const itemsCount = card?.items?.reduce((acc, item) => acc + item.quantity, 0) ?? 0;

  const createOrder = async (itemsToOrder?: any) => {
    const list = itemsToOrder || card?.items || [];
    const payload = list.map((item: any) => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));
    const { data } = await api.post("/cart/items", { items: payload });
    return data;
  };

  return (
    <CardContext.Provider value={{ addToCard, itemsCount, createOrder, card }}>
      {children}
    </CardContext.Provider>
  );
}

export const useCard = () => useContext(CardContext);