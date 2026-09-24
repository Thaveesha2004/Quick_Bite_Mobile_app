import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useCart } from '../context/CartContext';
import { ORDER_STATUSES } from '../utils/cart';
import PrimaryButton from '../components/PrimaryButton';
import Screen from '../components/Screen';
import { formatTime } from './CheckoutScreen';
import { colors, font, formatPrice, spacing } from '../theme';

export default function ProfileScreen({ navigation }) {
  const { user, orders, logout } = useCart();

  const handleLogout = () => {
    logout();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <Screen>
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{(user?.name ?? 'G').charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.name} testID="profile-name">{user?.name ?? 'Guest'}</Text>
        <Text style={styles.muted}>{user?.isGuest ? 'Guest account' : user?.email}</Text>
        <Text style={styles.stat}>{orders.length} order{orders.length === 1 ? '' : 's'} placed</Text>
      </View>

      <Text style={styles.section}>Order History</Text>
      {orders.length === 0 ? (
        <Text style={styles.muted} testID="no-orders">No orders yet.</Text>
      ) : (
        orders.map((o) => (
          <Pressable
            key={o.id}
            style={styles.order}
            onPress={() => navigation.navigate('OrderTracking', { orderId: o.id })}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.orderId}>{o.id}</Text>
              <Text style={styles.muted}>{o.itemCount} items · {formatTime(o.placedAt)}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.orderTotal}>{formatPrice(o.total)}</Text>
              <Text style={styles.badge}>{ORDER_STATUSES[o.statusIndex]}</Text>
            </View>
          </Pressable>
        ))
      )}

      <PrimaryButton title="Logout" variant="outline" onPress={handleLogout} style={{ marginTop: spacing.xl }} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.card, borderRadius: 20, padding: spacing.lg, alignItems: 'center', elevation: 3, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 10 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontSize: 36, fontWeight: '900' },
  name: { fontSize: font.title, fontWeight: '800', marginTop: spacing.sm, color: colors.text },
  muted: { color: colors.muted },
  stat: { marginTop: spacing.sm, fontWeight: '700', color: colors.primary },
  section: { fontSize: font.title, fontWeight: '800', marginTop: spacing.lg, marginBottom: spacing.sm, color: colors.text },
  order: { flexDirection: 'row', backgroundColor: colors.card, borderRadius: 14, padding: spacing.md, marginBottom: spacing.sm, elevation: 2 },
  orderId: { fontWeight: '800', color: colors.text },
  orderTotal: { fontWeight: '800', color: colors.text },
  badge: { fontSize: font.small, color: colors.success, fontWeight: '700', marginTop: 2 },
});
