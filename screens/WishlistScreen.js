import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, RobotoSlab_600SemiBold } from '@expo-google-fonts/roboto-slab';

const WISHLIST_ITEMS = [
  { id: '1', name: 'Mount Kitanglad Camp', rating: 4.8, fee: 150, image: require('../assets/images/yuru_camp.png') },
  { id: '2', name: 'Kaamulan Nature Park', rating: 4.5, fee: 200, image: require('../assets/images/yuru_camp.png') },
  { id: '3', name: 'Pine Grove Campground', rating: 4.9, fee: 250, image: require('../assets/images/yuru_camp.png') },
  { id: '4', name: 'Lake Apo Viewpoint', rating: 4.7, fee: 180, image: require('../assets/images/yuru_camp.png') },
];

export default function WishlistScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const [fontsLoaded] = useFonts({ RobotoSlab_600SemiBold });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.title}>My Wishlist</Text>
          <View style={styles.placeholder} />
        </View>

        <Text style={styles.subtitle}>
          {WISHLIST_ITEMS.length} camping site{WISHLIST_ITEMS.length !== 1 ? 's' : ''} saved
        </Text>

        {/* Wishlist Cards */}
        <View style={styles.listWrap}>
          {WISHLIST_ITEMS.map((site) => (
            <TouchableOpacity
              key={site.id}
              activeOpacity={0.9}
              style={[styles.card, { width: Math.min(width - 40, 360) }]}
            >
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c111e',
  },
  scrollView: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 40,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  backBtn: { padding: 8 },
  placeholder: { width: 40 },
  title: {
    fontSize: 20,
    color: '#ffffff',
    fontFamily: 'RobotoSlab_600SemiBold',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  listWrap: { width: '100%', alignItems: 'center' },
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
});
