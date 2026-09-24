import { ScrollView, StyleSheet, View } from 'react-native';
import { spacing } from '../theme';

// Centres content and caps its width so layouts look good on tablets too.
export default function Screen({ children, scroll = true, maxWidth = 720 }) {
  const inner = <View style={[styles.inner, { maxWidth }]}>{children}</View>;
  return scroll ? (
    <ScrollView contentContainerStyle={styles.container}>{inner}</ScrollView>
  ) : (
    <View style={[styles.container, { flex: 1 }]}>{inner}</View>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.md, alignItems: 'center', flexGrow: 1 },
  inner: { width: '100%' },
});
