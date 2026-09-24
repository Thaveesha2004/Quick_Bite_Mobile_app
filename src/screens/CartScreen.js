import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useCart } from '../context/CartContext';
import PrimaryButton from '../components/PrimaryButton';
import Screen from '../components/Screen';
import { colors, font, formatPrice, spacing } from '../theme';

export default function CartScreen({ navigation }) {
  const { cart, updateQty, removeFromCart, itemCount, subtotal, serviceFee, total, placeOrder } = useCart();

  const handleCheckout = () => {
    const order = placeOrder();
    if (order) navigation.replace('Checkout', { orderId: order.id });
  };

  if (cart.length === 0) {
    return (
      <Screen>
        <View style={styles.emptyBox}>
          <Text style={{ fontSize: 70 }}>🛒</Text>
          <Text style={styles.emptyTitle} testID="empty-cart">Your cart is empty</Text>
          <Text style={styles.muted}>Add something tasty from the menu.</Text>
          <PrimaryButton title="Browse Menu" onPress={() => navigation.navigate('Home')} style={{ marginTop: spacing.lg }} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      {cart.map((item) => (
        <View key={item.id} style={styles.row} testID={`cart-row-${item.id}`}>
          <Text style={styles.emoji}>{item.image}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.muted}>{formatPrice(item.price)} each</Text>
            <View style={styles.qtyRow}>
              <Pressable style={styles.qtyBtn} onPress={() => updateQty(item.id, item.qty - 1)} testID={`minus-${item.id}`}>
                <Text style={styles.qtyBtnText}>−</Text>
              </Pressable>
              <Text style={styles.qty}>{item.qty}</Text>
              <Pressable style={styles.qtyBtn} onPress={() => updateQty(item.id, item.qty + 1)} testID={`plus-${item.id}`}>
                <Text style={styles.qtyBtnText}>+</Text>
              </Pressable>
              <Pressable onPress={() => removeFromCart(item.id)} style={{ marginLeft: 'auto' }}>
                <Text style={styles.remove}>Remove</Text>
              </Pressable>
            </View>
          </View>
          <Text style={styles.lineTotal}>{formatPrice(item.price * item.qty)}</Text>
        </View>
      ))}

      <View style={styles.summary}>
        <Line label={`Items (${itemCount})`} value={formatPrice(subtotal)} testID="subtotal" />
        <Line label="Service fee (5%)" value={formatPrice(serviceFee)} />
        <View style={styles.divider} />
        <Line label="Total" value={formatPrice(total)} bold testID="total" />
      </View>

      <PrimaryButton testID="checkout-button" title="Checkout & Place Order" onPress={handleCheckout} style={{ marginTop: spacing.lg }} />
      <PrimaryButton title="Add More Items" variant="outline" onPress={() => navigation.navigate('Home')} style={{ marginTop: spacing.sm }} />
    </Screen>
  );
}

const Line = ({ label, value, bold, testID }) => (
  <View style={styles.line}>
    <Text style={[styles.lineLabel, bold && styles.bold]}>{label}</Text>
    <Text style={[styles.lineLabel, bold && styles.bold]} testID={testID}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  emptyBox: { alignItems: 'center', marginTop: 80 },
  emptyTitle: { fontSize: font.title, fontWeight: '800', marginTop: spacing.md },
  muted: { color: colors.muted },
  row: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderRadius: 14,
    padding: spacing.md, marginBottom: spacing.sm, gap: spacing.md, elevation: 2,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6,
  },
  emoji: { fontSize: 40 },
  name: { fontWeight: '700', fontSize: font.body },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  qtyBtn: { width: 30, height: 30, borderRadius: 15, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  qtyBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  qty: { marginHorizontal: 12, fontWeight: '700', fontSize: font.body },
  remove: { color: colors.danger, fontWeight: '600' },
  lineTotal: { fontWeight: '800', color: colors.text },
  summary: { backgroundColor: colors.card, borderRadius: 14, padding: spacing.md, marginTop: spacing.md },
  line: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
  lineLabel: { fontSize: font.body, color: colors.text },
  bold: { fontWeight: '800', fontSize: font.title, color: colors.primary },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.sm },
});
