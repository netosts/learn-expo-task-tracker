import { useTheme } from "@/src/hooks/useTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Settings() {
  const { isDarkMode, toggleTheme, colors } = useTheme();

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

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>

      <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
        <Text style={[styles.settingLabel, { color: colors.text }]}>
          Dark Mode
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          trackColor={{ false: "#767577", true: colors.primary }}
          thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>

      <TouchableOpacity
        style={[styles.clearButton, { backgroundColor: colors.error }]}
        onPress={clearAllTasks}
      >
        <Text style={styles.clearButtonText}>Clear All Tasks</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  settingLabel: {
    fontSize: 18,
  },
  clearButton: {
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
