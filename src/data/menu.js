// Local menu data (acts like a JSON file / API response)
export const CATEGORIES = ['All', 'Meals', 'Beverages', 'Snacks'];

export const MENU_ITEMS = [
  { id: 'm1', name: 'Chicken Fried Rice', category: 'Meals', price: 650, image: '🍛', prepMins: 12, description: 'Wok-fried basmati rice with chicken, egg and fresh vegetables.' },
  { id: 'm2', name: 'Veggie Kottu', category: 'Meals', price: 550, image: '🥘', prepMins: 10, description: 'Classic chopped roti stir-fried with vegetables and spices.' },
  { id: 'm3', name: 'Cheese Burger', category: 'Meals', price: 720, image: '🍔', prepMins: 8, description: 'Grilled beef patty, cheddar, lettuce and house sauce.' },
  { id: 'm4', name: 'Margherita Pizza', category: 'Meals', price: 900, image: '🍕', prepMins: 15, description: 'Personal pizza with tomato sauce, mozzarella and basil.' },
  { id: 'b1', name: 'Iced Coffee', category: 'Beverages', price: 350, image: '🧋', prepMins: 3, description: 'Cold brewed coffee with milk and ice.' },
  { id: 'b2', name: 'Fresh Orange Juice', category: 'Beverages', price: 300, image: '🍊', prepMins: 3, description: 'Freshly squeezed oranges, no added sugar.' },
  { id: 'b3', name: 'Milk Tea', category: 'Beverages', price: 150, image: '🍵', prepMins: 2, description: 'Hot Ceylon tea with milk.' },
  { id: 's1', name: 'Fish Bun', category: 'Snacks', price: 120, image: '🥐', prepMins: 2, description: 'Soft bun stuffed with spicy fish and potato.' },
  { id: 's2', name: 'French Fries', category: 'Snacks', price: 400, image: '🍟', prepMins: 6, description: 'Crispy salted fries with ketchup.' },
  { id: 's3', name: 'Chocolate Donut', category: 'Snacks', price: 200, image: '🍩', prepMins: 1, description: 'Glazed donut topped with chocolate.' },
];

export const CATEGORY_COLORS = {
  Meals: '#FFE8D6',
  Beverages: '#DDF3FF',
  Snacks: '#FFF3C4',
};
