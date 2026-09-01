import {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import { api } from "../../api/api";
import { useAuth } from "../AuthContext";

interface CartItem {
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

interface CardContextData {
  card: Cart | null;
  setCard: React.Dispatch<React.SetStateAction<Cart | null>>;
  addToCard: (product: any, quantity: number) => void;
  itemsCount: number;
  createOrder: (itemsToOrder?: any) => Promise<any>;
}

const CardContext = createContext<CardContextData>({} as CardContextData);

export function CardProvider({ children }: { children: ReactNode }) {
  const [card, setCard] = useState<Cart | null>(null);

  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      setCard(null);
      return;
    }

    const fetchCart = async () => {
      try {
        const { data } = await api.get("/cart");
        if (data && data.items) {
          setCard(data);
        }
      } catch (error) {
        console.error("Erro ao carregar o carrinho do banco:", error);
      }
    };

    fetchCart();
  }, [token]);

  const addToCard = (product: any, quantity: number) => {
    setCard((prevCard: Cart) => {
      if (!prevCard) {
        return {
          id: "",
          userId: "",
          items: [{ id: "", quantity, product }],
        };
      }

      const productExist = prevCard.items.find(
        (item) => item.product.id === product.id
      );

      let updatedItems;

      if (productExist) {
        updatedItems = prevCard.items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedItems = [...prevCard.items, { id: "", quantity, product }];
      }

      return {
        ...prevCard,
        items: updatedItems,
      };
    });
  };

  const itemsCount =
    card?.items?.reduce((acc, item) => acc + item.quantity, 0) ?? 0;

  const createOrder = async (itemsToOrder) => {
    try {
      const list = itemsToOrder || card;
      const payload = list.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      }));

      const response = await api.post("/cart/items", { items: payload });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <CardContext.Provider
      value={{ addToCard, itemsCount, createOrder, card, setCard }}
    >
      {children}
    </CardContext.Provider>
  );
}

export const useCard = () => useContext(CardContext);
