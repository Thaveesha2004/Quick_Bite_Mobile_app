import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { useCart } from '../context/CartContext';
import { validateLogin } from '../utils/cart';
import PrimaryButton from '../components/PrimaryButton';
import Screen from '../components/Screen';
import { colors, font, spacing } from '../theme';

export default function LoginScreen({ navigation }) {
  const { login } = useCart();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleLogin = () => {
    const result = validateLogin(email, password);
    setErrors(result);
    if (Object.keys(result).length > 0) return;
    const name = email.split('@')[0].replace(/[._]/g, ' ');
    login(name.charAt(0).toUpperCase() + name.slice(1), email.trim());
    navigation.replace('Home');
  };

  const handleGuest = () => {
    login('Guest', null, true);
    navigation.replace('Home');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Screen maxWidth={440}>
        <View style={styles.header}>
          <Text style={styles.logo}>🍔</Text>
          <Text style={styles.title}>Welcome to QuickBite</Text>
          <Text style={styles.sub}>Sign in with your student email</Text>
        </View>

        <Text style={styles.label}>Email</Text>
        <TextInput
          testID="email-input"
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="student@university.edu"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        {errors.email && <Text style={styles.error} testID="email-error">{errors.email}</Text>}

        <Text style={styles.label}>Password</Text>
        <TextInput
          testID="password-input"
          style={[styles.input, errors.password && styles.inputError]}
          placeholder="Minimum 6 characters"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {errors.password && <Text style={styles.error} testID="password-error">{errors.password}</Text>}

        <PrimaryButton testID="login-button" title="Login" onPress={handleLogin} style={{ marginTop: spacing.lg }} />
        <Text style={styles.or}>or</Text>
        <PrimaryButton testID="guest-button" title="Continue as Guest" variant="outline" onPress={handleGuest} />
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', marginTop: spacing.xl, marginBottom: spacing.lg },
  logo: { fontSize: 60 },
  title: { fontSize: font.heading, fontWeight: '800', color: colors.text, textAlign: 'center' },
  sub: { color: colors.muted, marginTop: 4 },
  label: { fontWeight: '600', color: colors.text, marginTop: spacing.md, marginBottom: 6 },
  input: {
    backgroundColor: '#fff', borderWidth: 1, borderColor: colors.border, borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 12, fontSize: font.body,
  },
  inputError: { borderColor: colors.danger },
  error: { color: colors.danger, marginTop: 4, fontSize: font.small },
  or: { textAlign: 'center', color: colors.muted, marginVertical: spacing.sm },
});
