import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { ThemeProvider } from "../components/ThemeProvider";
import { useTheme } from "../hooks/useTheme";

function RootLayoutContent() {
  const { isDarkMode, colors } = useTheme();

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutContent />
    </ThemeProvider>
  );
}
