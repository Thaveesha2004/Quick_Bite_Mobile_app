import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import * as cartUtils from '../utils/cart';

// Global app state (Context API): user, cart and orders.
// Because the provider wraps the whole navigator, the cart persists between screens.
const CartContext = createContext(null);

const STATUS_INTERVAL_MS = 8000; // simulate kitchen progress every 8 seconds

export function CartProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const advanceOrder = (orderId, step) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, statusIndex: step } : o)));
  };

  const placeOrder = () => {
    if (cart.length === 0) return null;
    const now = new Date();
    const order = {
      id: cartUtils.generateOrderId(),
      items: cart,
      itemCount: cartUtils.getItemCount(cart),
      total: cartUtils.getTotal(cart),
      placedAt: now.toISOString(),
      pickupAt: cartUtils.getPickupTime(cart, now).toISOString(),
      statusIndex: 0,
    };
    setOrders((prev) => [order, ...prev]);
    setCart([]);
    // Move order through Placed -> Preparing -> Ready for pickup
    for (let step = 1; step < cartUtils.ORDER_STATUSES.length; step++) {
      timers.current.push(setTimeout(() => advanceOrder(order.id, step), STATUS_INTERVAL_MS * step));
    }
    return order;
  };

  const value = useMemo(
    () => ({
      user,
      login: (name, email, isGuest = false) => setUser({ name, email, isGuest }),
      logout: () => {
        setUser(null);
        setCart([]);
      },
      cart,
      addToCart: (item, qty) => setCart((c) => cartUtils.addItem(c, item, qty)),
      updateQty: (id, qty) => setCart((c) => cartUtils.updateQty(c, id, qty)),
      removeFromCart: (id) => setCart((c) => cartUtils.removeItem(c, id)),
      clearCart: () => setCart([]),
      itemCount: cartUtils.getItemCount(cart),
      subtotal: cartUtils.getSubtotal(cart),
      serviceFee: cartUtils.getServiceFee(cart),
      total: cartUtils.getTotal(cart),
      orders,
      placeOrder,
    }),
    [user, cart, orders]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
};
