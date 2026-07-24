import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksRepository {
  tasks: Task[] = [
    {
      id: randomUUID(),
      text: 'Cumpara lapte',
      selected: false,
      completed: false,
      createdAt: new Date(),
    },
    {
      id: randomUUID(),
      text: 'Spala vasele',
      selected: false,
      completed: false,
      createdAt: new Date(),
    },
    {
      id: randomUUID(),
      text: 'Scrie raportul saptamanal',
      selected: false,
      completed: false,
      createdAt: new Date(),
    },
    {
      id: randomUUID(),
      text: 'Plimba cainele',
      selected: false,
      completed: false,
      createdAt: new Date(),
    },
  ];
}
