import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { colors, font } from '../theme';

export default function SplashScreen({ navigation }) {
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 700, useNativeDriver: false }).start();
    const t = setTimeout(() => navigation.replace('Login'), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fade, alignItems: 'center' }}>
        <Text style={styles.logo}>🍔</Text>
        <Text style={styles.title}>QuickBite</Text>
        <Text style={styles.tag}>Skip the queue. Order ahead.</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  logo: { fontSize: 90 },
  title: { fontSize: font.hero, fontWeight: '900', color: '#fff', marginTop: 8 },
  tag: { fontSize: font.body, color: '#FFE3CC', marginTop: 6 },
});
