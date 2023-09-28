import { BoardType } from './Board';

export interface IToDo {
  id: string;
  toDoName: string;
  boards: BoardType[];
}
