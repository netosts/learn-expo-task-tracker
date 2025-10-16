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
import { useTheme } from "../../contexts/ThemeContext";

interface Task {
  id: string;
  title: string;
  category: string;
  completed: boolean;
  createdAt: string;
}

const CATEGORIES = ["Work", "Personal", "Shopping", "Health", "Other"];

export default function Index() {
  const { isDarkMode, colors } = useTheme();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Personal");
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    loadTasks();
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
      <View style={[styles.taskItem, { backgroundColor: colors.surface }]}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => toggleTaskCompletion(item.id)}
        >
          <MaterialIcons
            name={item.completed ? "check-box" : "check-box-outline-blank"}
            size={24}
            color={item.completed ? colors.success : colors.textSecondary}
          />
        </TouchableOpacity>

        <View style={styles.taskContent}>
          {isEditing ? (
            <TextInput
              style={[
                styles.editInput,
                {
                  backgroundColor: colors.surface,
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
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
                  { color: colors.text },
                  item.completed && styles.taskTitleCompleted,
                ]}
              >
                {item.title}
              </Text>
              <Text
                style={[styles.taskCategory, { color: colors.textSecondary }]}
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

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />

      <Text style={[styles.title, { color: colors.text }]}>My Tasks</Text>

      {/* Add Task Section */}
      <View
        style={[styles.addTaskSection, { backgroundColor: colors.surface }]}
      >
        <TextInput
          style={[
            styles.taskInput,
            {
              backgroundColor: colors.surface,
              color: colors.text,
              borderColor: colors.border,
            },
          ]}
          placeholder="Enter a new task..."
          placeholderTextColor={colors.textSecondary}
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
          onSubmitEditing={addTask}
        />

        <View style={styles.categorySection}>
          <Text style={[styles.categoryLabel, { color: colors.text }]}>
            Category:
          </Text>
          <View style={styles.categoryButtons}>
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  {
                    backgroundColor:
                      selectedCategory === category
                        ? colors.primary
                        : colors.background,
                    borderColor:
                      selectedCategory === category
                        ? colors.primary
                        : colors.border,
                  },
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    {
                      color:
                        selectedCategory === category ? "#ffffff" : colors.text,
                    },
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
            <MaterialIcons
              name="task-alt"
              size={64}
              color={colors.textSecondary}
            />
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No tasks yet!
            </Text>
            <Text
              style={[styles.emptySubtext, { color: colors.textSecondary }]}
            >
              Add your first task above
            </Text>
          </View>
        }
      />
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
    marginBottom: 20,
  },
  addTaskSection: {
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
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  categorySection: {
    marginBottom: 15,
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
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
    borderWidth: 1,
  },
  categoryButtonSelected: {
    backgroundColor: "#2196F3",
    borderColor: "#2196F3",
  },
  categoryButtonText: {
    fontSize: 14,
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
  checkbox: {
    marginRight: 12,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  taskTitleCompleted: {
    textDecorationLine: "line-through",
    opacity: 0.6,
  },
  taskCategory: {
    fontSize: 12,
    marginTop: 2,
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
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: 5,
  },
});
