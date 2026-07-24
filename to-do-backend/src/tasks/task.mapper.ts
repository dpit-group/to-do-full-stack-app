import { Task } from './entities/task.entity';
import { TaskResponseDto } from './dto/task-response.dto';

export class TaskMapper {
  static toResponseDto(task: Task): TaskResponseDto {
    return {
      id: task.id,
      text: task.text,
      selected: task.selected,
      completed: task.completed,
    };
  }

  static toResponseDtoList(tasks: Task[]): TaskResponseDto[] {
    return tasks.map((task) => TaskMapper.toResponseDto(task));
  }
}
