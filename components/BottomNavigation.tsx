import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Home as HomeIcon, Search, Wrench } from 'lucide-react-native';

interface BottomNavigationProps {
  currentTab: 'home' | 'search' | 'orders' | 'profile';
  onHomeClick?: () => void;
  onSearchClick?: () => void;
  onOrdersClick?: () => void;
  onProfileClick?: () => void;
}

export function BottomNavigation({
  currentTab,
  onHomeClick,
  onSearchClick,
  onOrdersClick,
  onProfileClick,
}: BottomNavigationProps) {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={[styles.navButton, currentTab === 'home' && styles.navButtonActive]}
        onPress={onHomeClick}
      >
        <HomeIcon size={24} color={currentTab === 'home' ? '#3B82F6' : '#9CA3AF'} />
        <Text style={[styles.navText, currentTab === 'home' && styles.navTextActive]}>Bosh sahifa</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navButton, currentTab === 'search' && styles.navButtonActive]}
        onPress={onSearchClick}
      >
        <Search size={24} color={currentTab === 'search' ? '#3B82F6' : '#9CA3AF'} />
        <Text style={[styles.navText, currentTab === 'search' && styles.navTextActive]}>Qidiruv</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navButton, currentTab === 'orders' && styles.navButtonActive]}
        onPress={onOrdersClick}
      >
        <Wrench size={24} color={currentTab === 'orders' ? '#3B82F6' : '#9CA3AF'} />
        <Text style={[styles.navText, currentTab === 'orders' && styles.navTextActive]}>Buyurtmalar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navButton, currentTab === 'profile' && styles.navButtonActive]}
        onPress={onProfileClick}
      >
        <View style={[styles.profileIcon, currentTab === 'profile' ? { backgroundColor: '#3B82F6' } : { backgroundColor: '#9CA3AF' }]} />
        <Text style={[styles.navText, currentTab === 'profile' && styles.navTextActive]}>Profil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 12, backgroundColor: '#252b3b' },
  navButton: { alignItems: 'center' },
  navButtonActive: {},
  navText: { color: '#9CA3AF', fontSize: 12 },
  navTextActive: { color: '#3B82F6' },
  profileIcon: { width: 24, height: 24, borderRadius: 12, marginBottom: 2 },
});
