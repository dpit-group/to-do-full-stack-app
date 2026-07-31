import type { Task } from '../types/Task';

let nextId = 0;
function generateId(): string {
  return `task-${Date.now()}-${nextId++}`;
}

let tasks: Task[] = [
  { id: generateId(), text: 'Cumpara lapte', selected: false, completed: false, deleted: false, deletedAt: '' },
  { id: generateId(), text: 'Spala vasele', selected: false, completed: false, deleted: false, deletedAt:''  },
  { id: generateId(), text: 'Scrie raportul saptamanal', selected: false, completed: false, deleted: false, deletedAt: '' },
  { id: generateId(), text: 'Plimba cainele', selected: false, completed: false, deleted: false, deletedAt: ''  }
];

class TasksService {
  getPendingTasks(): Promise<Task[]> {
    return Promise.resolve(tasks.filter((task) => !task.completed && !task.deleted));
  }

  getCompletedTasks(): Promise<Task[]> {
    return Promise.resolve(tasks.filter((task) => task.completed&& !task.deleted));
  }
  getDeletedTasks(): Promise<Task[]> {
    return Promise.resolve(tasks.filter((task) => task.deleted));
  }


  addTask(text: string): Promise<Task> {
    const task: Task = {
      id: generateId(),
      text,
      selected: false,
      completed: false,
      deleted: false,
      deletedAt: '',
    };
    tasks = [...tasks, task];
    return Promise.resolve(task);
  }

  setSelected(id: string, selected: boolean): Promise<Task> {
    tasks = tasks.map((task) => (task.id === id ? { ...task, selected } : task));
    const task = tasks.find((t) => t.id === id);
    if (!task) return Promise.reject(new Error(`Task ${id} not found`));
    return Promise.resolve(task);
  }

  markCompleted(ids: string[]): Promise<void> {
    tasks = tasks.map((task) =>
      ids.includes(task.id) ? { ...task, completed: true, selected: false } : task,
    );
    return Promise.resolve();
  }

  deleteTasks(ids: string[]): Promise<void> {
    const deletedAt = new Date().toISOString();
    tasks = tasks.map((task) =>
      ids.includes(task.id) ? { ...task, deleted: true, selected: false, deletedAt } : task,
    );
    return Promise.resolve();
  }
}

export const tasksService = new TasksService();
