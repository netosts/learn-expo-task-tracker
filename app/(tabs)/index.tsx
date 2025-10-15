import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Task {
  id: string;
  title: string;
  category: string;
  completed: boolean;
  createdAt: string;
}

const CATEGORIES = ["Work", "Personal", "Shopping", "Health", "Other"];

export default function Index() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Personal");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    loadTasks();
    loadTheme();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem("tasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  const loadTheme = async () => {
    try {
      const theme = await AsyncStorage.getItem("theme");
      setIsDarkMode(theme === "dark");
    } catch (error) {
      console.error("Error loading theme:", error);
    }
  };

  const saveTasks = async (newTasks: Task[]) => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(newTasks));
      setTasks(newTasks);
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  };

  const addTask = () => {
    if (newTaskTitle.trim() === "") {
      Alert.alert("Error", "Please enter a task title.");
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      category: selectedCategory,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    const updatedTasks = [...tasks, newTask];
    saveTasks(updatedTasks);
    setNewTaskTitle("");
  };

  const toggleTaskCompletion = (taskId: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    saveTasks(updatedTasks);
  };

  const deleteTask = (taskId: string) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          const updatedTasks = tasks.filter((task) => task.id !== taskId);
          saveTasks(updatedTasks);
        },
      },
    ]);
  };

  const startEditing = (task: Task) => {
    setEditingTask(task.id);
    setEditTitle(task.title);
  };

  const saveEdit = () => {
    if (editTitle.trim() === "") {
      Alert.alert("Error", "Task title cannot be empty.");
      return;
    }

    const updatedTasks = tasks.map((task) =>
      task.id === editingTask ? { ...task, title: editTitle.trim() } : task
    );
    saveTasks(updatedTasks);
    setEditingTask(null);
    setEditTitle("");
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditTitle("");
  };

  const renderTask = ({ item }: { item: Task }) => {
    const isEditing = editingTask === item.id;

    return (
      <View style={[styles.taskItem, isDarkMode && styles.taskItemDark]}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => toggleTaskCompletion(item.id)}
        >
          <MaterialIcons
            name={item.completed ? "check-box" : "check-box-outline-blank"}
            size={24}
            color={item.completed ? "#4CAF50" : isDarkMode ? "#666" : "#999"}
          />
        </TouchableOpacity>

        <View style={styles.taskContent}>
          {isEditing ? (
            <TextInput
              style={[styles.editInput, isDarkMode && styles.editInputDark]}
              value={editTitle}
              onChangeText={setEditTitle}
              autoFocus
              onSubmitEditing={saveEdit}
            />
          ) : (
            <View>
              <Text
                style={[
                  styles.taskTitle,
                  isDarkMode && styles.taskTitleDark,
                  item.completed && styles.taskTitleCompleted,
                ]}
              >
                {item.title}
              </Text>
              <Text
                style={[
                  styles.taskCategory,
                  isDarkMode && styles.taskCategoryDark,
                ]}
              >
                {item.category}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.taskActions}>
          {isEditing ? (
            <>
              <TouchableOpacity onPress={saveEdit} style={styles.actionButton}>
                <MaterialIcons name="check" size={20} color="#4CAF50" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={cancelEdit}
                style={styles.actionButton}
              >
                <MaterialIcons name="close" size={20} color="#f44336" />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => startEditing(item)}
                style={styles.actionButton}
              >
                <MaterialIcons name="edit" size={20} color="#2196F3" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteTask(item.id)}
                style={styles.actionButton}
              >
                <MaterialIcons name="delete" size={20} color="#f44336" />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    );
  };

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={isDarkMode ? "#1a1a1a" : "#ffffff"}
      />

      <Text style={styles.title}>My Tasks</Text>

      {/* Add Task Section */}
      <View style={styles.addTaskSection}>
        <TextInput
          style={styles.taskInput}
          placeholder="Enter a new task..."
          placeholderTextColor={isDarkMode ? "#666" : "#999"}
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
          onSubmitEditing={addTask}
        />

        <View style={styles.categorySection}>
          <Text style={styles.categoryLabel}>Category:</Text>
          <View style={styles.categoryButtons}>
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category &&
                    styles.categoryButtonSelected,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    selectedCategory === category &&
                      styles.categoryButtonTextSelected,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <MaterialIcons name="add" size={24} color="#ffffff" />
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>

      {/* Tasks List */}
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        style={styles.tasksList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="task-alt" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No tasks yet!</Text>
            <Text style={styles.emptySubtext}>Add your first task above</Text>
          </View>
        }
      />
    </View>
  );
}

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#1a1a1a" : "#f5f5f5",
      padding: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 20,
      color: isDarkMode ? "#ffffff" : "#000000",
    },
    addTaskSection: {
      backgroundColor: isDarkMode ? "#2a2a2a" : "#ffffff",
      padding: 20,
      borderRadius: 12,
      marginBottom: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    taskInput: {
      borderWidth: 1,
      borderColor: isDarkMode ? "#444" : "#ddd",
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      marginBottom: 15,
      color: isDarkMode ? "#ffffff" : "#000000",
      backgroundColor: isDarkMode ? "#333" : "#ffffff",
    },
    categorySection: {
      marginBottom: 15,
    },
    categoryLabel: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 10,
      color: isDarkMode ? "#ffffff" : "#000000",
    },
    categoryButtons: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    categoryButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      backgroundColor: isDarkMode ? "#444" : "#e0e0e0",
      borderWidth: 1,
      borderColor: isDarkMode ? "#555" : "#ccc",
    },
    categoryButtonSelected: {
      backgroundColor: "#2196F3",
      borderColor: "#2196F3",
    },
    categoryButtonText: {
      fontSize: 14,
      color: isDarkMode ? "#ffffff" : "#333",
    },
    categoryButtonTextSelected: {
      color: "#ffffff",
      fontWeight: "600",
    },
    addButton: {
      backgroundColor: "#2196F3",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 12,
      borderRadius: 8,
      gap: 8,
    },
    addButtonText: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "600",
    },
    tasksList: {
      flex: 1,
    },
    taskItem: {
      backgroundColor: "#ffffff",
      padding: 15,
      marginBottom: 10,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    taskItemDark: {
      backgroundColor: "#2a2a2a",
    },
    checkbox: {
      marginRight: 12,
    },
    taskContent: {
      flex: 1,
    },
    taskTitle: {
      fontSize: 16,
      fontWeight: "500",
      color: "#000000",
    },
    taskTitleDark: {
      color: "#ffffff",
    },
    taskTitleCompleted: {
      textDecorationLine: "line-through",
      opacity: 0.6,
    },
    taskCategory: {
      fontSize: 12,
      color: "#666",
      marginTop: 2,
    },
    taskCategoryDark: {
      color: "#999",
    },
    taskActions: {
      flexDirection: "row",
      gap: 8,
    },
    actionButton: {
      padding: 4,
    },
    editInput: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 4,
      padding: 8,
      fontSize: 16,
      backgroundColor: "#ffffff",
      color: "#000000",
    },
    editInputDark: {
      borderColor: "#555",
      backgroundColor: "#333",
      color: "#ffffff",
    },
    emptyContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 40,
    },
    emptyText: {
      fontSize: 18,
      fontWeight: "600",
      color: "#999",
      marginTop: 10,
    },
    emptySubtext: {
      fontSize: 14,
      color: "#ccc",
      marginTop: 5,
    },
  });
