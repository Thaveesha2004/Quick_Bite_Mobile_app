import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { CATEGORIES, CATEGORY_COLORS, MENU_ITEMS } from '../data/menu';
import { useCart } from '../context/CartContext';
import { filterMenu } from '../utils/cart';
import { colors, font, formatPrice, getColumns, spacing } from '../theme';

export default function HomeScreen({ navigation }) {
  const { user, itemCount, subtotal } = useCart();
  const { width } = useWindowDimensions();
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');

  const columns = getColumns(width);
  const items = useMemo(() => filterMenu(MENU_ITEMS, category, query), [category, query]);

  const renderItem = ({ item }) => (
    <Pressable
      testID={`menu-item-${item.id}`}
      style={({ pressed }) => [styles.card, pressed && { transform: [{ scale: 0.97 }] }]}
      onPress={() => navigation.navigate('ItemDetail', { item })}
    >
      <View style={[styles.imageBox, { backgroundColor: CATEGORY_COLORS[item.category] }]}>
        <Text style={styles.emoji}>{item.image}</Text>
      </View>
      <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.cat}>{item.category}</Text>
      <Text style={styles.price}>{formatPrice(item.price)}</Text>
    </Pressable>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.top}>
        <Text style={styles.greeting}>Hi {user?.name ?? 'there'} 👋</Text>
        <Text style={styles.sub}>What would you like today?</Text>
        <TextInput
          testID="search-input"
          style={styles.search}
          placeholder="🔍  Search menu..."
          value={query}
          onChangeText={setQuery}
        />
        <View style={styles.chips}>
          {CATEGORIES.map((c) => (
            <Pressable
              key={c}
              testID={`chip-${c}`}
              onPress={() => setCategory(c)}
              style={[styles.chip, category === c && styles.chipActive]}
            >
              <Text style={[styles.chipText, category === c && { color: '#fff' }]}>{c}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <FlatList
        key={columns} // re-render grid when the column count changes (rotation / tablet)
        data={items}
        numColumns={columns}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        columnWrapperStyle={{ gap: spacing.md }}
        ListEmptyComponent={<Text style={styles.empty}>No items match "{query}"</Text>}
      />

      {itemCount > 0 && (
        <Pressable style={styles.cartBar} onPress={() => navigation.navigate('Cart')} testID="view-cart-bar">
          <Text style={styles.cartBarText}>{itemCount} item{itemCount > 1 ? 's' : ''} · {formatPrice(subtotal)}</Text>
          <Text style={styles.cartBarText}>View Cart →</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  top: { padding: spacing.md, paddingBottom: spacing.sm },
  greeting: { fontSize: font.title, fontWeight: '800', color: colors.text },
  sub: { color: colors.muted, marginBottom: spacing.sm },
  search: {
    backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: 14, paddingVertical: 10, fontSize: font.body,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.sm },
  chip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: '#fff', borderWidth: 1, borderColor: colors.border },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontWeight: '600', color: colors.text },
  list: { padding: spacing.md, paddingBottom: 100, gap: spacing.md },
  card: {
    flex: 1, backgroundColor: colors.card, borderRadius: 16, padding: spacing.sm,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 3,
  },
  imageBox: { height: 110, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 56 },
  name: { fontWeight: '700', fontSize: font.body, marginTop: spacing.sm, color: colors.text },
  cat: { color: colors.muted, fontSize: font.small },
  price: { color: colors.primary, fontWeight: '800', marginTop: 4 },
  empty: { textAlign: 'center', color: colors.muted, marginTop: spacing.xl },
  cartBar: {
    position: 'absolute', left: spacing.md, right: spacing.md, bottom: spacing.md,
    backgroundColor: colors.primary, borderRadius: 14, padding: spacing.md,
    flexDirection: 'row', justifyContent: 'space-between', elevation: 6,
  },
  cartBarText: { color: '#fff', fontWeight: '700', fontSize: font.body },
});
