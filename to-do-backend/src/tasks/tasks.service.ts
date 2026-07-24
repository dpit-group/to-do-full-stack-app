import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskMapper } from './task.mapper';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  findAll(completed?: boolean): TaskResponseDto[] {
    const tasks =
      completed === undefined
        ? this.tasksRepository.tasks
        : this.tasksRepository.tasks.filter((t) => t.completed === completed);
    return TaskMapper.toResponseDtoList(tasks);
  }

  findOne(id: string): TaskResponseDto {
    return TaskMapper.toResponseDto(this.findTaskOrThrow(id));
  }

  create(createTaskDto: CreateTaskDto): TaskResponseDto {
    const task: Task = {
      id: randomUUID(),
      text: createTaskDto.text,
      selected: false,
      completed: false,
      createdAt: new Date(),
    };
    this.tasksRepository.tasks.push(task);
    return TaskMapper.toResponseDto(task);
  }

  update(id: string, updateTaskDto: UpdateTaskDto): TaskResponseDto {
    const task = this.findTaskOrThrow(id);
    Object.assign(task, updateTaskDto);
    return TaskMapper.toResponseDto(task);
  }

  remove(id: string): void {
    const index = this.tasksRepository.tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    this.tasksRepository.tasks.splice(index, 1);
  }

  private findTaskOrThrow(id: string): Task {
    const task = this.tasksRepository.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }
}
