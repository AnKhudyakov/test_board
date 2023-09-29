import { Dispatch } from 'react';
import { IToDo } from './IToDo';
import { FormikValues } from 'formik';
import { DropResult } from 'react-beautiful-dnd';
import { TaskType, TaskValue } from './Task';
import { Comment } from './Comment';

export type ToDoContextType = {
  toDos: IToDo[];
  createToDo: (name: string) => void;
  setToDosFromLS: () => void;
  isToggled: boolean;
  setIsToggled: Dispatch<React.SetStateAction<boolean>>;
  toDoModal: boolean;
  setToDoModal: Dispatch<React.SetStateAction<boolean>>;
  taskModal: boolean;
  setTaskModal: Dispatch<React.SetStateAction<boolean>>;
  getToDo: (id: string) => IToDo | null;
  formik: FormikValues;
  activeToDo: IToDo | null;
  setActiveToDo: Dispatch<React.SetStateAction<IToDo | null>>;
  incrementDevTime: () => void;
  dnd: (result: DropResult) => void;
  addComment: (
    task: TaskType,
    content: string,
    activeComment: Comment | null
  ) => void;
  getComments: (
    activeComment: Comment,
    newComment: Comment,
    comments: Comment[]
  ) => Comment[];
  updateTask: (taskValue: TaskValue, oldTask: TaskType) => void;
  filteredActiveTodo: IToDo | null;
  setFilteredActiveTodo: Dispatch<React.SetStateAction<IToDo | null>>;
  search: string;
  setSearch: Dispatch<React.SetStateAction<string>>;
};
