import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useCart } from '../context/CartContext';
import { colors } from '../theme';

// Header buttons: profile + cart with live item-count badge
export default function CartButton({ navigation }) {
  const { itemCount } = useCart();
  return (
    <View style={styles.row}>
      <Pressable onPress={() => navigation.navigate('Profile')} style={styles.btn} accessibilityLabel="Open profile">
        <Text style={styles.icon}>👤</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Cart')} style={styles.btn} accessibilityLabel="Open cart" testID="header-cart">
        <Text style={styles.icon}>🛒</Text>
        {itemCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText} testID="cart-badge">{itemCount}</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  btn: { paddingHorizontal: 8, paddingVertical: 4 },
  icon: { fontSize: 22 },
  badge: {
    position: 'absolute', top: -4, right: 0, backgroundColor: colors.accent,
    borderRadius: 10, minWidth: 20, height: 20, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4,
  },
  badgeText: { color: colors.text, fontWeight: '800', fontSize: 12 },
});
