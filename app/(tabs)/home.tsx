import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useRouter } from "expo-router";

// Import the shared property data so home and detail screen always stay in sync
import { properties } from "../../data/properties";

// ─── DATA ─────────────────────────────────────────────────────

// The filter pills shown below the search bar
const categories = ["All", "Appartments", "House", "Villa", "Hotel"];

// ─── SCREEN ───────────────────────────────────────────────────

export default function HomeScreen() {
  // useRouter lets us navigate to other screens programmatically
  const router = useRouter();

  // Tracks which filter pill is currently selected
  const [activeCategory, setActiveCategory] = useState("All");

  // Tracks the favorited state of each property by its id
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({
    "1": true,
    "2": false,
    "3": false,
  });

  // Flip the favorite state when the heart button is tapped
  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    // SafeAreaView ensures content never goes under the notch or status bar
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        // Extra bottom padding so the last card isn't hidden behind the tab bar
        contentContainerStyle={{ paddingBottom: 120 }}
      >

        {/* ── HEADER ─────────────────────────────────────────── */}
        <View className="flex-row items-center justify-between mt-4 mb-7">

          {/* Logo — "Estate" normal weight, "Ease" bold, green squiggle above */}
          <View>
            <Text className="text-neongreen font-satoshi-black text-xs tracking-widest ml-14 -mb-1">
              ~~~
            </Text>
            <Text className="text-2xl font-satoshi-regular text-black">
              Estate<Text className="font-satoshi-black">Ease</Text>
            </Text>
          </View>

          {/* Right side: notification bell + user avatar */}
          <View className="flex-row items-center gap-3">
            <TouchableOpacity className="w-10 h-10 items-center justify-center">
              <Ionicons name="notifications" size={24} color="#17161A" />
            </TouchableOpacity>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
              }}
              className="w-11 h-11 rounded-full"
            />
          </View>
        </View>

        {/* ── SEARCH BAR ─────────────────────────────────────── */}
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-3 mb-5">
          <Ionicons name="search-outline" size={20} color="#9ca3af" />
          <TextInput
            placeholder="Search Address, city, zip."
            placeholderTextColor="#9ca3af"
            className="flex-1 ml-2 font-satoshi-regular text-sm text-black"
          />
        </View>

        {/* ── CATEGORY FILTER PILLS ──────────────────────────── */}
        {/* horizontal ScrollView so pills scroll sideways when there are many */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-5"
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setActiveCategory(cat)}
              // Active pill → neongreen background | Inactive → light grey
              className={`mr-2 px-5 py-2 rounded-full ${
                activeCategory === cat ? "bg-neongreen" : "bg-gray-100"
              }`}
            >
              <Text
                className={`font-satoshi-medium text-sm ${
                  activeCategory === cat ? "text-black" : "text-gray-500"
                }`}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── PROPERTY CARDS ─────────────────────────────────── */}
        {properties.map((property) => (
          <TouchableOpacity
            key={property.id}
            activeOpacity={0.9}
            // Navigate to the detail screen, passing this property's id in the URL
            onPress={() => router.push(`/property/${property.id}`)}
            className="bg-white rounded-3xl mb-5 shadow-sm border border-gray-100 overflow-hidden"
          >

            {/* Property image with overlaid category badge + heart button */}
            <View>
              <Image
                source={{ uri: property.image }}
                className="w-full h-56"
                resizeMode="cover"
              />

              {/* Category badge — top left corner */}
              <View className="absolute top-4 left-4 bg-white rounded-full px-3 py-1">
                <Text className="font-satoshi-medium text-xs text-black">
                  {property.category}
                </Text>
              </View>

              {/* Heart / favourite button — top right corner */}
              <TouchableOpacity
                onPress={() => toggleFavorite(property.id)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white items-center justify-center"
              >
                <Ionicons
                  name={favorites[property.id] ? "heart" : "heart-outline"}
                  size={18}
                  // Red when favorited, grey when not
                  color={favorites[property.id] ? "#ef4444" : "#6b7280"}
                />
              </TouchableOpacity>
            </View>

            {/* Property details below the image */}
            <View className="px-4 py-4">

              {/* Stats row: baths/beds/sqft on left, price on right */}
              <View className="flex-row items-start justify-between mb-1">
                <Text className="text-gray-400 font-satoshi-regular text-sm">
                  {property.baths} Baths,  •  {property.beds} Beds,  •  {property.sqft} sqft
                </Text>
                <View className="items-end">
                  <Text className="font-satoshi-black text-xl text-black">
                    ${property.price.toLocaleString()}
                  </Text>
                  <Text className="text-gray-400 font-satoshi-regular text-xs">
                    month
                  </Text>
                </View>
              </View>

              {/* Property title */}
              <Text className="font-satoshi-bold text-lg text-black mb-3">
                {property.title}
              </Text>

              {/* Location pin + star rating */}
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-1">
                  <Ionicons name="location-outline" size={14} color="#9ca3af" />
                  <Text className="text-gray-400 font-satoshi-regular text-sm">
                    {property.location}
                  </Text>
                </View>
                <View className="flex-row items-center gap-1">
                  <Text className="font-satoshi-medium text-sm text-black">
                    {property.rating}
                  </Text>
                  <Ionicons name="star" size={14} color="#f59e0b" />
                </View>
              </View>

            </View>
          </TouchableOpacity>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}
