import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface UstaDashboardProps {
  onBack: () => void;
}

export function UstaDashboard({ onBack }: UstaDashboardProps) {
  const [activeTab, setActiveTab] = useState<'bookings' | 'profile'>('bookings');

  const bookings = [
    { 
      id: 1, 
      client: 'Dilshod Mirzayev', 
      phone: '+998 90 123 45 67',
      service: 'Elektr simlarini almashtirish',
      date: '2025-11-06', 
      time: '10:00',
      status: 'confirmed',
      location: 'Yunusobod tumani',
      price: '80,000'
    },
    { 
      id: 2, 
      client: 'Kamola Akbarova', 
      phone: '+998 91 234 56 78',
      service: 'Rozetkalar o\'rnatish',
      date: '2025-11-08', 
      time: '14:00',
      status: 'pending',
      location: 'Mirzo Ulug\'bek tumani',
      price: '50,000'
    },
  ];

  const stats = [
    { label: 'Kunlik daromad', value: '450,000', icon: 'attach-money', color: ['#22c55e', '#10b981'] }, // from-green-500 to-emerald-500
    { label: 'Bajarilgan', value: '28', icon: 'check-circle', color: ['#3b82f6', '#06b6d4'] }, // from-blue-500 to-cyan-500
    { label: 'Mijozlar', value: '156', icon: 'people', color: ['#8b5cf6', '#ec4899'] }, // from-purple-500 to-pink-500
    { label: 'O\'sish', value: '+23%', icon: 'trending-up', color: ['#f97316', '#ef4444'] }, // from-orange-500 to-red-500
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={onBack} activeOpacity={0.7} style={styles.backButton}>
              <MaterialIcons name="arrow-back" size={24} color="#9ca3af" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Usta paneli</Text>
          </View>
          <LinearGradient
            colors={['#f97316', '#ef4444']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.userIconContainer}
          >
            <MaterialCommunityIcons name="account" size={24} color="#fff" />
          </LinearGradient>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <MotiView
              key={index}
              from={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 100 }}
              style={styles.statCard}
            >
              <LinearGradient
                colors={stat.color as [string, string]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statIconContainer}
              >
                <MaterialIcons name={stat.icon} size={20} color="#fff" />
              </LinearGradient>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
            </MotiView>
          ))}
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setActiveTab('bookings')}
            style={[
              styles.tabButton,
              activeTab === 'bookings' ? styles.tabButtonActive : styles.tabButtonInactive,
            ]}
          >
            <MaterialCommunityIcons name="clipboard-list" size={20} color={activeTab === 'bookings' ? '#fff' : '#9ca3af'} />
            <Text style={[styles.tabButtonText, activeTab === 'bookings' ? styles.tabButtonTextActive : styles.tabButtonTextInactive]}>Buyurtmalarim</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setActiveTab('profile')}
            style={[
              styles.tabButton,
              activeTab === 'profile' ? styles.tabButtonActive : styles.tabButtonInactive,
            ]}
          >
            <MaterialCommunityIcons name="account" size={20} color={activeTab === 'profile' ? '#fff' : '#9ca3af'} />
            <Text style={[styles.tabButtonText, activeTab === 'profile' ? styles.tabButtonTextActive : styles.tabButtonTextInactive]}>Ma&apos;lumotlarim</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {activeTab === 'bookings' ? (
          <View style={{ paddingBottom: 100 }}>
            {bookings.map((booking, index) => (
              <MotiView
                key={booking.id}
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: index * 100 }}
                style={styles.bookingCard}
              >
                <View style={styles.bookingHeader}>
                  <View style={styles.bookingClientInfo}>
                    <LinearGradient
                      colors={['#3b82f6', '#f97316']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.bookingAvatar}
                    >
                      <Text style={styles.bookingAvatarText}>
                        {booking.client.split(' ').map(n => n[0]).join('')}
                      </Text>
                    </LinearGradient>
                    <View>
                      <Text style={styles.bookingClientName}>{booking.client}</Text>
                      <Text style={styles.bookingService}>{booking.service}</Text>
                    </View>
                  </View>
                  {booking.status === 'confirmed' ? (
                    <MaterialIcons name="check-circle" size={20} color="#22c55e" />
                  ) : (
                    <MaterialIcons name="access-time" size={20} color="#eab308" />
                  )}
                </View>

                <View style={styles.bookingDetails}>
                  <View style={styles.bookingDetailRow}>
                    <MaterialIcons name="phone" size={16} color="#9ca3af" />
                    <Text style={styles.bookingDetailText}>{booking.phone}</Text>
                  </View>
                  <View style={styles.bookingDetailRow}>
                    <MaterialIcons name="calendar-today" size={16} color="#9ca3af" />
                    <Text style={styles.bookingDetailText}>{booking.date} • {booking.time}</Text>
                  </View>
                  <View style={styles.bookingDetailRow}>
                    <View style={{ width: 16, height: 16 }} />
                    <Text style={styles.bookingDetailText}>{booking.location}</Text>
                  </View>
                </View>

                <View style={styles.bookingFooter}>
                  <View>
                    <Text style={styles.bookingPriceLabel}>Narx</Text>
                    <Text style={styles.bookingPriceValue}>{booking.price} so&apos;m</Text>
                  </View>
                  <View style={styles.bookingActions}>
                    {booking.status === 'pending' ? (
                      <>
                        <TouchableOpacity activeOpacity={0.7} style={styles.rejectButton}>
                          <Text style={styles.rejectButtonText}>Rad etish</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={styles.acceptButton}>
                          <Text style={styles.acceptButtonText}>Qabul qilish</Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <TouchableOpacity activeOpacity={0.7} style={styles.messageButton}>
                        <Text style={styles.messageButtonText}>Xabar yuborish</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </MotiView>
            ))}
          </View>
        ) : (
          <View style={{ paddingBottom: 100 }}>
            <MotiView
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              style={styles.profileCard}
            >
              <View style={styles.profileHeader}>
                <Text style={styles.profileTitle}>Profil ma&apos;lumotlari</Text>
                <TouchableOpacity activeOpacity={0.7} style={styles.profileSettingsButton}>
                  <MaterialIcons name="settings" size={20} color="#9ca3af" />
                </TouchableOpacity>
              </View>

              <View style={styles.profileFields}>
                <View style={styles.profileField}>
                  <Text style={styles.profileLabel}>Ism</Text>
                  <TextInput
                    value="Ahmadjon Karimov"
                    style={styles.profileInput}
                    editable={false}
                  />
                </View>

                <View style={styles.profileField}>
                  <Text style={styles.profileLabel}>Mutaxassislik</Text>
                  <TextInput
                    value="Elektrik"
                    style={styles.profileInput}
                    editable={false}
                  />
                </View>

                <View style={styles.profileField}>
                  <Text style={styles.profileLabel}>Soatlik narx</Text>
                  <TextInput
                    value="80,000 so'm"
                    style={styles.profileInput}
                  />
                </View>

                <View style={styles.profileField}>
                  <Text style={styles.profileLabel}>Telefon</Text>
                  <TextInput
                    value="+998 90 123 45 67"
                    style={styles.profileInput}
                  />
                </View>

                <View style={styles.profileField}>
                  <Text style={styles.profileLabel}>Manzil</Text>
                  <TextInput
                    value="Toshkent, Yunusobod tumani"
                    style={styles.profileInput}
                  />
                </View>

                <TouchableOpacity activeOpacity={0.7} style={styles.profileUpdateButton}>
                  <Text style={styles.profileUpdateButtonText}>Ma&apos;lumotlarni yangilash</Text>
                </TouchableOpacity>
              </View>
            </MotiView>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1f2e',
    paddingBottom: 20,
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  userIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#252b3b',
    borderColor: '#374151',
    borderWidth: 1,
    borderRadius: 24,
    padding: 16,
    width: '48%',
    marginBottom: 16,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statLabel: {
    color: '#9ca3af',
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  tabButtonActive: {
    backgroundColor: '#f97316',
  },
  tabButtonInactive: {
    backgroundColor: '#252b3b',
    borderColor: '#374151',
    borderWidth: 1,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  tabButtonTextActive: {
    color: 'white',
  },
  tabButtonTextInactive: {
    color: '#9ca3af',
  },
  contentContainer: {
    paddingHorizontal: 24,
  },
  bookingCard: {
    backgroundColor: '#252b3b',
    borderColor: '#374151',
    borderWidth: 1,
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  bookingClientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bookingAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookingAvatarText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
  bookingClientName: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  bookingService: {
    color: '#9ca3af',
    fontSize: 12,
  },
  bookingDetails: {
    marginBottom: 16,
  },
  bookingDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  bookingDetailText: {
    color: '#9ca3af',
    fontSize: 12,
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: '#374151',
    borderTopWidth: 1,
    paddingTop: 16,
  },
  bookingPriceLabel: {
    color: '#9ca3af',
    fontSize: 12,
  },
  bookingPriceValue: {
    color: '#f97316',
    fontSize: 16,
    fontWeight: '600',
  },
  bookingActions: {
    flexDirection: 'row',
    gap: 8,
  },
  rejectButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.125)',
    borderColor: 'rgba(239, 68, 68, 0.188)',
    borderWidth: 1,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rejectButtonText: {
    color: '#ef4444',
    fontSize: 12,
    fontWeight: '600',
  },
  acceptButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#22c55e',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  messageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#3b82f6',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  profileCard: {
    backgroundColor: '#252b3b',
    borderColor: '#374151',
    borderWidth: 1,
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  profileSettingsButton: {
    width: 40,
    height: 40,
    backgroundColor: '#1a1f2e',
    borderColor: '#374151',
    borderWidth: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileFields: {
    gap: 16,
  },
  profileField: {
    gap: 4,
  },
  profileLabel: {
    color: '#9ca3af',
    fontSize: 12,
    marginBottom: 4,
  },
  profileInput: {
    backgroundColor: '#1a1f2e',
    borderColor: '#374151',
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: 'white',
    fontSize: 14,
  },
  profileUpdateButton: {
    marginTop: 24,
    backgroundColor: '#f97316',
    paddingVertical: 16,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileUpdateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
