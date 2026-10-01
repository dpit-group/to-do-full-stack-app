export type Task = {
  id: string;
  text: string;
  selected: boolean;
  completed: boolean;
};

export type CreateTaskDto = {
  text: string;
  selected?: boolean;
  completed?: boolean;
};

export type UpdateTaskDto = {
  text?: string;
  selected?: boolean;
  completed?: boolean;
};
