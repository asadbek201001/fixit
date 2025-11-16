import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Zap, Wrench, Droplet, PaintBucket, Hammer, Wind, Home as HomeIcon } from 'lucide-react-native';
import { BottomNavigation } from '../components/BottomNavigation';

interface HomeScreenProps {
  onCategoryClick: (category: string) => void;
  onSearchClick: () => void;
  onOrdersClick: () => void;
  onProfileClick: () => void;
  currentTab?: 'home' | 'search' | 'orders' | 'profile';
}

const categories = [
  { id: 'elektrik', name: 'Elektrik', icon: Zap, color: '#FBBF24' },
  { id: 'santexnik', name: 'Santexnik', icon: Droplet, color: '#3B82F6' },
  { id: 'boyoqchi', name: "Bo'yoqchi", icon: PaintBucket, color: '#A855F7' },
  { id: 'duradgor', name: 'Duradgor', icon: Hammer, color: '#F59E0B' },
  { id: 'konditsioner', name: 'Konditsioner', icon: Wind, color: '#14B8A6' },
  { id: 'ta-mirlash', name: "Ta'mirlash", icon: Wrench, color: '#6B7280' },
];

export function HomeScreen({
  onCategoryClick,
  onSearchClick,
  onOrdersClick,
  onProfileClick,
  currentTab = 'home',
}: HomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Assalomu alaykum,</Text>
            <Text style={styles.username}>Aziz foydalanuvchi</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AF</Text>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Xizmatlar</Text>
            <TouchableOpacity>
              <Text style={styles.linkText}>Barchasi</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.categories}>
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <TouchableOpacity
                  key={category.id}
                  style={[styles.categoryButton, { backgroundColor: '#252b3b' }]}
                  onPress={() => onCategoryClick(category.id)}
                >
                  <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                    <Icon color="#fff" size={28} />
                  </View>
                  <Text style={styles.categoryText}>{category.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Popular Professionals */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mashhur ustalar</Text>
            <TouchableOpacity>
              <Text style={styles.linkText}>Barchasi</Text>
            </TouchableOpacity>
          </View>
          {[
            { name: "Ahmadjon Karimov", skill: "Elektrik", rating: 4.9, reviews: 127, price: "80,000" },
            { name: "Sardor Yusupov", skill: "Santexnik", rating: 4.8, reviews: 98, price: "70,000" },
            { name: "Odiljon Toshmatov", skill: "Bo'yoqchi", rating: 4.7, reviews: 156, price: "60,000" },
          ].map((usta, index) => (
            <TouchableOpacity key={index} style={styles.ustaCard}>
              <View style={styles.ustaAvatar}>
                <Text style={styles.avatarText}>{usta.name.split(' ').map(n => n[0]).join('')}</Text>
              </View>
              <View style={styles.ustaInfo}>
                <Text style={styles.ustaName}>{usta.name}</Text>
                <Text style={styles.ustaSkill}>{usta.skill}</Text>
                <View style={styles.ustaRating}>
                  <Text style={styles.star}>★</Text>
                  <Text style={styles.rating}>{usta.rating}</Text>
                  <Text style={styles.dot}>•</Text>
                  <Text style={styles.reviews}>{usta.reviews} baho</Text>
                </View>
              </View>
              <View style={styles.ustaPrice}>
                <Text style={styles.price}>{usta.price}</Text>
                <Text style={styles.priceUnit}>soat/sum</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
     <BottomNavigation
  currentTab="home"
  onHomeClick={() => {}}
  onSearchClick={onSearchClick}
  onOrdersClick={onOrdersClick}
  onProfileClick={onProfileClick}
/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1f2e' },
  scrollContainer: { paddingBottom: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  greeting: { color: '#9CA3AF', fontSize: 14, marginBottom: 4 },
  username: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#3B82F6', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#fff', fontWeight: 'bold' },
  section: { marginVertical: 16, paddingHorizontal: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  sectionTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  linkText: { color: '#3B82F6', fontSize: 14 },
  categories: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  categoryButton: { width: '48%', padding: 16, borderRadius: 16, marginBottom: 16, alignItems: 'center' },
  categoryIcon: { width: 56, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  categoryText: { color: '#fff', marginTop: 8 },
  ustaCard: { flexDirection: 'row', backgroundColor: '#252b3b', borderRadius: 16, padding: 16, marginBottom: 12, alignItems: 'center' },
  ustaAvatar: { width: 64, height: 64, borderRadius: 16, backgroundColor: '#3B82F6', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  ustaInfo: { flex: 1 },
  ustaName: { color: '#fff', fontWeight: 'bold' },
  ustaSkill: { color: '#9CA3AF', fontSize: 12 },
  ustaRating: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  star: { color: '#FACC15', fontSize: 12 },
  rating: { color: '#fff', fontSize: 12, marginLeft: 2 },
  dot: { color: '#6B7280', fontSize: 12, marginHorizontal: 4 },
  reviews: { color: '#9CA3AF', fontSize: 12 },
  ustaPrice: { alignItems: 'flex-end' },
  price: { color: '#F97316', fontWeight: 'bold' },
  priceUnit: { color: '#9CA3AF', fontSize: 12 },
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 12, backgroundColor: '#252b3b' },
  navButton: { alignItems: 'center' },
  navButtonActive: {},
  navText: { color: '#9CA3AF', fontSize: 12 },
  navTextActive: { color: '#3B82F6' },
  profileIcon: { width: 24, height: 24, borderRadius: 12, marginBottom: 2 },
});
