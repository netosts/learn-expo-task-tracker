import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Settings() {
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

  const clearAllTasks = () => {
    Alert.alert(
      "Clear All Tasks",
      "Are you sure you want to delete all tasks? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("tasks");
              Alert.alert("Success", "All tasks have been cleared.");
            } catch (error) {
              console.error("Error clearing tasks:", error);
              Alert.alert("Error", "Failed to clear tasks.");
            }
          },
        },
      ]
    );
  };

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>

      <TouchableOpacity style={styles.clearButton} onPress={clearAllTasks}>
        <Text style={styles.clearButtonText}>Clear All Tasks</Text>
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: isDarkMode ? "#1a1a1a" : "#ffffff",
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 30,
      color: isDarkMode ? "#ffffff" : "#000000",
    },
    settingItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? "#333333" : "#e0e0e0",
    },
    settingLabel: {
      fontSize: 18,
      color: isDarkMode ? "#ffffff" : "#000000",
    },
    clearButton: {
      backgroundColor: "#ff4444",
      padding: 15,
      borderRadius: 8,
      marginTop: 30,
      alignItems: "center",
    },
    clearButtonText: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "bold",
    },
  });
