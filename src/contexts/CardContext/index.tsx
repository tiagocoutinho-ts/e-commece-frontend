import { createContext, useState, useContext } from "react";

const CardContext = createContext(undefined);

export function CardProvider({ children }) {
  const [itemCount, setItemCount] = useState(0);

  return (
    <CardContext.Provider value={{ itemCount, setItemCount }}>
      {children}
    </CardContext.Provider>
  );
}

export const useCar = () => useContext(CardContext);
