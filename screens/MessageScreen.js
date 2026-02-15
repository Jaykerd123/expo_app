import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, RobotoSlab_600SemiBold } from '@expo-google-fonts/roboto-slab';

const CONVERSATIONS = [
  { id: '1', name: 'Camp Admin', preview: 'Your booking for Mount Kitanglad is confirmed!', time: '2m', unread: true },
  { id: '2', name: 'Sarah M.', preview: 'See you at the campsite this weekend 🏕️', time: '1h', unread: false },
  { id: '3', name: 'Marcus L.', preview: 'Thanks for the recommendation!', time: '3h', unread: false },
  { id: '4', name: 'Camp Support', preview: 'Weather update: Clear skies ahead', time: 'Yesterday', unread: false },
];

export default function MessageScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const [fontsLoaded] = useFonts({ RobotoSlab_600SemiBold });
  const [searchText, setSearchText] = useState('');

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
          <Text style={styles.title}>Messages</Text>
          <TouchableOpacity style={styles.composeBtn}>
            <Ionicons name="create-outline" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={[styles.searchWrap, { width: Math.min(width - 40, 360) }]}>
          <Ionicons name="search" size={20} color="rgba(255,255,255,0.7)" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search conversations…"
            placeholderTextColor="rgba(255,255,255,0.6)"
            value={searchText}
            onChangeText={setSearchText}
            cursorColor="#ffffff"
          />
        </View>

        {/* Conversation List */}
        <View style={styles.listWrap}>
          {CONVERSATIONS.map((conv) => (
            <TouchableOpacity
              key={conv.id}
              activeOpacity={0.85}
              style={[styles.convCard, { width: Math.min(width - 40, 360) }]}
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{conv.name.charAt(0)}</Text>
              </View>
              <View style={styles.convContent}>
                <View style={styles.convTop}>
                  <Text style={styles.convName} numberOfLines={1}>{conv.name}</Text>
                  <Text style={styles.convTime}>{conv.time}</Text>
                </View>
                <Text
                  style={[styles.convPreview, conv.unread && styles.convPreviewUnread]}
                  numberOfLines={2}
                >
                  {conv.preview}
                </Text>
                {conv.unread && <View style={styles.unreadDot} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Empty hint when no search results could go here */}
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
    marginBottom: 24,
  },
  backBtn: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    color: '#ffffff',
    fontFamily: 'RobotoSlab_600SemiBold',
  },
  composeBtn: {
    padding: 8,
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
    marginBottom: 24,
  },
  searchIcon: { marginRight: 12 },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'RobotoSlab_600SemiBold',
    paddingVertical: 0,
  },
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
  avatarText: {
    fontSize: 20,
    color: '#9ec8ff',
    fontFamily: 'RobotoSlab_600SemiBold',
  },
  convContent: {
    flex: 1,
  },
  convTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  convName: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'RobotoSlab_600SemiBold',
    flex: 1,
  },
  convTime: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
  },
  convPreview: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  convPreviewUnread: {
    color: 'rgba(255,255,255,0.9)',
    fontFamily: 'RobotoSlab_600SemiBold',
  },
  unreadDot: {
    position: 'absolute',
    top: 4,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#9ec8ff',
  },
});
