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
  const { signed, loading } = useAuth(); 

  useEffect(() => {
    if (loading) return;

    if (!signed) {
      dispatch({ type: "CLEAR_CART" });
      return;
    }

    api.get("/cart")
      .then(({ data }) => {
        if (data?.items) dispatch({ type: "SET_CART", payload: data });
      })
      .catch(() => toast.error("Erro ao carregar carrinho."));
  }, [signed, loading]); 

  const itemsCount = card?.items?.reduce((acc, item) => acc + item.quantity, 0) ?? 0;

  return (
    <CardContext.Provider value={{ card, dispatch, itemsCount }}>
      {children}
    </CardContext.Provider>
  );
}

export const useCard = () => useContext(CardContext);