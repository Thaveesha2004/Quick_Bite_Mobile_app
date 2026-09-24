import {
  addItem, updateQty, removeItem, getItemCount, getSubtotal, getTotal,
  filterMenu, validateLogin, generateOrderId, getPickupTime,
} from '../src/utils/cart';
import { MENU_ITEMS } from '../src/data/menu';

const burger = { id: 'm3', name: 'Cheese Burger', price: 720, prepMins: 8 };
const tea = { id: 'b3', name: 'Milk Tea', price: 150, prepMins: 2 };

describe('Cart logic', () => {
  test('TC-03: adding the same item twice increases quantity', () => {
    let cart = addItem([], burger, 1);
    cart = addItem(cart, burger, 2);
    expect(cart).toHaveLength(1);
    expect(cart[0].qty).toBe(3);
  });

  test('TC-04: subtotal and item count are calculated correctly', () => {
    const cart = addItem(addItem([], burger, 2), tea, 3);
    expect(getItemCount(cart)).toBe(5);
    expect(getSubtotal(cart)).toBe(720 * 2 + 150 * 3);
    expect(getTotal(cart)).toBeCloseTo(1890 * 1.05);
  });

  test('quantity 0 removes the item; removeItem works', () => {
    const cart = addItem(addItem([], burger), tea);
    expect(updateQty(cart, 'm3', 0)).toHaveLength(1);
    expect(removeItem(cart, 'b3')).toEqual([expect.objectContaining({ id: 'm3' })]);
  });
});

describe('Search / filter', () => {
  test('TC-02: filter by category and search text', () => {
    expect(filterMenu(MENU_ITEMS, 'Beverages', '').every((i) => i.category === 'Beverages')).toBe(true);
    expect(filterMenu(MENU_ITEMS, 'All', 'burger').map((i) => i.id)).toEqual(['m3']);
    expect(filterMenu(MENU_ITEMS, 'All', 'zzz')).toHaveLength(0);
  });
});

describe('Login validation', () => {
  test('TC-05: empty / invalid inputs return errors', () => {
    expect(validateLogin('', '')).toEqual({ email: 'Email is required', password: 'Password is required' });
    expect(validateLogin('abc', '123').email).toBe('Enter a valid email address');
    expect(validateLogin('abc@uni.lk', '123').password).toMatch(/at least 6/);
    expect(validateLogin('abc@uni.lk', '123456')).toEqual({});
  });
});

describe('Order', () => {
  test('TC-06: order id format and pickup time', () => {
    expect(generateOrderId()).toMatch(/^QB-\d{6}$/);
    const now = new Date('2026-09-24T10:00:00');
    expect(getPickupTime([burger, tea], now).getTime() - now.getTime()).toBe((8 + 5) * 60000);
  });
});
