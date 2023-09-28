import { BoardType, TaskValue } from '../types';

export const initialBoard: BoardType[] = [
  {
    id: 0,
    title: 'Queue',
    tasks: [],
  },
  {
    id: 1,
    title: 'Development',
    tasks: [],
  },
  {
    id: 2,
    title: 'Done',
    tasks: [],
  },
];

export const initialTask: TaskValue = {
  title: '',
  desc: '',
  created: new Date().toDateString(),
  devTime: 0,
  deadline: '',
  prior: 'Medium',
  files: [],
  status: 'Queue',
  tasks: [],
  comments: [],
};
