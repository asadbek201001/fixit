// WelcomeScreen.tsx
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { Wrench } from 'lucide-react-native';
import { Easing } from 'react-native-reanimated';

interface WelcomeScreenProps {
  onSignup: () => void;
  onLogin: () => void;
}

export function WelcomeScreen({ onSignup, onLogin }: WelcomeScreenProps) {
  return (
    <View style={styles.container}>
      {/* Icon */}
      <MotiView
        from={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'timing', duration: 600, easing: Easing.out(Easing.ease) }}
        style={styles.iconWrapper}
      >
        <LinearGradient
          colors={['#3b82f6', '#f97316']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.iconBackground}
        >
          <Wrench color="white" width={48} height={48} />
        </LinearGradient>
      </MotiView>

      {/* Title */}
      <MotiView
        from={{ translateY: 20, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ delay: 200, type: 'timing', duration: 600 }}
      >
        <Text style={styles.title}>FixIt</Text>
      </MotiView>

      {/* Subtitle */}
      <MotiView
        from={{ translateY: 20, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ delay: 400, type: 'timing', duration: 600 }}
      >
        <Text style={styles.subtitle}>Ishonchli ustalarni yaqin atrofingizdan toping</Text>
      </MotiView>

      {/* Buttons */}
      <MotiView
        from={{ translateY: 20, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ delay: 600, type: 'timing', duration: 600 }}
        style={styles.buttonsContainer}
      >
        <Pressable style={styles.primaryButton} onPress={onSignup}>
          <Text style={styles.primaryButtonText}>Boshlash</Text>
        </Pressable>

        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>yoki</Text>
          <View style={styles.separatorLine} />
        </View>

        <Pressable style={styles.secondaryButton} onPress={onLogin}>
          <Text style={styles.secondaryButtonText}>Akkauntga kirish</Text>
        </Pressable>
      </MotiView>

      {/* Pagination dots */}
      <View style={styles.pagination}>
        {[0, 1, 2].map((i) => (
          <MotiView
            key={i}
            from={{ opacity: 0 }}
            animate={{ opacity: i === 0 ? 1 : 0.3 }}
            style={styles.paginationDot}
          />
        ))}
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1419',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    marginBottom: 32,
  },
  iconBackground: {
    width: 96,
    height: 96,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    color: '#9ca3af',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 48,
    maxWidth: 280,
  },
  buttonsContainer: {
    width: '100%',
    maxWidth: 320,
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#374151',
  },
  separatorText: {
    color: '#6b7280',
    fontSize: 14,
    marginHorizontal: 12,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#374151',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#d1d5db',
    fontSize: 16,
    fontWeight: '600',
  },
  pagination: {
    marginTop: 48,
    flexDirection: 'row',
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3b82f6',
    marginHorizontal: 4,
  },
});
