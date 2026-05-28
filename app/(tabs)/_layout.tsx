// ─────────────────────────────────────────────────────────────
// IMPORTS
// ─────────────────────────────────────────────────────────────

// Tabs is the component from expo-router that creates a bottom tab navigator.
// Think of it as the "container" that manages which screen is visible.
import { Tabs } from "expo-router";

// View is like a <div> in web — a box you can style and put things inside.
// TouchableOpacity is a button that dims slightly when you press it.
import { View, TouchableOpacity } from "react-native";

// BlurView applies a frosted-glass / blur effect to its background.
// This is what gives the tab bar its transparent + blurry look.
// tint="light" = white-ish blur. intensity = how strong the blur is (0–100).
import { BlurView } from "expo-blur";

// Ionicons is an icon library bundled with Expo. It gives us access to
// hundreds of ready-made icons by name e.g. "home-outline", "heart", etc.
import { Ionicons } from "@expo/vector-icons";

// BottomTabBarProps is a TypeScript type that tells us exactly what data
// expo-router/react-navigation will hand to our custom tab bar:
//   - state    → which tab is currently active, and the full list of routes
//   - navigation → the object we call .navigate() on to switch tabs
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";


// ─────────────────────────────────────────────────────────────
// TAB CONFIGURATION
// ─────────────────────────────────────────────────────────────

// This array holds the config for every tab.
// Each tab has:
//   name       → must match the file name inside (tabs)/
//   icon       → the outline (inactive) version of the icon
//   activeIcon → the filled (active) version of the icon
const tabs = [
  { name: "home",      icon: "home-outline",                activeIcon: "home"                },
  { name: "messages",  icon: "chatbubble-ellipses-outline",  activeIcon: "chatbubble-ellipses" },
  { name: "search",    icon: "search-outline",               activeIcon: "search"              },
  { name: "favorites", icon: "heart-outline",                activeIcon: "heart"               },
  { name: "profile",   icon: "person-outline",               activeIcon: "person"              },
];


// ─────────────────────────────────────────────────────────────
// CUSTOM TAB BAR COMPONENT
// ─────────────────────────────────────────────────────────────

// We define our own tab bar instead of using the default one so we can
// make it look exactly like the design — floating pill, black + neon style.
//
// expo-router passes two things into this component automatically:
//   state      → knows which tab index is currently selected
//   navigation → lets us navigate to a different tab when the user taps
function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  return (

    // This outer View is absolutely positioned so it floats over the screen content.
    // bottom-7 = 28px from the bottom edge. left-0 right-0 = full width. items-center = centered.
    <View className="absolute bottom-7 left-0 right-0 items-center">

      {/* BlurView creates the frosted-glass pill.
          intensity={60} = strength of the blur (0 = none, 100 = maximum).
          tint="light"   = white-ish frosted tone.
          overflow:"hidden" is required so the blur respects the rounded corners. */}
      <BlurView
        intensity={60}
        tint="light"
        style={{ flexDirection: "row", gap: 8, borderRadius: 50, overflow: "hidden", paddingHorizontal: 12, paddingVertical: 12 }}
      >

        {/* Loop over every route (tab) that expo-router registered.
            For each one we render a tappable circle icon. */}
        {state.routes.map((route, index) => {

          // state.index is the number of the currently selected tab.
          // If this loop's index matches it, this tab is the active one.
          const isActive = state.index === index;

          // Grab this tab's icon names from our config array above.
          const tab = tabs[index];

          return (
            // key is required by React when rendering a list — it helps React
            // track which item is which when the list changes.
            <TouchableOpacity
              key={route.key}

              // When the user taps this icon, navigate to the matching screen.
              onPress={() => navigation.navigate(route.name)}

              // activeOpacity controls how faded the button looks while being pressed.
              // 0.8 = slightly dimmed. 1.0 = no change. 0 = fully transparent.
              activeOpacity={0.8}

              // Active tab → black circle (bg-black from our tailwind config = #17161A)
              // Inactive tab → light grey circle (bg-gray-100)
              // w-14 h-14 = 56x56px square, rounded-full turns it into a circle.
              className={`w-14 h-14 rounded-full items-center justify-center ${
                isActive ? "bg-black" : "bg-gray-100"
              }`}
            >
              {/* Show the filled icon when active, outline icon when inactive.
                  The "as any" silences a TypeScript complaint about the icon name type. */}
              <Ionicons
                name={isActive ? (tab.activeIcon as any) : (tab.icon as any)}
                size={24}
                // Active icon → neon green (#D1FC56 from our tailwind config)
                // Inactive icon → near-black (#17161A)
                color={isActive ? "#D1FC56" : "#17161A"}
              />
            </TouchableOpacity>
          );
        })}

      </BlurView>
    </View>
  );
}


// ─────────────────────────────────────────────────────────────
// ROOT TABS LAYOUT
// ─────────────────────────────────────────────────────────────

export default function TabsLayout() {
  return (
    // <Tabs> sets up the tab navigator. By default it renders its own tab bar,
    // but we replace it entirely using the tabBar prop below.
    <Tabs
      // ─── WHY tabBar={(props) => <CustomTabBar {...props} />} ? ───────────────
      //
      // tabBar is a prop that lets you swap out the default tab bar for your own.
      // Expo-router calls this function and passes in all the data the tab bar needs
      // (which tab is active, how to navigate, etc.) as a single object called props.
      //
      // (props) => <CustomTabBar {...props} />  means:
      //   1. expo-router collects all that data and puts it in one object: props
      //   2. {...props} spreads that object → it unpacks every key inside props
      //      and passes each one as a separate prop to <CustomTabBar>.
      //   So instead of writing <CustomTabBar state={props.state} navigation={props.navigation} />
      //   we just write {...props} and ALL of them are passed in one go.
      //
      // Without this line, you'd see the default grey tab bar React Navigation gives you.
      // ─────────────────────────────────────────────────────────────────────────
      tabBar={(props) => <CustomTabBar {...props} />}

      // Hide the top header bar on every screen inside this tab navigator.
      screenOptions={{ headerShown: false }}
    >
      {/* Each Tabs.Screen registers a route. The name must match the file name
          inside the (tabs) folder — e.g. name="home" maps to (tabs)/home.tsx */}
      <Tabs.Screen name="home" />
      <Tabs.Screen name="messages" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="favorites" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
