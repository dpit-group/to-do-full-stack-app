import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { TaskItem } from '../components/TaskItem';
import {SelectItem} from '../components/SelectItem';
import { tasksService } from '../services/TasksService';
import type { Task } from '../types/Task';
import { DeletedItem } from '../components/DeletedItem';

export function DeletedTaskScreen()
{
    const [tasks, setTasks] = useState<Task[]>([]);

    const loadTasks = useCallback(() => {
    tasksService.getDeletedTasks().then(setTasks);
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
          <DeletedItem
            id={item.id}
            text={item.text}
            selected={item.selected}
            onToggle={handleToggle}
            min={item.min}
            sec={item.sec}
            hour={item.hour}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Niciun task</Text>}
        />
        </View>

    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  doneRow: {
    marginTop: 16,
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    marginTop: 24,
  },
});