import React, { useState, useRef, useContext } from 'react';
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
  { id: '1', name: 'Mount Kitanglad Camp', rating: 4.8, fee: 150, image: require('../assets/images/mt_kitanglad.jpg') },
  { id: '2', name: 'Kaamulan Nature Park', rating: 4.5, fee: 200, image: require('../assets/images/kaamulan_park.jpg') },
  { id: '3', name: 'Pine Grove Campground', rating: 4.9, fee: 250, image: require('../assets/images/pinegrove.jpg') },
  { id: '4', name: 'Lake Apo Viewpoint', rating: 4.7, fee: 180, image: require('../assets/images/lake_apo.jpg') },
];
const CONVERSATIONS = [
  { id: '1', name: 'Camp Admin', preview: 'Your booking for Mount Kitanglad is confirmed!', time: '2m', unread: true },
  { id: '2', name: 'Sarah M.', preview: 'See you at the campsite this weekend 🏕️', time: '1h', unread: false },
  { id: '3', name: 'Marcus L.', preview: 'Thanks for the recommendation!', time: '3h', unread: false },
  { id: '4', name: 'Camp Support', preview: 'Weather update: Clear skies ahead', time: 'Yesterday', unread: false },
];
const WISHLIST_ITEMS = [
  { id: '1', name: 'Mount Kitanglad Camp', rating: 4.8, fee: 150, image: require('../assets/images/mt_kitanglad.jpg') },
  { id: '2', name: 'Kaamulan Nature Park', rating: 4.5, fee: 200, image: require('../assets/images/kaamulan_park.jpg') },
  { id: '3', name: 'Pine Grove Campground', rating: 4.9, fee: 250, image: require('../assets/images/pinegrove.jpg') },
  { id: '4', name: 'Lake Apo Viewpoint', rating: 4.7, fee: 180, image: require('../assets/images/lake_apo.jpg') },
];

const NAV_ITEMS = [
  { key: 'Home', icon: 'home-outline', iconActive: 'home' },
  { key: 'Message', icon: 'chatbubbles-outline', iconActive: 'chatbubbles' },
  { key: 'Wishlist', icon: 'heart-outline', iconActive: 'heart' },
  { key: 'Profile', icon: 'person-outline', iconActive: 'person' },
];

