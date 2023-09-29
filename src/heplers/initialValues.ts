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

export const initialTaskValue: TaskValue = {
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

export const initialUpdateTask = (task: TaskValue) => {
  return {
    title: task.title,
    desc: task.desc,
    created: task.created,
    devTime: task.devTime,
    deadline: task.deadline,
    prior: task.prior,
    files: task.files,
    status: task.status,
    tasks: task.tasks,
    comments: task.comments,
  };
};
