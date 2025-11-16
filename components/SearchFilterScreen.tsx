import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomNavigation } from '../components/BottomNavigation';


interface SearchFilterScreenProps {
  onBack: () => void;
  onSelectUsta: (id: number) => void;
  onHomeClick: () => void;
  onOrdersClick: () => void;
  onProfileClick: () => void;
}

const professionals = [
  { id: 1, name: "Ahmadjon Karimov", skill: "Elektrik", rating: 4.9, reviews: 127, price: "80,000", distance: "2.3 km" },
  { id: 2, name: "Sardor Yusupov", skill: "Santexnik", rating: 4.8, reviews: 98, price: "70,000", distance: "1.8 km" },
  { id: 3, name: "Odiljon Toshmatov", skill: "Bo'yoqchi", rating: 4.7, reviews: 156, price: "60,000", distance: "3.5 km" },
  { id: 4, name: "Bobur Rahimov", skill: "Duradgor", rating: 4.9, reviews: 203, price: "75,000", distance: "0.9 km" },
  { id: 5, name: "Jasur Abdullayev", skill: "Konditsioner", rating: 4.6, reviews: 84, price: "90,000", distance: "4.2 km" },
];

export const SearchFilterScreen: React.FC<SearchFilterScreenProps> = ({
  onBack,
  onSelectUsta,
  onHomeClick,
  onOrdersClick,
  onProfileClick,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('Barchasi');
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [minRating, setMinRating] = useState(0);

  const skills = ['Barchasi', 'Elektrik', 'Santexnik', "Bo'yoqchi", 'Duradgor', 'Konditsioner'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 170 }} 
      >

      
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#9ca3af" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Qidiruv va filtr</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <MaterialIcons name="search" size={20} color="#9ca3af" style={styles.searchIcon} />
            <TextInput
              placeholder="Usta yoki xizmat qidiring..."
              placeholderTextColor="#9ca3af"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchInput}
            />
          </View>
          <TouchableOpacity
            onPress={() => setShowFilters(!showFilters)}
            style={[styles.filterButton, showFilters ? styles.filterButtonActive : null]}
          >
            <MaterialIcons name="tune" size={20} color={showFilters ? '#fff' : '#9ca3af'} />
          </TouchableOpacity>
        </View>

        {/* Filters */}
        {showFilters && (
          <View style={styles.filtersContainer}>
            <Text style={styles.filterLabel}>Xizmat turi</Text>
            <View style={styles.skillsWrapper}>
              {skills.map((skill) => (
                <TouchableOpacity
                  key={skill}
                  onPress={() => setSelectedSkill(skill)}
                  style={[
                    styles.skillButton,
                    selectedSkill === skill ? styles.skillButtonActive : null,
                  ]}
                >
                  <Text
                    style={[
                      styles.skillText,
                      selectedSkill === skill ? styles.skillTextActive : null,
                    ]}
                  >
                    {skill}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.filterLabel}>Minimal reyting</Text>
            <View style={styles.ratingWrapper}>
              {[3, 4, 4.5, 5].map((rating) => (
                <TouchableOpacity
                  key={rating}
                  onPress={() => setMinRating(rating)}
                  style={[
                    styles.ratingButton,
                    minRating === rating ? styles.ratingButtonActive : null,
                  ]}
                >
                  <MaterialCommunityIcons name="star" size={16} color={minRating === rating ? '#fff' : '#9ca3af'} />
                  <Text style={minRating === rating ? styles.ratingTextActive : styles.ratingText}>{rating}+</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.filterLabel}>Narx oralig&apos;i (soat/sum)</Text>
            <View style={styles.priceWrapper}>
              <TextInput
                placeholder="Min"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
                value={priceRange[0].toString()}
                onChangeText={(val) => setPriceRange([+val, priceRange[1]])}
                style={styles.priceInput}
              />
              <TextInput
                placeholder="Max"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
                value={priceRange[1].toString()}
                onChangeText={(val) => setPriceRange([priceRange[0], +val])}
                style={styles.priceInput}
              />
            </View>
          </View>
        )}

        {/* Results */}
        <Text style={styles.resultsText}>{professionals.length} ta usta topildi</Text>
        {professionals.map((usta) => (
          <TouchableOpacity
            key={usta.id}
            onPress={() => onSelectUsta(usta.id)}
            style={styles.ustaCard}
          >
            <View style={styles.ustaAvatar}>
              <Text style={styles.ustaAvatarText}>{usta.name.split(' ').map(n => n[0]).join('')}</Text>
            </View>
            <View style={styles.ustaInfo}>
              <Text style={styles.ustaName}>{usta.name}</Text>
              <Text style={styles.ustaSkill}>{usta.skill}</Text>
              <View style={styles.ustaStats}>
                <View style={styles.ustaRating}>
                  <MaterialCommunityIcons name="star" size={14} color="#facc15" />
                  <Text style={styles.ustaRatingText}>{usta.rating}</Text>
                  <Text style={styles.ustaReviews}>({usta.reviews})</Text>
                </View>
                <View style={styles.ustaDistance}>
                  <MaterialCommunityIcons name="map-marker" size={14} color="#9ca3af" />
                  <Text style={styles.ustaDistanceText}>{usta.distance}</Text>
                </View>
              </View>
            </View>
            <View style={styles.ustaPrice}>
              <Text style={styles.ustaPriceText}>{usta.price}</Text>
              <Text style={styles.ustaPriceUnit}>soat/sum</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Bottom Navigation */}
    
      </ScrollView>
           <BottomNavigation
                currentTab="search"
                onSearchClick={() => {}}
                onOrdersClick={onOrdersClick}
                onHomeClick={onHomeClick}
                onProfileClick={onProfileClick}
              />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1f2e' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, paddingHorizontal: 16, paddingTop: 16 },
  backButton: { marginRight: 8 },
  headerTitle: { fontSize: 20, color: '#fff', fontWeight: 'bold' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, paddingHorizontal: 16 },
  searchInputWrapper: { flex: 1, position: 'relative' },
  searchIcon: { position: 'absolute', left: 12, top: '50%', marginTop: -10 },
  searchInput: { backgroundColor: '#252b3b', borderColor: '#374151', borderWidth: 1, borderRadius: 16, paddingVertical: 12, paddingLeft: 36, paddingRight: 12, color: '#fff' },
  filterButton: { width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#374151' },
  filterButtonActive: { backgroundColor: '#3b82f6' },
  filtersContainer: { paddingHorizontal: 16, paddingBottom: 16 },
  filterLabel: { color: '#9ca3af', marginBottom: 8 },
  skillsWrapper: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
  skillButton: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, backgroundColor: '#252b3b', borderWidth: 1, borderColor: '#374151', marginRight: 8, marginBottom: 8 },
  skillButtonActive: { backgroundColor: '#3b82f6' },
  skillText: { color: '#9ca3af' },
  skillTextActive: { color: '#fff' },
  ratingWrapper: { flexDirection: 'row', marginBottom: 16 },
  ratingButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 6, borderRadius: 12, backgroundColor: '#252b3b', borderWidth: 1, borderColor: '#374151', marginRight: 8 },
  ratingButtonActive: { backgroundColor: '#facc15' },
  ratingText: { color: '#9ca3af', marginLeft: 4 },
  ratingTextActive: { color: '#fff', marginLeft: 4 },
  priceWrapper: { flexDirection: 'row', marginBottom: 16, paddingHorizontal: 16 },
  priceInput: { flex: 1, backgroundColor: '#252b3b', borderWidth: 1, borderColor: '#374151', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 6, color: '#fff', marginRight: 8 },
  resultsText: { color: '#9ca3af', marginVertical: 12, paddingHorizontal: 16 },
  ustaCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#252b3b', borderWidth: 1, borderColor: '#374151', borderRadius: 16, padding: 12, marginHorizontal: 16, marginBottom: 12 },
  ustaAvatar: { width: 64, height: 64, borderRadius: 16, backgroundColor: '#3b82f6', alignItems: 'center', justifyContent: 'center' },
  ustaAvatarText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  ustaInfo: { flex: 1, marginLeft: 12 },
  ustaName: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  ustaSkill: { color: '#9ca3af', fontSize: 14 },
  ustaStats: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  ustaRating: { flexDirection: 'row', alignItems: 'center', marginRight: 12 },
  ustaRatingText: { color: '#fff', fontSize: 12, marginLeft: 4 },
  ustaReviews: { color: '#9ca3af', fontSize: 12, marginLeft: 4 },
  ustaDistance: { flexDirection: 'row', alignItems: 'center' },
  ustaDistanceText: { color: '#9ca3af', fontSize: 12, marginLeft: 4 },
  ustaPrice: { alignItems: 'flex-end' },
  ustaPriceText: { color: '#f97316', fontSize: 14, fontWeight: 'bold' },
  ustaPriceUnit: { color: '#9ca3af', fontSize: 12 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, borderTopWidth: 1, borderColor: '#374151', backgroundColor: '#252b3b', position: 'absolute', bottom: 0, width: '100%' },
  bottomNavButton: { alignItems: 'center', justifyContent: 'center' },
  bottomNavText: { color: '#9ca3af', fontSize: 10, marginTop: 2 },
  profileAvatar: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#9ca3af' },
});
