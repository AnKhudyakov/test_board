import { TaskType } from './Task';

export interface BoardType {
  id: number;
  title: string;
  tasks: TaskType[];
}
