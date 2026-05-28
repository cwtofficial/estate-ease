import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View
    className="flex-1 justify-center items-center gap-6"
  
    >
      <Text className="font-satoshi-bold text-2xl">Welcome to The Estate Ease App</Text>
      <TouchableOpacity className="bg-neongreen rounded-full py-4 px-6"
      onPress={()=> router.push("/(tabs)/home")}
      >
        <Text className="font-satoshi-medium text-xl">Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}
