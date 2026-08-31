import { createContext, useState, useContext } from "react";
import { api } from "../../api/api";

const CardContext = createContext(undefined);

export function CardProvider({ children }) {
  const [card, setCard] = useState([]);

  const addToCard = (product, quantity) => {
    setCard((prevCard) => {
      const productExist = prevCard.find(
        (item) => item.product.id === product.id
      );

      if (productExist) {
        return prevCard.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevCard, { product, quantity }];
    });
  };

  const itemCount = card.length;

  const createOrder = async (itemsToOrder) => {
      try {
      const list = itemsToOrder || card
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
    <CardContext.Provider value={{ addToCard, itemCount, createOrder }}>
      {children}
    </CardContext.Provider>
  );
}

export const useCar = () => useContext(CardContext);
