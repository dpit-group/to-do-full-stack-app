import type { Task, CreateTaskDto, UpdateTaskDto } from "../types/Task";
import { api } from "../api/client";

let nextId = 0;
function generateId(): string {
  return `task-${Date.now()}-${nextId++}`;
}

let tasks: Task[] = [
  {
    id: generateId(),
    text: "Cumpara lapte",
    selected: false,
    completed: false,
  },
  { id: generateId(), text: "Spala vasele", selected: false, completed: false },
  {
    id: generateId(),
    text: "Scrie raportul saptamanal",
    selected: false,
    completed: false,
  },
  {
    id: generateId(),
    text: "Plimba cainele",
    selected: false,
    completed: false,
  },
];

class TasksService {
  private readonly path = "/tasks";

  async getAll(): Promise<Task[]> {
    console.log("Fetching all tasks from API");
    const { data } = await api.get<Task[]>(this.path);
    console.log("Received tasks from API:", data);
    return data;
  }

  async getById(id: string): Promise<Task> {
    const { data } = await api.get<Task>(`${this.path}/${id}`);
    return data;
  }

  async create(dto: CreateTaskDto): Promise<Task> {
    const { data } = await api.post<Task>(this.path, dto);
    return data;
  }

  async update(id: string, dto: UpdateTaskDto): Promise<Task> {
    const { data } = await api.patch<Task>(`${this.path}/${id}`, dto);
    return data;
  }

  async toggleCompleted(task: Task): Promise<Task> {
    return this.update(task.id, { completed: !task.completed });
  }

  async remove(id: string): Promise<void> {
    await api.delete(`${this.path}/${id}`);
  }

  getPendingTasks(): Promise<Task[]> {
    return Promise.resolve(tasks.filter((task) => !task.completed));
  }

  getCompletedTasks(): Promise<Task[]> {
    return Promise.resolve(tasks.filter((task) => task.completed));
  }

  addTask(text: string): Promise<Task> {
    const task: Task = {
      id: generateId(),
      text,
      selected: false,
      completed: false,
    };
    tasks = [...tasks, task];
    return Promise.resolve(task);
  }

  setSelected(id: string, selected: boolean): Promise<Task> {
    tasks = tasks.map((task) =>
      task.id === id ? { ...task, selected } : task,
    );
    const task = tasks.find((t) => t.id === id);
    if (!task) return Promise.reject(new Error(`Task ${id} not found`));
    return Promise.resolve(task);
  }

  markCompleted(ids: string[]): Promise<void> {
    tasks = tasks.map((task) =>
      ids.includes(task.id)
        ? { ...task, completed: true, selected: false }
        : task,
    );
    return Promise.resolve();
  }

  deleteTasks(ids: string[]): Promise<void> {
    tasks = tasks.filter((task) => !ids.includes(task.id));
    return Promise.resolve();
  }
}

export const tasksService = new TasksService();
