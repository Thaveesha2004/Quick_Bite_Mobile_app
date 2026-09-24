import { useState } from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useCart } from '../context/CartContext';
import { CATEGORY_COLORS } from '../data/menu';
import PrimaryButton from '../components/PrimaryButton';
import Screen from '../components/Screen';
import { colors, font, formatPrice, spacing } from '../theme';

export default function ItemDetailScreen({ route, navigation }) {
  const { item } = route.params;
  const { addToCart } = useCart();
  const { width } = useWindowDimensions();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const wide = width >= 700; // tablet: image and details side by side

  const handleAdd = () => {
    addToCart(item, qty);
    setAdded(true);
  };

  return (
    <Screen maxWidth={900}>
      <View style={[wide && styles.row]}>
        <View style={[styles.hero, { backgroundColor: CATEGORY_COLORS[item.category] }, wide && { flex: 1 }]}>
          <Text style={styles.emoji}>{item.image}</Text>
        </View>

        <View style={[styles.info, wide && { flex: 1, marginLeft: spacing.lg, marginTop: 0 }]}>
          <Text style={styles.cat}>{item.category}</Text>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>{formatPrice(item.price)}</Text>
          <Text style={styles.desc}>{item.description}</Text>
          <Text style={styles.prep}>⏱ Ready in about {item.prepMins} min</Text>

          <Text style={styles.label}>Quantity</Text>
          <View style={styles.qtyRow}>
            <Pressable testID="qty-minus" style={styles.qtyBtn} onPress={() => setQty((q) => Math.max(1, q - 1))}>
              <Text style={styles.qtyBtnText}>−</Text>
            </Pressable>
            <Text style={styles.qty} testID="qty-value">{qty}</Text>
            <Pressable testID="qty-plus" style={styles.qtyBtn} onPress={() => setQty((q) => Math.min(20, q + 1))}>
              <Text style={styles.qtyBtnText}>+</Text>
            </Pressable>
          </View>

          <PrimaryButton
            testID="add-to-cart"
            title={`Add to Cart · ${formatPrice(item.price * qty)}`}
            onPress={handleAdd}
            style={{ marginTop: spacing.lg }}
          />
          {added && (
            <View style={styles.addedBox}>
              <Text style={styles.addedText} testID="added-msg">✅ Added {qty} × {item.name} to cart</Text>
              <View style={styles.addedRow}>
                <PrimaryButton title="Continue Shopping" variant="outline" onPress={() => navigation.goBack()} style={{ flex: 1 }} />
                <PrimaryButton title="Go to Cart" onPress={() => navigation.navigate('Cart')} style={{ flex: 1 }} />
              </View>
            </View>
          )}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  hero: { height: 240, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 120 },
  info: { marginTop: spacing.lg },
  cat: { color: colors.muted, textTransform: 'uppercase', fontWeight: '700', fontSize: font.small },
  name: { fontSize: font.heading, fontWeight: '800', color: colors.text },
  price: { fontSize: font.title, color: colors.primary, fontWeight: '800', marginTop: 4 },
  desc: { color: colors.text, marginTop: spacing.sm, lineHeight: 22 },
  prep: { color: colors.muted, marginTop: spacing.sm },
  label: { fontWeight: '700', marginTop: spacing.lg, marginBottom: spacing.sm },
  qtyRow: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  qtyBtnText: { color: '#fff', fontSize: 24, fontWeight: '700', lineHeight: 26 },
  qty: { fontSize: font.title, fontWeight: '800', marginHorizontal: spacing.lg, minWidth: 30, textAlign: 'center' },
  addedBox: { marginTop: spacing.md, padding: spacing.md, backgroundColor: '#E8F7EE', borderRadius: 12 },
  addedText: { color: colors.success, fontWeight: '700', marginBottom: spacing.sm },
  addedRow: { flexDirection: 'row', gap: spacing.sm },
});
