import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextStyle,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TaskInput from "../components/TaskInput";
import { useTheme } from "../Theme/ThemeContext";
import sunIcon from "@/assets/images/shine.png";
import moonIcon from "@/assets/images/moon.png";
import TaskList from "@/components/TaskList";

import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";

interface Task {
  _id: Id<"tasks">;
  text: string;
  completed: boolean;
  order: number;
  createdAt: number;
}

export default function HomeScreen() {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const { fonts, theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  // Convex queries and mutations
  const tasks = useQuery(api.tasks.getTasks);
  const addTask = useMutation(api.tasks.addTask);
  const toggleTask = useMutation(api.tasks.toggleTask);
  const deleteTask = useMutation(api.tasks.deleteTask);
  const updateTasksOrder = useMutation(api.tasks.updateTasksOrder);

  const handleAddTask = async (taskText: string) => {
    const maxOrder = tasks?.length
      ? Math.max(...tasks.map((t) => t.order))
      : -1;
    await addTask({
      text: taskText,
      order: maxOrder + 1,
    });
  };

  const handleDeleteTask = async (id: Id<"tasks">) => {
    await deleteTask({ id });
  };

  const handleToggleTask = async (id: Id<"tasks">) => {
    await toggleTask({ id });
  };

  const handleDragEnd = async (data: Task[]) => {
    const updates = data.map((task, index) => ({
      id: task._id,
      order: index,
    }));
    await updateTasksOrder({ tasks: updates });
  };

  const handleClearCompleted = async () => {
    if (!tasks) return;
    const completedTasks = tasks.filter((task) => task.completed);
    for (const task of completedTasks) {
      await deleteTask({ id: task._id });
    }
  };

  // Loading state
  if (tasks === undefined) {
    return (
      <View
        style={[
          styles.mainContainer,
          styles.centered,
          { backgroundColor: isDark ? "#171823" : "#f9f9f9" },
        ]}
      >
        <ActivityIndicator size="large" color={isDark ? "#fff" : "#000"} />
      </View>
    );
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const getTextStyle = (type: "all" | "active" | "completed"): TextStyle => ({
    color: filter === type ? "#3A7CFD" : isDark ? "#5B5E7E" : "#9495A5",
    fontSize: 14,
  });

  const backgroundImage = isDark
    ? require("../assets/images/dark-bg.jpg")
    : require("../assets/images/light.jpg");

  return (
    <View
      style={[
        styles.mainContainer,
        { backgroundColor: isDark ? "#171823" : "#f9f9f9" },
      ]}
    >
      <SafeAreaView
        edges={["top", "bottom", "left", "right"]}
        style={styles.safeArea}
      >
        <View style={styles.imageSection}>
          <Image
            source={backgroundImage}
            style={styles.headerImage}
            resizeMode="cover"
          />
          <View style={styles.headerOverlay}>
            <Image source={require("@/assets/images/TODO.png")} />
            <Pressable onPress={toggleTheme}>
              <Image
                source={isDark ? sunIcon : moonIcon}
                style={{ width: 32, height: 32, resizeMode: "contain" }}
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.listContainer}>
          <TaskInput onAddTask={handleAddTask} isDark={isDark} />

          {tasks.length !== 0 && (
            <TaskList
              tasks={filteredTasks}
              isDark={isDark}
              onReorder={handleDragEnd}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
              clearCompleted={handleClearCompleted}
            />
          )}
        </View>

        <View
          style={[
            styles.container,
            {
              backgroundColor: isDark ? "#25273D" : "#FFFFFF",
            },
          ]}
        >
          <Pressable onPress={() => setFilter("all")}>
            <Text style={[getTextStyle("all"), { fontFamily: fonts.bold }]}>
              All
            </Text>
          </Pressable>

          <Pressable onPress={() => setFilter("active")}>
            <Text style={[getTextStyle("active"), { fontFamily: fonts.bold }]}>
              Active
            </Text>
          </Pressable>

          <Pressable onPress={() => setFilter("completed")}>
            <Text
              style={[getTextStyle("completed"), { fontFamily: fonts.bold }]}
            >
              Completed
            </Text>
          </Pressable>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.textBeneath}>Drag and drop to reorder list</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  safeArea: {
    flex: 1,
  },
  imageSection: {
    height: "33%",
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingTop: 50,
  },
  listContainer: {
    flex: 1,
    backgroundColor: "transparent",
    marginTop: -170,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 20,
    overflow: "hidden",
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 19,
    borderRadius: 5,
    paddingVertical: 15,
    marginTop: 10,
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 40,
  },
  textContainer: {
    marginBottom: 72,
  },
  textBeneath: {
    color: "#9495A5",
    textAlign: "center",
    fontFamily: "Josefin Sans",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    letterSpacing: -0.194,
  },
});
