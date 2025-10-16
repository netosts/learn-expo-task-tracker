import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useEffect, useState } from "react";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  colors: {
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    primary: string;
    success: string;
    error: string;
    warning: string;
  };
}

const lightColors = {
  background: "#f5f5f5",
  surface: "#ffffff",
  text: "#000000",
  textSecondary: "#666666",
  border: "#e0e0e0",
  primary: "#2196F3",
  success: "#4CAF50",
  error: "#f44336",
  warning: "#ff9800",
};

const darkColors = {
  background: "#1a1a1a",
  surface: "#2a2a2a",
  text: "#ffffff",
  textSecondary: "#999999",
  border: "#333333",
  primary: "#2196F3",
  success: "#4CAF50",
  error: "#f44336",
  warning: "#ff9800",
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const theme = await AsyncStorage.getItem("theme");
      if (theme === "dark") {
        setIsDarkMode(true);
      }
    } catch (error) {
      console.error("Error loading theme:", error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      await AsyncStorage.setItem("theme", newTheme ? "dark" : "light");
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  };

  const colors = isDarkMode ? darkColors : lightColors;

  const value = {
    isDarkMode,
    toggleTheme,
    colors,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
