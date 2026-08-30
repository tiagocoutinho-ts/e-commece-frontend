import { createContext, useState, useContext } from "react";
import { api } from "../../api/api";

const CardContext = createContext(undefined);

export function CardProvider({ children }) {
  const [card, setCard] = useState([]);

  const addToCard = (product, quantity) => {
    const productExist = card.find((item) => item.productId === product.id);

    if (productExist) {
      setCard((prev) =>
        prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCard((prev) => [...prev, { productId: product.id, quantity }]);
    }
  };

  const itemCount = card.length;

  const createOrder = async () => {
    const response = await api.post("/card/item", { item: card });
  };

  return (
    <CardContext.Provider value={{ addToCard, itemCount, createOrder }}>
      {children}
    </CardContext.Provider>
  );
}

export const useCar = () => useContext(CardContext);
