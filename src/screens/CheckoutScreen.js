import { StyleSheet, Text, View } from 'react-native';
import { useCart } from '../context/CartContext';
import PrimaryButton from '../components/PrimaryButton';
import Screen from '../components/Screen';
import { colors, font, formatPrice, spacing } from '../theme';

export const formatTime = (iso) =>
  new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// Order confirmation: order number + estimated pickup time
export default function CheckoutScreen({ route, navigation }) {
  const { orders } = useCart();
  const order = orders.find((o) => o.id === route.params.orderId);
  if (!order) return null;

  return (
    <Screen maxWidth={520}>
      <View style={styles.box}>
        <Text style={styles.check}>✅</Text>
        <Text style={styles.title}>Order Placed!</Text>
        <Text style={styles.muted}>Show this number at the counter</Text>
        <Text style={styles.orderId} testID="order-id">{order.id}</Text>

        <View style={styles.infoRow}>
          <Info label="Pickup at" value={formatTime(order.pickupAt)} testID="pickup-time" />
          <Info label="Items" value={String(order.itemCount)} />
          <Info label="Paid" value={formatPrice(order.total)} />
        </View>
      </View>

      {order.items.map((i) => (
        <Text key={i.id} style={styles.item}>{i.image}  {i.qty} × {i.name}</Text>
      ))}

      <PrimaryButton
        testID="track-order"
        title="Track My Order"
        onPress={() => navigation.navigate('OrderTracking', { orderId: order.id })}
        style={{ marginTop: spacing.lg }}
      />
      <PrimaryButton title="Back to Menu" variant="outline" onPress={() => navigation.navigate('Home')} style={{ marginTop: spacing.sm }} />
    </Screen>
  );
}

const Info = ({ label, value, testID }) => (
  <View style={styles.info}>
    <Text style={styles.muted}>{label}</Text>
    <Text style={styles.infoValue} testID={testID}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  box: { backgroundColor: colors.card, borderRadius: 20, padding: spacing.lg, alignItems: 'center', elevation: 3, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 10 },
  check: { fontSize: 64 },
  title: { fontSize: font.heading, fontWeight: '900', color: colors.success, marginTop: spacing.sm },
  muted: { color: colors.muted },
  orderId: { fontSize: 34, fontWeight: '900', letterSpacing: 2, color: colors.primary, marginVertical: spacing.md },
  infoRow: { flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginTop: spacing.sm },
  info: { alignItems: 'center' },
  infoValue: { fontWeight: '800', fontSize: font.title, color: colors.text },
  item: { fontSize: font.body, marginTop: spacing.sm, color: colors.text },
});
