import { useTheme } from "@/Theme/ThemeContext";
import React, { useState } from "react";
import { View, TextInput, StyleSheet, Keyboard } from "react-native";

interface Props {
  onAddTask: (task: string) => void;
  isDark: boolean;
}

export default function TaskInput({ onAddTask, isDark }: Props) {
  const [task, setTask] = useState("");
  const { fonts } = useTheme();

  const handleAdd = () => {
    if (task.trim().length === 0) return;
    onAddTask(task);
    setTask("");
    Keyboard.dismiss();
  };

  return (
    <View
      style={[
        styles.inputContainer,
        {
          backgroundColor: isDark ? "#25273D" : "#FFFFFF",
        },
      ]}
    >
      {/* Circle beside input */}
      <View
        style={[
          styles.circle,
          {
            borderColor: isDark ? "#393A4B" : "#E3E4F1",
          },
        ]}
      />

      {/* Input field */}
      <TextInput
        value={task}
        onChangeText={setTask}
        placeholder="Create a new todo…"
        placeholderTextColor={isDark ? "#767992" : "#9495A5"}
        style={[
          styles.input,
          {
            color: isDark ? "#C8CBE7" : "#393A4B",
            fontFamily: fonts.regular,
          },
        ]}
        returnKeyType="done"
        onSubmitEditing={handleAdd}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginBottom: 20,
  },
  circle: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderRadius: 12, // perfect circle
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 12,
    fontFamily: "Josefin Sans",
  },
});
