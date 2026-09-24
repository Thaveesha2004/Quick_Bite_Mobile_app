// Pure cart helpers — kept separate from React so they are easy to unit test.

export const addItem = (cart, item, qty = 1) => {
  const existing = cart.find((c) => c.id === item.id);
  if (existing) {
    return cart.map((c) => (c.id === item.id ? { ...c, qty: c.qty + qty } : c));
  }
  return [...cart, { ...item, qty }];
};

export const updateQty = (cart, id, qty) =>
  qty <= 0 ? cart.filter((c) => c.id !== id) : cart.map((c) => (c.id === id ? { ...c, qty } : c));

export const removeItem = (cart, id) => cart.filter((c) => c.id !== id);

export const getItemCount = (cart) => cart.reduce((sum, c) => sum + c.qty, 0);

export const getSubtotal = (cart) => cart.reduce((sum, c) => sum + c.price * c.qty, 0);

export const SERVICE_FEE_RATE = 0.05;
export const getServiceFee = (cart) => Math.round(getSubtotal(cart) * SERVICE_FEE_RATE * 100) / 100;
export const getTotal = (cart) => getSubtotal(cart) + getServiceFee(cart);

export const generateOrderId = () => `QB-${Math.floor(100000 + Math.random() * 900000)}`;

// Estimated pickup = longest prep time in the order + 5 min buffer
export const getPickupTime = (cart, from = new Date()) => {
  const longest = cart.reduce((max, c) => Math.max(max, c.prepMins || 5), 0);
  return new Date(from.getTime() + (longest + 5) * 60000);
};

export const ORDER_STATUSES = ['Placed', 'Preparing', 'Ready for pickup'];

export const filterMenu = (items, category, query) => {
  const q = query.trim().toLowerCase();
  return items.filter(
    (i) => (category === 'All' || i.category === category) && (!q || i.name.toLowerCase().includes(q))
  );
};

export const validateLogin = (email, password) => {
  const errors = {};
  if (!email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = 'Enter a valid email address';
  if (!password) errors.password = 'Password is required';
  else if (password.length < 6) errors.password = 'Password must be at least 6 characters';
  return errors;
};
