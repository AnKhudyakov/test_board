import { Comment } from './Comment';
import { File } from './File';

export interface TaskValue {
  title: string;
  desc: string;
  created: Date | string;
  devTime: number;
  deadline: string;
  prior: string;
  files?: File[];
  status: string;
  tasks: TaskType[];
  comments: Comment[];
}

export interface TaskType extends TaskValue {
  id: string;
  number: string;
}
