import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, font } from '../theme';

export default function PrimaryButton({ title, onPress, variant = 'solid', disabled, style, testID }) {
  const outline = variant === 'outline';
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.btn,
        outline ? styles.outline : styles.solid,
        disabled && styles.disabled,
        pressed && { opacity: 0.8 },
        style,
      ]}
    >
      <Text style={[styles.text, outline && { color: colors.primary }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { paddingVertical: 14, paddingHorizontal: 20, borderRadius: 12, alignItems: 'center' },
  solid: { backgroundColor: colors.primary },
  outline: { borderWidth: 2, borderColor: colors.primary, backgroundColor: 'transparent' },
  disabled: { backgroundColor: '#C9C9C9' },
  text: { color: '#fff', fontWeight: '700', fontSize: font.body },
});
