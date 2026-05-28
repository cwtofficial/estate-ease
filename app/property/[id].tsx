import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { properties } from "../../data/properties";

const detailTabs = ["Overview", "Features", "Reviews", "Directions"];

export default function PropertyDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [activeTab, setActiveTab] = useState("Overview");

  // Controls whether the Contact Agent bottom sheet is open
  const [showContact, setShowContact] = useState(false);

  const property = properties.find((p) => p.id === id);

  if (!property) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="font-satoshi-regular text-gray-400">Property not found.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">

      {/* ── HERO IMAGE ──────────────────────────────────────── */}
      <Image
        source={{ uri: property.image }}
        className="w-full h-[45%]"
        resizeMode="cover"
      />

      {/* Back button over image */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ top: insets.top + 12 }}
        className="absolute left-5 w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm"
      >
        <Ionicons name="chevron-back" size={20} color="#17161A" />
      </TouchableOpacity>

      {/* ── BOTTOM SHEET ────────────────────────────────────── */}
      <ScrollView
        className="flex-1 bg-white rounded-t-3xl -mt-6 px-5 pt-3"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        <View className="w-12 h-1 bg-gray-200 rounded-full self-center mb-4" />

        <View className="flex-row items-center justify-between mb-2">
          <View className="flex-row items-center gap-1">
            <Ionicons name="location-outline" size={14} color="#9ca3af" />
            <Text className="text-gray-400 font-satoshi-regular text-sm">{property.location}</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Text className="font-satoshi-medium text-sm text-black">{property.rating}</Text>
            <Ionicons name="star" size={14} color="#f59e0b" />
          </View>
        </View>

        <Text className="font-satoshi-black text-2xl text-black mb-2 leading-tight">
          {property.title}
        </Text>

        <Text className="text-gray-400 font-satoshi-regular text-sm mb-5">
          {property.baths} Baths,  •  {property.beds} Beds,  •  {property.sqft} sqft
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-5">
          {detailTabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`mr-2 px-5 py-2 rounded-full ${activeTab === tab ? "bg-neongreen" : "bg-gray-100"}`}
            >
              <Text className={`font-satoshi-medium text-sm ${activeTab === tab ? "text-black" : "text-gray-500"}`}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text className="font-satoshi-bold text-lg text-black mb-3">Property Details</Text>
        <Text className="font-satoshi-regular text-gray-500 text-base leading-7">
          {property.description}
        </Text>
      </ScrollView>

      {/* ── STICKY BOTTOM BAR ───────────────────────────────── */}
      <View
        className="absolute left-5 right-5 bg-black rounded-3xl px-5 py-4 flex-row items-center justify-between"
        style={{ bottom: insets.bottom + 16 }}
      >
        <View>
          <Text className="text-gray-400 font-satoshi-regular text-xs mb-1">Rent</Text>
          <Text className="text-white font-satoshi-black text-2xl">
            ${property.price.toLocaleString()}
            <Text className="text-base font-satoshi-regular"> /Month</Text>
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setShowContact(true)}
          className="flex-1 ml-4 bg-neongreen rounded-2xl py-4 flex-row items-center justify-center gap-2"
        >
          <Ionicons name="call-outline" size={18} color="#17161A" />
          <Text className="font-satoshi-bold text-black text-sm">Contact Agent</Text>
        </TouchableOpacity>
      </View>


      {/* ══════════════════════════════════════════════════════
          CONTACT AGENT MODAL
          Full-screen modal — the property image is rendered INSIDE
          the modal at the top, matching the design exactly.
          transparent={false} avoids the black overlay issue.
      ══════════════════════════════════════════════════════ */}
      <Modal
        visible={showContact}
        animationType="slide"
        onRequestClose={() => setShowContact(false)}
      >
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="flex-1 bg-white">

            {/* Property image rendered at the top of the modal */}
            <Image
              source={{ uri: property.image }}
              className="w-full h-44"
              resizeMode="cover"
            />

            {/* Back button sits over the image — closes the modal */}
            <TouchableOpacity
              onPress={() => setShowContact(false)}
              style={{ top: insets.top + 12 }}
              className="absolute left-5 w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm"
            >
              <Ionicons name="chevron-back" size={20} color="#17161A" />
            </TouchableOpacity>

            {/* White content sheet overlaps the image with rounded top corners,
                same -mt-6 rounded-t-3xl pattern as the property detail screen */}
            <ScrollView
              className="flex-1 bg-white rounded-t-3xl -mt-6 px-5 pt-3"
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
            >

            {/* Drag handle */}
            <View className="w-12 h-1 bg-gray-200 rounded-full self-center mt-1 mb-5" />

              {/* "Contact Agent" heading */}
              <Text className="font-satoshi-bold text-xl text-black mb-4">
                Contact Agent
              </Text>

              {/* Location (left) + Price (right) */}
              <View className="flex-row items-start justify-between mb-2">
                <View className="flex-row items-center gap-1">
                  <Ionicons name="location-outline" size={14} color="#9ca3af" />
                  <Text className="text-gray-400 font-satoshi-regular text-sm">
                    {property.location}
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="font-satoshi-black text-xl text-black">
                    ${property.price.toLocaleString()}
                  </Text>
                  <Text className="text-gray-400 font-satoshi-regular text-xs text-right">
                    month
                  </Text>
                </View>
              </View>

              {/* Property title */}
              <Text className="font-satoshi-black text-2xl text-black leading-tight mb-2">
                {property.title}
              </Text>

              {/* Stats */}
              <Text className="text-gray-400 font-satoshi-regular text-sm mb-6">
                {property.baths} Baths, • {property.beds} Beds, • {property.sqft} sqft
              </Text>

              {/* First Name + Sec Name — side by side */}
              <View className="flex-row gap-3 mb-3">
                <TextInput
                  placeholder="First Name"
                  placeholderTextColor="#9ca3af"
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-4 font-satoshi-regular text-sm text-black"
                />
                <TextInput
                  placeholder="Sec Name"
                  placeholderTextColor="#9ca3af"
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-4 font-satoshi-regular text-sm text-black"
                />
              </View>

              {/* Phone */}
              <TextInput
                placeholder="You Phone Number"
                placeholderTextColor="#9ca3af"
                keyboardType="phone-pad"
                className="border border-gray-200 rounded-xl px-4 py-4 font-satoshi-regular text-sm text-black mb-3"
              />

              {/* Email */}
              <TextInput
                placeholder="You Email"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                autoCapitalize="none"
                className="border border-gray-200 rounded-xl px-4 py-4 font-satoshi-regular text-sm text-black mb-3"
              />

              {/* Message — multiline textarea */}
              <TextInput
                placeholder="Message"
                placeholderTextColor="#9ca3af"
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                className="border border-gray-200 rounded-xl px-4 py-4 font-satoshi-regular text-sm text-black mb-6 h-36"
              />

              {/* Send Inquiry — full width neongreen button */}
              <TouchableOpacity
                activeOpacity={0.85}
                className="bg-neongreen rounded-2xl py-4 items-center"
              >
                <Text className="font-satoshi-bold text-black text-base">
                  Send Inquiry
                </Text>
              </TouchableOpacity>

            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>


    </View>
  );
}
