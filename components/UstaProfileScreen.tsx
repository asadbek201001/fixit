import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Pressable } from 'react-native';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Star, MapPin, Clock, Award, MessageCircle } from 'react-native-feather';

interface UstaProfileScreenProps {
  usta: {
    name: string;
    profession: string;
    location?: string;
    rating: number;
    reviews: number;
    experience: string;
    projects: string;
    skills: string[];
    price: string;
    reviewList: { name: string; rating: number; comment: string; date: string }[];
  };
  onBack: () => void;
  onBooking: () => void;
  onChat: () => void;
} 

export function UstaProfileScreen({ usta, onBack, onBooking, onChat }: UstaProfileScreenProps) {
  return (
    <View style={styles.container}>
      {/* Header with Image */}
      <LinearGradient colors={['#3b82f6', '#f97316']} style={styles.header}>
        <View style={styles.headerTop}>
          <Pressable onPress={onBack} style={styles.iconButton}>
            <MotiView
              from={{ scale: 1 }}
              animate={{ scale: 1 }}
              style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
            >
              <ArrowLeft width={20} height={20} stroke="white" />
            </MotiView>
          </Pressable>
          <Pressable onPress={() => {}} style={styles.iconButton}>
            <MotiView
              from={{ scale: 1 }}
              animate={{ scale: 1 }}
              style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
            >
              <Star width={20} height={20} stroke="white" />
            </MotiView>
          </Pressable>
        </View>

        <View style={styles.avatarWrapper}>
          <LinearGradient colors={['#3b82f6', '#f97316']} style={styles.avatar}>
            <Text style={styles.avatarText}>{usta.name.split(' ').map(n => n[0]).join('')}</Text>
          </LinearGradient>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{usta.name}</Text>
          <Text style={styles.profession}>{usta.profession}</Text>
          <View style={styles.ratingRow}>
            <View style={styles.rating}>
              <Star width={16} height={16} stroke="#facc15" />
              <Text style={styles.ratingValue}>{usta.rating}</Text>
              <Text style={styles.ratingCount}>({usta.reviews} baho)</Text>
            </View>
          </View>
          <View style={styles.locationRow}>
            <MapPin width={14} height={14} stroke="#9ca3af" />
            <Text style={styles.locationText}>{usta.location || 'Toshkent'}</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Clock width={24} height={24} stroke="#3b82f6" />
            <Text style={styles.statLabel}>Tajriba</Text>
            <Text style={styles.statValue}>{usta.experience}</Text>
          </View>
          <View style={styles.statBox}>
            <Award width={24} height={24} stroke="#f97316" />
            <Text style={styles.statLabel}>Loyihalar</Text>
            <Text style={styles.statValue}>{usta.projects}</Text>
          </View>
          <View style={styles.statBox}>
            <Star width={24} height={24} stroke="#facc15" />
            <Text style={styles.statLabel}>Reyting</Text>
            <Text style={styles.statValue}>Top 5%</Text>
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ma&apos;lumot</Text>
          <Text style={styles.sectionText}>
            {usta.profession} sifatida professional tajribaga ega. Uy va ofis ishlarini sifatli bajaradi. Mijoz mamnunligiga kafolat beradi.
          </Text>
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ko&apos;nikmalar</Text>
          <View style={styles.skillsRow}>
            {usta.skills.map((skill) => (
              <View key={skill} style={styles.skillBox}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Reviews */}
        <View style={styles.section}>
          <View style={styles.reviewsHeader}>
            <Text style={styles.sectionTitle}>Fikrlar</Text>
            <TouchableOpacity>
              <Text style={styles.showAll}>Barchasi</Text>
            </TouchableOpacity>
          </View>
          {usta.reviewList.map((review, index) => (
            <View key={index} style={styles.reviewBox}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewName}>{review.name}</Text>
                <Text style={styles.reviewDate}>{review.date}</Text>
              </View>
              <View style={styles.reviewRating}>
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} width={16} height={16} stroke="#facc15" />
                ))}
              </View>
              <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomBar}>
        <View style={styles.priceBox}>
          <Text style={styles.price}>{usta.price}</Text>
          <Text style={styles.priceUnit}>soat/sum</Text>
        </View>
        <View style={styles.actionsRow}>
          <Pressable onPress={onChat} style={styles.chatButton}>
            <MotiView
              from={{ scale: 1 }}
              animate={{ scale: 1 }}
              style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
            >
              <MessageCircle width={24} height={24} stroke="#3b82f6" />
            </MotiView>
          </Pressable>
          <Pressable onPress={onBooking} style={styles.bookingButton}>
            <MotiView
              from={{ scale: 1 }}
              animate={{ scale: 1 }}
              style={{ justifyContent: 'center', alignItems: 'center', flex: 1, width: '100%' }}
            >
              <Text style={styles.bookingText}>Buyurtma berish</Text>
            </MotiView>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

// Styles shu yerda siz ilgari bergan stylelarni ishlatish mumkin
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1f2e' },
  header: { height: 160, justifyContent: 'flex-start', paddingTop: 24, paddingHorizontal: 16, position: 'relative' },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', zIndex: 10 },
  iconButton: { width: 40, height: 40, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  avatarWrapper: { position: 'absolute', bottom: -40, left: (windowWidth - 128) / 2, width: 128, height: 128, borderRadius: 24, borderWidth: 4, borderColor: '#1a1f2e', overflow: 'hidden', justifyContent: 'center', alignItems: 'center' },
  avatar: { flex: 1, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: 'white', fontSize: 48, fontWeight: '700' },
  content: { paddingTop: 56, paddingHorizontal: 24, paddingBottom: 96 },
  profileInfo: { alignItems: 'center', marginBottom: 24 },
  name: { fontSize: 24, fontWeight: '700', color: 'white', marginBottom: 4 },
  profession: { fontSize: 14, color: '#9ca3af', marginBottom: 12 },
  ratingRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 8 },
  rating: { flexDirection: 'row', alignItems: 'center', marginRight: 4 },
  ratingValue: { color: 'white', fontWeight: '600', marginLeft: 4 },
  ratingCount: { color: '#6b7280', marginLeft: 4 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  locationText: { color: '#9ca3af', fontSize: 14, marginLeft: 4 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  statBox: { backgroundColor: '#252b3b', borderRadius: 16, borderWidth: 1, borderColor: '#374151', paddingVertical: 16, paddingHorizontal: 12, alignItems: 'center', flex: 1, marginHorizontal: 4 },
  statLabel: { color: '#9ca3af', fontSize: 12, marginTop: 6, marginBottom: 2 },
  statValue: { color: 'white', fontWeight: '700', fontSize: 16 },
  section: { marginBottom: 24 },
  sectionTitle: { color: 'white', fontSize: 18, fontWeight: '700', marginBottom: 12 },
  sectionText: { color: '#9ca3af', fontSize: 14, lineHeight: 20 },
  skillsRow: { flexDirection: 'row', flexWrap: 'wrap', marginRight: -8 },
  skillBox: { backgroundColor: '#252b3b', borderRadius: 24, borderWidth: 1, borderColor: '#374151', paddingVertical: 8, paddingHorizontal: 16, marginRight: 8, marginBottom: 8 },
  skillText: { color: 'white', fontSize: 14 },
  reviewsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  showAll: { color: '#3b82f6', fontSize: 14 },
  reviewBox: { backgroundColor: '#252b3b', borderRadius: 16, borderWidth: 1, borderColor: '#374151', padding: 16, marginBottom: 12 },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  reviewName: { color: 'white', fontWeight: '700', fontSize: 14 },
  reviewDate: { color: '#6b7280', fontSize: 12 },
  reviewRating: { flexDirection: 'row', marginBottom: 8 },
  reviewComment: { color: '#9ca3af', fontSize: 14 },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#252b3b', borderTopWidth: 1, borderTopColor: '#374151', paddingVertical: 16, paddingHorizontal: 24, flexDirection: 'row', alignItems: 'center' },
  priceBox: { marginRight: 16, alignItems: 'center' },
  price: { color: '#f97316', fontSize: 24, fontWeight: '700' },
  priceUnit: { color: '#9ca3af', fontSize: 12 },
  actionsRow: { flex: 1, flexDirection: 'row', marginLeft: -12 },
  chatButton: { width: 56, height: 56, backgroundColor: '#1a1f2e', borderRadius: 16, borderWidth: 1, borderColor: '#374151', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  bookingButton: { flex: 1, backgroundColor: '#3b82f6', borderRadius: 16, justifyContent: 'center', alignItems: 'center', paddingVertical: 14 },
  bookingText: { color: 'white', fontSize: 16, fontWeight: '700' },
});
