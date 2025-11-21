import React, { useState, useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { WelcomeScreen } from './../../components/WelcomeScreen';
import { LoginScreen } from './../../components/LoginScreen';
import { SignupScreen } from './../../components/SignupScreen';
import { HomeScreen } from './../../components/HomeScreen';
import { SearchFilterScreen } from './../../components/SearchFilterScreen';
import { UstaProfileScreen } from './../../components/UstaProfileScreen';
import { ChatScreen } from './../../components/ChatScreen';
import { UserDashboard } from './../../components/UserDashboard';
import { UstaDashboard } from './../../components/UstaDashboard';
import { CustomerProfileScreen } from './../../components/CustomerProfileScreen';

type Screen =
  | 'welcome'
  | 'login'
  | 'signup'
  | 'home'
  | 'search'
  | 'ustaProfile'
  | 'chat'
  | 'userDashboard'
  | 'customerProfile'
  | 'ustaDashboard';

type UserRole = 'customer' | 'professional' | null;

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [usrRole, setUserRole] = useState<UserRole>(null);

  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    opacity.setValue(0);
    translateX.setValue(20);
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentScreen]);

  const handleSignup = (role: UserRole) => {
    setUserRole(role);
    if (role === 'professional') {
      setCurrentScreen('ustaDashboard');
    } else {
      setCurrentScreen('home');
    }
  };

  const handleLogin = () => {
    setUserRole('customer');
    setCurrentScreen('home');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return (
          <WelcomeScreen
            onSignup={() => setCurrentScreen('signup')}
            onLogin={() => setCurrentScreen('login')}
          />
        );
      case 'login':
        return (
          <LoginScreen
            onBack={() => setCurrentScreen('welcome')}
            onLogin={handleLogin}
            onSignup={() => setCurrentScreen('signup')}
          />
        );
      case 'signup':
        return (
          <SignupScreen
            onBack={() => setCurrentScreen('welcome')}
            onSignup={handleSignup}
          />
        );
      case 'home':
        return (
          <HomeScreen
            onCategoryClick={() => setCurrentScreen('search')}
            onSearchClick={() => setCurrentScreen('search')}
            onOrdersClick={() => setCurrentScreen('userDashboard')}
            onProfileClick={() => setCurrentScreen('customerProfile')}
            currentTab="home"
          />
        );
      case 'search':
        return (
          <SearchFilterScreen
            onBack={() => setCurrentScreen('home')}
            onSelectUsta={() => setCurrentScreen('ustaProfile')}
            onHomeClick={() => setCurrentScreen('home')}
            onOrdersClick={() => setCurrentScreen('userDashboard')}
            onProfileClick={() => setCurrentScreen('customerProfile')}
          />
        );
      case 'ustaProfile':
        
        return (
          <UstaProfileScreen
            onBack={() => setCurrentScreen('search')}
            onBooking={() => setCurrentScreen('userDashboard')}
            onChat={() => setCurrentScreen('chat')}
          />
        );
      case 'chat':
        return <ChatScreen onBack={() => setCurrentScreen('ustaProfile')} />;
      case 'userDashboard':
        return (
          <UserDashboard
            onBack={() => setCurrentScreen('home')}
            onHomeClick={() => setCurrentScreen('home')}
            onSearchClick={() => setCurrentScreen('search')}
            onProfileClick={() => setCurrentScreen('customerProfile')}
          />
        );
      case 'customerProfile':
        return (
          <CustomerProfileScreen
            onBack={() => setCurrentScreen('home')}
            onHomeClick={() => setCurrentScreen('home')}
            onSearchClick={() => setCurrentScreen('search')}
            onOrdersClick={() => setCurrentScreen('userDashboard')}
            onLogout={() => {
              setUserRole(null);
              setCurrentScreen('welcome');
            }}
          />
        );
      case 'ustaDashboard':
        return <UstaDashboard onBack={() => setCurrentScreen('welcome')} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Animated.View
          style={{
            opacity,
            transform: [{ translateX }],
            flex: 1,
          }}
        >
          {renderScreen()}
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1f2e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#1a1f2e',
    overflow: 'hidden',
  },
});