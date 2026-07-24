import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { TaskItem } from '../components/TaskItem';
import { tasksService } from '../services/TasksService';
import type { Task } from '../types/Task';

export function CompleteTaskScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = useCallback(() => {
    tasksService.getCompletedTasks().then(setTasks);
  }, []);

  useFocusEffect(loadTasks);

  async function handleToggle(id: string) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    await tasksService.setSelected(id, !task.selected);
    loadTasks();
  }

  async function handleDelete() {
    const ids = tasks.filter((t) => t.selected).map((t) => t.id);
    if (ids.length === 0) return;
    await tasksService.deleteTasks(ids);
    loadTasks();
  }

  return (
    <View style={styles.container}>
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
        ListEmptyComponent={<Text style={styles.empty}>Niciun task finalizat</Text>}
      />

      <View style={styles.deleteRow}>
        <Button title="DELETE" onPress={handleDelete} color="#c0392b" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  deleteRow: {
    marginTop: 16,
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    marginTop: 24,
  },
});
