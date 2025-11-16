import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { BottomNavigation } from '../components/BottomNavigation';


interface UserDashboardProps {
  onBack: () => void;
  onHomeClick: () => void;
  onSearchClick: () => void;
  onProfileClick: () => void;
}

export  function UserDashboard({ onBack, onHomeClick, onSearchClick, onProfileClick }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

  const activeBookings = [
    { 
      id: 1, 
      usta: 'Ahmadjon Karimov', 
      skill: 'Elektrik', 
      date: '2025-11-06', 
      time: '10:00',
      status: 'confirmed',
      location: 'Yunusobod tumani',
      price: '80,000'
    },
    { 
      id: 2, 
      usta: 'Sardor Yusupov', 
      skill: 'Santexnik', 
      date: '2025-11-08', 
      time: '14:00',
      status: 'pending',
      location: 'Mirzo Ulug\'bek tumani',
      price: '70,000'
    },
  ];

  const historyBookings = [
    { 
      id: 3, 
      usta: 'Odiljon Toshmatov', 
      skill: "Bo'yoqchi", 
      date: '2025-10-28', 
      time: '09:00',
      status: 'completed',
      location: 'Chilonzor tumani',
      price: '60,000',
      rated: true
    },
    { 
      id: 4, 
      usta: 'Jasur Abdullayev', 
      skill: 'Konditsioner', 
      date: '2025-10-15', 
      time: '11:00',
      status: 'completed',
      location: 'Shayxontohur tumani',
      price: '90,000',
      rated: false
    },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'confirmed':
        return styles.statusConfirmed;
      case 'pending':
        return styles.statusPending;
      case 'completed':
        return styles.statusCompleted;
      default:
        return styles.statusDefault;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Tasdiqlangan';
      case 'pending':
        return 'Kutilmoqda';
      case 'completed':
        return 'Bajarildi';
      default:
        return status;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={onBack} style={styles.iconButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#9ca3af" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Buyurtmalarim</Text>
        </View>
        {/* Tabs */}
        <View style={styles.tabsRow}>
          <TouchableOpacity
            onPress={() => setActiveTab('active')}
            style={[
              styles.tabButton,
              activeTab === 'active' ? styles.tabActive : styles.tabInactive,
            ]}
          >
            <Text style={[styles.tabText, activeTab === 'active' ? styles.tabTextActive : styles.tabTextInactive]}>
              Faol buyurtmalar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('history')}
            style={[
              styles.tabButton,
              activeTab === 'history' ? styles.tabActive : styles.tabInactive,
            ]}
          >
            <Text style={[styles.tabText, activeTab === 'history' ? styles.tabTextActive : styles.tabTextInactive]}>
              Tarix
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Content */}
      <ScrollView style={styles.content} contentContainerStyle={{paddingBottom: 100}}>
        {activeTab === 'active' ? (
          activeBookings.length > 0 ? (
            activeBookings.map((booking, index) => (
              <MotiView
                key={booking.id}
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: index * 100 }}
                style={styles.bookingCard}
              >
                <View style={styles.bookingHeader}>
                  <View style={styles.bookingHeaderLeft}>
                    <LinearGradient
                      colors={['#3b82f6', '#f59e42']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.avatarCircle}
                    >
                      <Text style={styles.avatarText}>
                        {booking.usta.split(' ').map(n => n[0]).join('')}
                      </Text>
                    </LinearGradient>
                    <View>
                      <Text style={styles.ustaName}>{booking.usta}</Text>
                      <Text style={styles.ustaSkill}>{booking.skill}</Text>
                    </View>
                  </View>
                  <View style={[styles.statusBadge, getStatusStyle(booking.status)]}>
                    <Text style={styles.statusText}>{getStatusText(booking.status)}</Text>
                  </View>
                </View>
                <View style={styles.bookingInfoBlock}>
                  <View style={styles.bookingInfoRow}>
                    <MaterialCommunityIcons name="calendar" size={16} color="#9ca3af" />
                    <Text style={styles.bookingInfoText}>{booking.date} • {booking.time}</Text>
                  </View>
                  <View style={styles.bookingInfoRow}>
                    <MaterialCommunityIcons name="map-marker" size={16} color="#9ca3af" />
                    <Text style={styles.bookingInfoText}>{booking.location}</Text>
                  </View>
                </View>
                <View style={styles.bookingFooter}>
                  <View>
                    <Text style={styles.footerLabel}>Jami narx</Text>
                    <Text style={styles.footerPrice}>{booking.price} so&apos;m</Text>
                  </View>
                  <View style={styles.bookingFooterButtons}>
                    <TouchableOpacity style={styles.cancelButton}>
                      <Text style={styles.cancelButtonText}>Bekor qilish</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.messageButton}>
                      <Text style={styles.messageButtonText}>Xabar yuborish</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </MotiView>
            ))
          ) : (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="clock-outline" size={64} color="#4b5563" style={{marginBottom: 16}} />
              <Text style={styles.emptyText}>Faol buyurtmalar yo&apos;q</Text>
            </View>
          )
        ) : (
          historyBookings.length > 0 ? (
            historyBookings.map((booking, index) => (
              <MotiView
                key={booking.id}
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: index * 100 }}
                style={styles.bookingCard}
              >
                <View style={styles.bookingHeader}>
                  <View style={styles.bookingHeaderLeft}>
                    <LinearGradient
                      colors={['#3b82f6', '#f59e42']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.avatarCircle}
                    >
                      <Text style={styles.avatarText}>
                        {booking.usta.split(' ').map(n => n[0]).join('')}
                      </Text>
                    </LinearGradient>
                    <View>
                      <Text style={styles.ustaName}>{booking.usta}</Text>
                      <Text style={styles.ustaSkill}>{booking.skill}</Text>
                    </View>
                  </View>
                  <MaterialCommunityIcons name="check-circle" size={24} color="#22c55e" />
                </View>
                <View style={styles.bookingInfoBlock}>
                  <View style={styles.bookingInfoRow}>
                    <MaterialCommunityIcons name="calendar" size={16} color="#9ca3af" />
                    <Text style={styles.bookingInfoText}>{booking.date} • {booking.time}</Text>
                  </View>
                  <View style={styles.bookingInfoRow}>
                    <MaterialCommunityIcons name="map-marker" size={16} color="#9ca3af" />
                    <Text style={styles.bookingInfoText}>{booking.location}</Text>
                  </View>
                </View>
                <View style={styles.bookingFooter}>
                  <View>
                    <Text style={styles.footerLabel}>To&apos;langan</Text>
                    <Text style={styles.footerPrice}>{booking.price} so&apos;m</Text>
                  </View>
                  {!(booking?.rated ?? false) && (
                    <TouchableOpacity style={styles.rateButton}>
                      <Text style={styles.rateButtonText}>Baho berish</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </MotiView>
            ))
          ) : (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="check-circle-outline" size={64} color="#4b5563" style={{marginBottom: 16}} />
              <Text style={styles.emptyText}>Tarix bo&apos;sh</Text>
            </View>
          )
        )}
      </ScrollView>
      {/* Bottom Navigation */}
      <BottomNavigation
        currentTab="orders"
        onOrdersClick={() => {}}
        onSearchClick={onSearchClick}
        onHomeClick={onHomeClick}
        onProfileClick={onProfileClick}
      />
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1f2e',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  iconButton: {
    padding: 4,
    borderRadius: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
  },
  tabsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: '#3b82f6',
  },
  tabInactive: {
    backgroundColor: '#252b3b',
    borderWidth: 1,
    borderColor: '#374151',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  tabTextActive: {
    color: 'white',
  },
  tabTextInactive: {
    color: '#9ca3af',
  },
  content: {
    paddingHorizontal: 24,
    flex: 1,
  },
  bookingCard: {
    backgroundColor: '#252b3b',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },
  bookingHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  bookingHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
  ustaName: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  ustaSkill: {
    color: '#9ca3af',
    fontSize: 13,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 72,
  },
  statusConfirmed: {
    borderColor: '#22c55e',
    backgroundColor: 'rgba(34,197,94,0.10)',
  },
  statusPending: {
    borderColor: '#eab308',
    backgroundColor: 'rgba(234,179,8,0.10)',
  },
  statusCompleted: {
    borderColor: '#3b82f6',
    backgroundColor: 'rgba(59,130,246,0.10)',
  },
  statusDefault: {
    borderColor: '#6b7280',
    backgroundColor: 'rgba(107,114,128,0.10)',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  bookingInfoBlock: {
    marginBottom: 16,
    gap: 6,
  },
  bookingInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  bookingInfoText: {
    color: '#9ca3af',
    fontSize: 13,
  },
  bookingFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: '#374151',
    paddingTop: 14,
  },
  footerLabel: {
    color: '#9ca3af',
    fontSize: 13,
  },
  footerPrice: {
    color: '#f59e42',
    fontWeight: '700',
    fontSize: 15,
    marginTop: 2,
  },
  bookingFooterButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  cancelButton: {
    backgroundColor: '#1a1f2e',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  messageButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  rateButton: {
    backgroundColor: '#fde047',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rateButtonText: {
    color: '#18181b',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    justifyContent: 'center',
  },
  emptyText: {
    color: '#9ca3af',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#252b3b',
    borderTopWidth: 1,
    borderColor: '#374151',
    paddingVertical: 8,
    width: windowWidth,
  },
  bottomNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    maxWidth: 500,
    alignSelf: 'center',
  },
  bottomNavBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    flex: 1,
  },
  bottomNavLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
    marginTop: 2,
  },
  profileCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#6b7280',
    marginBottom: 2,
  },
});
