import React from "react";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import TaskItem from "./TaskItem";
import { useTheme } from "@/Theme/ThemeContext";
import { Id } from "../convex/_generated/dataModel";

interface Task {
  _id: Id<"tasks">;
  text: string;
  completed: boolean;
  order: number;
  createdAt: number;
}

interface Props {
  isDark: boolean;
  tasks: Task[];
  onReorder: (data: Task[]) => void;
  onToggle: (id: Id<"tasks">) => void;
  onDelete: (id: Id<"tasks">) => void;
  clearCompleted: () => void;
}

export default function TaskList({
  isDark,
  tasks,
  onReorder,
  onToggle,
  onDelete,
  clearCompleted,
}: Props) {
  const { fonts } = useTheme();

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Task>) => {
    return (
      <Pressable
        onLongPress={drag}
        disabled={isActive}
        style={{ opacity: isActive ? 0.8 : 1 }}
      >
        <TaskItem
          text={item.text}
          isDark={isDark}
          completed={item.completed}
          onToggle={() => onToggle(item._id)}
          onDelete={() => onDelete(item._id)}
        />
      </Pressable>
    );
  };

  return (
    <View
      style={[
        styles.listContainer,
        {
          backgroundColor: isDark ? "#25273D" : "#FFFFFF",
          shadowColor: isDark ? "#000" : "#888",
          // height: 369,
        },
      ]}
    >
      <DraggableFlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        onDragEnd={({ data }) => onReorder(data)}
        contentContainerStyle={styles.listContent}
      />

      <View
        style={[
          styles.footer,
          {
            borderTopColor: isDark ? "#393A4B" : "#E3E4F1",
          },
        ]}
      >
        <Text
          style={{
            color: isDark ? "#777A92" : "#9495A5",
            fontSize: 14,
            fontFamily: fonts.regular,
          }}
        >
          {tasks.filter((t) => !t.completed).length} items left
        </Text>

        <Pressable onPress={clearCompleted}>
          <Text
            style={{
              color: isDark ? "#777A92" : "#9495A5",
              fontFamily: fonts.regular,
              fontSize: 14,
            }}
          >
            Clear Completed
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingBottom: 20,
    overflow: "hidden",
    ...Platform.select({
      android: {
        elevation: 8, // Android shadow
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
    }),
  },
  listContent: {
    paddingBottom: 20,
    height: 330,
  },
  listHeight: {},
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
  },
});
