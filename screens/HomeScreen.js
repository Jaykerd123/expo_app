import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, RobotoSlab_600SemiBold } from '@expo-google-fonts/roboto-slab';
import { BlurView } from 'expo-blur';
import { UserContext } from '../UserContext';

const FILTER_TABS = ['All', 'Trending', 'Pets Allowed', 'Beach', 'Forest', 'Lake'];

const CAMPSITES = [
  { id: '1', name: 'Mount Kitanglad Camp', rating: 4.8, fee: 150, image: require('../assets/images/yuru_camp.png') },
  { id: '2', name: 'Kaamulan Nature Park', rating: 4.5, fee: 200, image: require('../assets/images/yuru_camp.png') },
  { id: '3', name: 'Pine Grove Campground', rating: 4.9, fee: 250, image: require('../assets/images/yuru_camp.png') },
];

export default function HomeScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const { user } = useContext(UserContext);
  const [fontsLoaded] = useFonts({ RobotoSlab_600SemiBold });
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('Home');
  const [searchText, setSearchText] = useState('');

  if (!fontsLoaded) return null;

  const navItems = [
    { key: 'Home', icon: 'home-outline', iconActive: 'home' },
    { key: 'Message', icon: 'chatbubbles-outline', iconActive: 'chatbubbles' },
    { key: 'Wishlist', icon: 'heart-outline', iconActive: 'heart' },
    { key: 'Profile', icon: 'person-outline', iconActive: 'person' },
  ];

  const handleNavPress = (key) => {
    setActiveTab(key);
    if (key === 'Profile') navigation.navigate('Profile');
    if (key === 'Message') navigation.navigate('Message');
    if (key === 'Wishlist') navigation.navigate('Wishlist');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.homeIconWrap}>
            <Ionicons name="home" size={24} color="#ffffff" />
          </View>
          <View style={styles.locationWrap}>
            <Text style={styles.country}>Philippines</Text>
            <Text style={styles.city}>Malaybalay City</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={[styles.searchWrap, { width: Math.min(width - 40, 360) }]}>
          <Ionicons name="search" size={20} color="rgba(255,255,255,0.7)" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search camping sites…"
            placeholderTextColor="rgba(255,255,255,0.6)"
            value={searchText}
            onChangeText={setSearchText}
            cursorColor="#ffffff"
          />
        </View>

        {/* Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScroll}
          style={styles.filtersContainer}
        >
          {FILTER_TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              activeOpacity={0.85}
              onPress={() => setActiveFilter(tab)}
              style={[styles.filterTab, activeFilter === tab && styles.filterTabActive]}
            >
              <Text style={[styles.filterText, activeFilter === tab && styles.filterTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Camping Sites List */}
        <Text style={styles.sectionTitle}>Camping Sites</Text>
        {CAMPSITES.map((site) => (
          <TouchableOpacity key={site.id} activeOpacity={0.9} style={[styles.card, { width: Math.min(width - 40, 360) }]}>
            <View style={styles.cardImageWrap}>
              <Image source={site.image} style={styles.cardImage} resizeMode="cover" />
              <View style={styles.cardOverlay} />
              <View style={styles.cardRatingBadge}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.cardRatingText}>{site.rating}</Text>
              </View>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardName} numberOfLines={2}>{site.name}</Text>
              <Text style={styles.cardFee}>₱{site.fee}<Text style={styles.cardFeeSuffix}>/night</Text></Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={[styles.bottomNavWrap, { width: Math.min(width - 32, 400) }]}>
        <BlurView intensity={40} tint="dark" style={styles.bottomNav}>
          {navItems.map((item) => (
            <TouchableOpacity
              key={item.key}
              activeOpacity={0.7}
              onPress={() => handleNavPress(item.key)}
              style={styles.navItem}
            >
              <Ionicons
                name={activeTab === item.key ? item.iconActive : item.icon}
                size={24}
                color={activeTab === item.key ? '#ffffff' : 'rgba(255,255,255,0.5)'}
              />
            </TouchableOpacity>
          ))}
        </BlurView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c111e',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 56,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },
  homeIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationWrap: {
    alignItems: 'flex-end',
  },
  country: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    fontFamily: 'RobotoSlab_600SemiBold',
  },
  city: {
    fontSize: 18,
    color: '#ffffff',
    fontFamily: 'RobotoSlab_600SemiBold',
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: 30,
    backgroundColor: 'transparent',
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'RobotoSlab_600SemiBold',
    paddingVertical: 0,
  },
  filtersContainer: {
    marginBottom: 24,
    maxHeight: 44,
  },
  filtersScroll: {
    paddingRight: 20,
  },
  filterTab: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginRight: 10,
  },
  filterTabActive: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: 'rgba(255,255,255,0.6)',
  },
  filterText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontFamily: 'RobotoSlab_600SemiBold',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  sectionTitle: {
    alignSelf: 'flex-start',
    fontSize: 20,
    color: '#ffffff',
    fontFamily: 'RobotoSlab_600SemiBold',
    marginBottom: 16,
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  cardImageWrap: {
    height: 140,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  cardRatingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  cardRatingText: {
    color: '#FFD700',
    fontSize: 13,
    fontFamily: 'RobotoSlab_600SemiBold',
  },
  cardContent: {
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardName: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'RobotoSlab_600SemiBold',
  },
  cardFee: {
    fontSize: 16,
    color: '#9ec8ff',
    fontFamily: 'RobotoSlab_600SemiBold',
  },
  cardFeeSuffix: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
  bottomNavWrap: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    alignSelf: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 28,
    paddingVertical: 14,
    paddingHorizontal: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    backgroundColor: 'rgba(12,17,30,0.6)',
  },
  navItem: {
    padding: 8,
  },
});
