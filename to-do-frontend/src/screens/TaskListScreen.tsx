import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { TaskItem } from "../components/TaskItem";
import { tasksService } from "../services/TasksService";
import type { Task } from "../types/Task";

export function TaskListScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  const loadTasks = useCallback(() => {
    tasksService.getPendingTasks().then(setTasks);
  }, []);

  useFocusEffect(loadTasks);

  async function handleAdd() {
    const text = input.trim();
    if (!text) return;
    setInput("");
    await tasksService.addTask(text);
    loadTasks();
  }

  async function handleToggle(id: string) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    await tasksService.setSelected(id, !task.selected);
    loadTasks();
  }

  async function handleMarkDone() {
    const ids = tasks.filter((t) => t.selected).map((t) => t.id);
    if (ids.length === 0) return;
    await tasksService.markCompleted(ids);
    loadTasks();
  }

  useEffect(() => {
    tasksService
      .getAll()
      .then((data) => {
        console.log("Taskuri primite de service: ", data);
        setTasks(data);
      })
      .catch((err) => {
        console.error("Eroare la încărcarea taskurilor:", err);
        console.error("Nu am putut încărca taskurile");
      })
      .finally(() => console.log("Încărcarea taskurilor finalizată"));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Task nou"
          onSubmitEditing={handleAdd}
        />
        <Button title="ADD" onPress={handleAdd} />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            id={item.id}
            text={item.text}
            selected={item.selected}
            onToggle={handleToggle}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Niciun task</Text>}
      />

      <View style={styles.doneRow}>
        <Button title="DONE" onPress={handleMarkDone} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  doneRow: {
    marginTop: 16,
  },
  empty: {
    textAlign: "center",
    color: "#888",
    marginTop: 24,
  },
});
