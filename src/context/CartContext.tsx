import * as React from 'react';
import { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  unit: any;
  itemId: string;
  name: string;
  price: number;
  quantity?: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(i => i.itemId === item.itemId);
      if (existingItem) {
        return prevItems.map(i =>
          i.itemId === item.itemId
            ? { ...i, quantity: (i.quantity || 1) + (item.quantity || 1) }
            : i
        );
      }
      return [...prevItems, item];
    });
  };

  const removeItem = (itemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.itemId !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.itemId === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 