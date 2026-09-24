# QuickBite – Campus Food Ordering App

A cross-platform (Android / iOS / Web) MVP built with **React Native + Expo**, using
**React Navigation** (native stack) and the **Context API** for cart state.

## Run it

```bash
npm install
npx expo start        # scan QR with Expo Go (Android/iOS), or press "a" for the Android emulator
npx expo start --web  # run in the browser (press "w")
npm test              # run Jest unit tests
```

## Screens / route flow
Splash → Login (or Guest) → Home (menu grid + search + category filter) → Item Detail (qty + Add to Cart)
→ Cart (qty edit, subtotal, 5% service fee, total) → Checkout / Order Confirmed (order ID + pickup time)
→ Order Tracking (Placed → Preparing → Ready for pickup, auto-updates every 8 s) → Profile (name + order history)

## Project structure
```
App.js                         navigation stack + providers
src/theme.js                   colours, spacing, fonts, responsive breakpoints
src/data/menu.js               local menu data (JSON-like)
src/utils/cart.js              pure cart/order/validation logic (unit tested)
src/context/CartContext.js     global state: user, cart, orders, order-status simulation
src/components/                CartButton (badge), PrimaryButton, Screen (responsive wrapper)
src/screens/                   8 screens
__tests__/cart.test.js         Jest tests
```

## Test cases
| ID | Area | Steps | Expected |
|----|------|-------|----------|
| TC-01 | Navigation | Splash → Guest → tap item → Cart → Checkout → Track → Profile | Every screen opens, back works, < 1 s transition |
| TC-02 | Search/filter | Type "burger"; tap "Beverages" chip | Only matching items shown; "No items match" for nonsense text |
| TC-03 | Add to cart | Open Cheese Burger, qty 2, Add; add again | Badge shows count; cart shows one row with summed qty |
| TC-04 | Cart totals | Add 2 × Burger + 3 × Milk Tea | Subtotal Rs. 1890.00, fee Rs. 94.50, total Rs. 1984.50 |
| TC-05 | Login validation | Login with empty fields; "abc" + "123"; valid email + 6-char password | Error messages shown; valid input opens Home |
| TC-06 | Order placement | Checkout | Order ID `QB-######`, pickup time shown, cart cleared, status moves Placed → Preparing → Ready |
| TC-07 | Cart persistence | Add item, go back to Home, open another item, return to Cart | Items still in cart |
| TC-08 | Responsive layout | Phone width (375) vs tablet width (768+) | 2-column grid on phone, 3–4 on tablet; detail screen side-by-side on tablet |