export default function MainScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const { user, logout } = useContext(UserContext);
  const scrollRef = useRef(null);
  const [fontsLoaded] = useFonts({ RobotoSlab_600SemiBold });
  const [activeTab, setActiveTab] = useState(0);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [messageSearch, setMessageSearch] = useState('');

  if (!fontsLoaded) return null;

  const handleNavPress = (index) => {
    setActiveTab(index);
    scrollRef.current?.scrollTo({ x: index * width, animated: true });
  };

  const handleScrollEnd = (e) => {
    const offset = e.nativeEvent.contentOffset.x;
    const index = Math.round(offset / width);
    if (index >= 0 && index <= 3) setActiveTab(index);
  };

  const handleLogout = () => {
    logout();
    navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
  };

  const renderHomeSection = () => (
    <ScrollView style={styles.sectionScroll} contentContainerStyle={[styles.sectionContent, { paddingBottom: 120 }]} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.homeIconWrap}>
          <Ionicons name="home" size={24} color="#ffffff" />
        </View>
        <View style={styles.locationWrap}>
          <Text style={styles.country}>Philippines</Text>
          <Text style={styles.city}>Malaybalay City</Text>
        </View>
      </View>
      <View style={[styles.searchWrap, { width: Math.min(width - 40, 360) }]}>
        <Ionicons name="search" size={20} color="rgba(255,255,255,0.7)" style={styles.searchIcon} />
        <TextInput style={styles.searchInput} placeholder="Search camping sites…" placeholderTextColor="rgba(255,255,255,0.6)" value={searchText} onChangeText={setSearchText} cursorColor="#ffffff" />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScroll} style={styles.filtersContainer}>
        {FILTER_TABS.map((tab) => (
          <TouchableOpacity key={tab} activeOpacity={0.85} onPress={() => setActiveFilter(tab)} style={[styles.filterTab, activeFilter === tab && styles.filterTabActive]}>
            <Text style={[styles.filterText, activeFilter === tab && styles.filterTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    </ScrollView>
  );

  const renderMessageSection = () => (
    <ScrollView style={styles.sectionScroll} contentContainerStyle={[styles.sectionContent, { paddingBottom: 120 }]} showsVerticalScrollIndicator={false}>
      <View style={styles.messageHeader}>
        <Text style={styles.messageTitle}>Messages</Text>
        <TouchableOpacity style={styles.composeBtn}>
          <Ionicons name="create-outline" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
      <View style={[styles.searchWrap, { width: Math.min(width - 40, 360) }]}>
        <Ionicons name="search" size={20} color="rgba(255,255,255,0.7)" style={styles.searchIcon} />
        <TextInput style={styles.searchInput} placeholder="Search conversations…" placeholderTextColor="rgba(255,255,255,0.6)" value={messageSearch} onChangeText={setMessageSearch} cursorColor="#ffffff" />
      </View>
      <View style={styles.listWrap}>
        {CONVERSATIONS.map((conv) => (
          <TouchableOpacity key={conv.id} activeOpacity={0.85} style={[styles.convCard, { width: Math.min(width - 40, 360) }]}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{conv.name.charAt(0)}</Text>
            </View>
            <View style={styles.convContent}>
              <View style={styles.convTop}>
                <Text style={styles.convName} numberOfLines={1}>{conv.name}</Text>
                <Text style={styles.convTime}>{conv.time}</Text>
              </View>
              <Text style={[styles.convPreview, conv.unread && styles.convPreviewUnread]} numberOfLines={2}>{conv.preview}</Text>
              {conv.unread && <View style={styles.unreadDot} />}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );

  const renderWishlistSection = () => (
    <ScrollView style={styles.sectionScroll} contentContainerStyle={[styles.sectionContent, { paddingBottom: 120 }]} showsVerticalScrollIndicator={false}>
      <View style={styles.wishlistHeader}>
        <Text style={styles.messageTitle}>My Wishlist</Text>
      </View>
      <Text style={styles.subtitle}>{WISHLIST_ITEMS.length} camping site{WISHLIST_ITEMS.length !== 1 ? 's' : ''} saved</Text>
      <View style={styles.listWrap}>
        {WISHLIST_ITEMS.map((site) => (
          <TouchableOpacity key={site.id} activeOpacity={0.9} style={[styles.card, { width: Math.min(width - 40, 360) }]}>
            <View style={styles.cardImageWrap}>
              <Image source={site.image} style={styles.cardImage} resizeMode="cover" />
              <View style={styles.cardOverlay} />
              <TouchableOpacity style={styles.heartBtn} activeOpacity={0.8}>
                <Ionicons name="heart" size={24} color="#ff6b8a" />
              </TouchableOpacity>
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
      </View>
    </ScrollView>
  );

  const renderProfileSection = () => (
    <ScrollView style={styles.sectionScroll} contentContainerStyle={[styles.sectionContent, { paddingBottom: 120 }]} showsVerticalScrollIndicator={false}>
      <Text style={styles.profileTitle}>Profile ⛺</Text>
      <View style={styles.avatarRow}>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileAvatarText}>{(user?.name || 'U').charAt(0)}</Text>
        </View>
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.profileName}>{user?.name || 'Guest User'}</Text>
          <Text style={styles.profileSmall}>Camp Enthusiast • Member</Text>
        </View>
      </View>
      <View style={styles.profileInfoCard}>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Member Since:</Text>
          <Text style={styles.profileValue}>2023</Text>
        </View>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Email:</Text>
          <Text style={styles.profileValue}>you@example.com</Text>
        </View>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Favorite:</Text>
          <Text style={styles.profileValue}>Tent Camping</Text>
        </View>
      </View>
      <Text style={styles.profileSectionTitle}>Badges</Text>
      <View style={styles.badgesRow}>
        <Text style={styles.badge}>🏕️ Camp Starter</Text>
        <Text style={styles.badge}>🔥 Campfire Cook</Text>
        <Text style={styles.badge}>🌲 Trail Blazer</Text>
      </View>
      <TouchableOpacity style={styles.profileButton} onPress={() => {}}>
        <Text style={styles.profileButtonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.profileButton, styles.logoutButton]} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const sections = [renderHomeSection, renderMessageSection, renderWishlistSection, renderProfileSection];

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
        decelerationRate="fast"
      >
        {[0, 1, 2, 3].map((i) => (
          <View key={i} style={[styles.page, { width }]}>
            {sections[i]()}
          </View>
        ))}
      </ScrollView>

      <View style={[styles.bottomNavWrap, { width: Math.min(width - 32, 400) }]}>
        <BlurView intensity={40} tint="dark" style={styles.bottomNav}>
          {NAV_ITEMS.map((item, index) => (
            <TouchableOpacity key={item.key} activeOpacity={0.7} onPress={() => handleNavPress(index)} style={styles.navItem}>
              <Ionicons name={activeTab === index ? item.iconActive : item.icon} size={24} color={activeTab === index ? '#ffffff' : 'rgba(255,255,255,0.5)'} />
            </TouchableOpacity>
          ))}
        </BlurView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0c111e' },
  page: { flex: 1 },
  sectionScroll: { flex: 1 },
  sectionContent: { paddingHorizontal: 20, paddingTop: 56, alignItems: 'center' },
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
  locationWrap: { alignItems: 'flex-end' },
  country: { fontSize: 12, color: 'rgba(255,255,255,0.6)', fontFamily: 'RobotoSlab_600SemiBold' },
  city: { fontSize: 18, color: '#ffffff', fontFamily: 'RobotoSlab_600SemiBold' },
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
  searchIcon: { marginRight: 12 },
  searchInput: { flex: 1, color: '#ffffff', fontSize: 16, fontFamily: 'RobotoSlab_600SemiBold', paddingVertical: 0 },
  filtersContainer: { marginBottom: 24, maxHeight: 44 },
  filtersScroll: { paddingRight: 20 },
  filterTab: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginRight: 10,
  },
  filterTabActive: { backgroundColor: 'rgba(255,255,255,0.2)', borderColor: 'rgba(255,255,255,0.6)' },
  filterText: { color: 'rgba(255,255,255,0.8)', fontSize: 14, fontFamily: 'RobotoSlab_600SemiBold' },
  filterTextActive: { color: '#ffffff' },
  sectionTitle: { alignSelf: 'flex-start', fontSize: 20, color: '#ffffff', fontFamily: 'RobotoSlab_600SemiBold', marginBottom: 16 },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  cardImageWrap: { height: 140, position: 'relative' },
  cardImage: { width: '100%', height: '100%' },
  cardOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.25)' },
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
  cardRatingText: { color: '#FFD700', fontSize: 13, fontFamily: 'RobotoSlab_600SemiBold' },
  cardContent: { padding: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardName: { flex: 1, fontSize: 16, color: '#ffffff', fontFamily: 'RobotoSlab_600SemiBold' },
  cardFee: { fontSize: 16, color: '#9ec8ff', fontFamily: 'RobotoSlab_600SemiBold' },
  cardFeeSuffix: { fontSize: 12, color: 'rgba(255,255,255,0.6)' },
  heartBtn: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 24 },
  messageTitle: { fontSize: 20, color: '#ffffff', fontFamily: 'RobotoSlab_600SemiBold' },
  composeBtn: { padding: 8 },
  wishlistHeader: { width: '100%', marginBottom: 8 },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.6)', alignSelf: 'flex-start', marginBottom: 20 },
  listWrap: { width: '100%', alignItems: 'center' },
  convCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginBottom: 12,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(158,200,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarText: { fontSize: 20, color: '#9ec8ff', fontFamily: 'RobotoSlab_600SemiBold' },
  convContent: { flex: 1 },
  convTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  convName: { fontSize: 16, color: '#ffffff', fontFamily: 'RobotoSlab_600SemiBold', flex: 1 },
  convTime: { fontSize: 12, color: 'rgba(255,255,255,0.5)' },
  convPreview: { fontSize: 14, color: 'rgba(255,255,255,0.7)' },
  convPreviewUnread: { color: 'rgba(255,255,255,0.9)', fontFamily: 'RobotoSlab_600SemiBold' },
  unreadDot: { position: 'absolute', top: 4, right: 0, width: 8, height: 8, borderRadius: 4, backgroundColor: '#9ec8ff' },
  profileTitle: { fontSize: 28, color: '#ffffff', fontFamily: 'RobotoSlab_600SemiBold', marginBottom: 20, textAlign: 'center' },
  avatarRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(158,200,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarText: { fontSize: 28, color: '#9ec8ff', fontFamily: 'RobotoSlab_600SemiBold' },
  profileName: { fontSize: 18, color: '#ffffff', fontFamily: 'RobotoSlab_600SemiBold' },
  profileSmall: { fontSize: 14, color: 'rgba(255,255,255,0.7)' },
  profileInfoCard: {
    width: '100%',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginBottom: 18,
  },
  profileRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8, paddingHorizontal: 4 },
  profileLabel: { color: 'rgba(255,255,255,0.7)', fontFamily: 'RobotoSlab_600SemiBold', fontSize: 14 },
  profileValue: { color: '#ffffff', fontFamily: 'RobotoSlab_600SemiBold', fontSize: 14 },
  profileSectionTitle: { alignSelf: 'flex-start', fontSize: 18, color: '#ffffff', fontFamily: 'RobotoSlab_600SemiBold', marginBottom: 12 },
  badgesRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 18 },
  badge: {
    color: '#ffffff',
    fontFamily: 'RobotoSlab_600SemiBold',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  profileButton: {
    width: '100%',
    maxWidth: 320,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#ffffff',
  },
  profileButtonText: { color: '#111111', fontFamily: 'RobotoSlab_600SemiBold', fontSize: 16 },
  logoutButton: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.6)' },
  logoutButtonText: { color: '#ffffff', fontFamily: 'RobotoSlab_600SemiBold', fontSize: 16 },
  bottomNavWrap: { position: 'absolute', bottom: 24, left: 16, right: 16, alignSelf: 'center' },
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
  navItem: { padding: 8 },
});
