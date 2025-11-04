import React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/Theme/ThemeContext";
import { Id } from "../convex/_generated/dataModel";

interface Props {
  text: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
  isDark: boolean;
}

export default function TaskItem({
  text,
  completed,
  onToggle,
  onDelete,
  isDark,
}: Props) {
  const { fonts } = useTheme();

  return (
    <View
      style={[
        styles.taskItem,
        {
          backgroundColor: isDark ? "#25273D" : "#FFFFFF",
          borderColor: isDark ? "#393A4B" : "#E3E4F1",
        },
      ]}
    >
      {/* Circle check button */}
      <Pressable onPress={onToggle} style={styles.circleContainer}>
        {completed ? (
          <LinearGradient
            colors={["#57DDFF", "#C058F3"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientCircle}
          >
            <Text style={styles.checkMark}>✓</Text>
          </LinearGradient>
        ) : (
          <View
            style={[
              styles.circle,
              {
                borderColor: isDark ? "#393A4B" : "#E3E4F1",
              },
            ]}
          />
        )}
      </Pressable>

      {/* Task text */}
      <Text
        style={[
          styles.text,
          {
            color: completed
              ? isDark
                ? "#4D5067"
                : "#D1D2DA"
              : isDark
                ? "#C8CBE7"
                : "#494C6B",
            textDecorationLine: completed ? "line-through" : "none",
            fontFamily: fonts.regular,
          },
        ]}
      >
        {text}
      </Text>

      {/* Delete button */}
      <Pressable onPress={onDelete}>
        <Feather name="x" size={20} color={isDark ? "#777A92" : "#494C6B"} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    // paddingVertical: 15,
    paddingBottom: 20,
    paddingTop: 16,
    // paddingHorizontal: 10,
  },
  circleContainer: {
    marginRight: 12,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 11,
    borderWidth: 1,
  },
  gradientCircle: {
    width: 20,
    height: 20,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },
  checkMark: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
});
