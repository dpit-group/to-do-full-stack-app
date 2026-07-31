import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { TaskItem } from '../components/TaskItem';
import { tasksService } from '../services/TasksService';
import type { Task } from '../types/Task';

export function DeletedTaskScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = useCallback(() => {
    tasksService.getDeletedTasks().then(setTasks);
  }, []);

  useFocusEffect(loadTasks);

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
            onToggle={() => {}}
            subtitle={item.deletedAt ? new Date(item.deletedAt).toLocaleString() : undefined}
            showCheckbox={false}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Niciun task sters</Text>}
      />

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
