import { StyleSheet, Text, View } from 'react-native';
import { useCart } from '../context/CartContext';
import { ORDER_STATUSES } from '../utils/cart';
import PrimaryButton from '../components/PrimaryButton';
import Screen from '../components/Screen';
import { formatTime } from './CheckoutScreen';
import { colors, font, spacing } from '../theme';

const ICONS = ['🧾', '👨‍🍳', '🛍️'];
const DESCRIPTIONS = [
  'The canteen has received your order.',
  'The kitchen is preparing your food.',
  'Your food is ready! Collect it at the counter.',
];

export default function OrderTrackingScreen({ route, navigation }) {
  const { orders } = useCart();
  const order = orders.find((o) => o.id === route.params.orderId);
  if (!order) return null;
  const current = order.statusIndex;

  return (
    <Screen maxWidth={560}>
      <Text style={styles.orderId}>Order {order.id}</Text>
      <Text style={styles.muted}>Estimated pickup: {formatTime(order.pickupAt)}</Text>
      <Text style={styles.status} testID="order-status">{ORDER_STATUSES[current]}</Text>

      <View style={styles.timeline}>
        {ORDER_STATUSES.map((s, idx) => {
          const done = idx <= current;
          return (
            <View key={s} style={styles.step}>
              <View style={styles.markerCol}>
                <View style={[styles.dot, done && styles.dotDone]}>
                  <Text style={{ fontSize: 20 }}>{ICONS[idx]}</Text>
                </View>
                {idx < ORDER_STATUSES.length - 1 && <View style={[styles.bar, idx < current && styles.barDone]} />}
              </View>
              <View style={{ flex: 1, paddingTop: 6 }}>
                <Text style={[styles.stepTitle, !done && styles.faded]}>{s}</Text>
                <Text style={[styles.muted, !done && styles.faded]}>{DESCRIPTIONS[idx]}</Text>
              </View>
            </View>
          );
        })}
      </View>

      {current < ORDER_STATUSES.length - 1 && (
        <Text style={styles.note}>Status updates automatically…</Text>
      )}
      <PrimaryButton title="Back to Menu" onPress={() => navigation.navigate('Home')} style={{ marginTop: spacing.lg }} />
      <PrimaryButton title="View Order History" variant="outline" onPress={() => navigation.navigate('Profile')} style={{ marginTop: spacing.sm }} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  orderId: { fontSize: font.heading, fontWeight: '900', color: colors.text },
  muted: { color: colors.muted },
  status: {
    alignSelf: 'flex-start', marginTop: spacing.md, backgroundColor: colors.primary, color: '#fff',
    fontWeight: '800', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, overflow: 'hidden',
  },
  timeline: { marginTop: spacing.lg, backgroundColor: colors.card, borderRadius: 16, padding: spacing.md },
  step: { flexDirection: 'row', gap: spacing.md },
  markerCol: { alignItems: 'center' },
  dot: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#EEE', alignItems: 'center', justifyContent: 'center' },
  dotDone: { backgroundColor: colors.accent },
  bar: { width: 4, height: 40, backgroundColor: '#EEE' },
  barDone: { backgroundColor: colors.accent },
  stepTitle: { fontWeight: '800', fontSize: font.body, color: colors.text },
  faded: { opacity: 0.4 },
  note: { textAlign: 'center', color: colors.muted, marginTop: spacing.md, fontStyle: 'italic' },
});
