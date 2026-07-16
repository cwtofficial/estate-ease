import { Stack } from "expo-router";
import {useFonts} from "expo-font"
import "../global.css";

// To use Google Fonts instead of/alongside local files:
// 1. Install the package for the font family, e.g. `npx expo install @expo-google-fonts/inter`
// 2. Import the font weights you need and pass them into useFonts:
//    import { Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";
//    useFonts({ Inter_400Regular, Inter_700Bold, ...yourLocalFonts })
// 3. Reference the font by its exported name in styles, e.g. fontFamily: "Inter_400Regular"
// Browse available families at https://github.com/expo/google-fonts

export default function RootLayout() {
   const [fontsLoaded, error] = useFonts({
    "Satoshi-Black": require("../assets/fonts/Satoshi-Black.otf"),
    "Satoshi-BlackItalic": require("../assets/fonts/Satoshi-BlackItalic.otf"),
    "Satoshi-Bold": require("../assets/fonts/Satoshi-Bold.otf"),
    "Satoshi-BoldItalic": require("../assets/fonts/Satoshi-BoldItalic.otf"),
    "Satoshi-Italic": require("../assets/fonts/Satoshi-Italic.otf"),
    "Satoshi-Light": require("../assets/fonts/Satoshi-Light.otf"),
    "Satoshi-LightItalic": require("../assets/fonts/Satoshi-LightItalic.otf"),
    "Satoshi-Medium": require("../assets/fonts/Satoshi-Medium.otf"),
    "Satoshi-MediumItalic": require("../assets/fonts/Satoshi-MediumItalic.otf"),
    "Satoshi-Regular": require("../assets/fonts/Satoshi-Regular.otf"),
  });
  
  return <Stack  screenOptions={{headerShown: false}}/>;
}
