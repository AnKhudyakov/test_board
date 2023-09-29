import { faker } from '@faker-js/faker';
import { useFormik } from 'formik';
import React, { createContext, useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { initialBoard, initialTaskValue } from '../heplers/initialValues';
import {
  BoardType,
  Comment,
  IToDo,
  TaskType,
  TaskValue,
  ToDoContextType,
} from '../types';

type ToDoProviderProps = {
  children: React.ReactNode;
};

export const ToDoContext = createContext<ToDoContextType | null>(null);

export const TodoProvider = ({ children }: ToDoProviderProps) => {
  const [toDos, setToDos] = useState<IToDo[]>([]);
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [toDoModal, setToDoModal] = useState<boolean>(false);
  const [taskModal, setTaskModal] = useState<boolean>(false);
  const [activeToDo, setActiveToDo] = useState<IToDo | null>(null);
  const [search, setSearch] = useState<string>('');
  const [filteredActiveTodo, setFilteredActiveTodo] = useState<IToDo | null>(
    activeToDo
  );

  const handleFormSubmit = async () => {
    if (activeToDo) createTask(formik.values, activeToDo);
  };

  const formik = useFormik({
    initialValues: initialTaskValue,
    onSubmit: handleFormSubmit,
  });

  const createToDo = (name: string) => {
    const newToDo: IToDo = {
      toDoName: name,
      id: faker.string.uuid(),
      boards: initialBoard,
    };
    setToDos([...toDos, newToDo]);
    localStorage.setItem('toDos', JSON.stringify([newToDo, ...toDos]));
    setToDoModal(false);
  };

  const createTask = (task: TaskValue, toDo: IToDo) => {
    const newTask: TaskType = {
      ...task,
      id: faker.string.uuid(),
      number: faker.string.alphanumeric(5),
    };

    const updatedToDos = toDos.map((updatedToDo) => {
      if (updatedToDo.id === toDo.id)
        updatedToDo.boards[0].tasks = [...updatedToDo.boards[0].tasks, newTask];
      return updatedToDo;
    });
    setToDos(updatedToDos);
    localStorage.setItem('toDos', JSON.stringify(updatedToDos));
    setTaskModal(false);
  };

  const updateTask = (taskValue: TaskValue, oldTask: TaskType) => {
    if (!activeToDo) return;
    const updatedTask: TaskType = { ...oldTask, ...taskValue };
    const updatedToDos: IToDo[] = toDos.map((updatedToDo: IToDo) => {
      return updatedToDo.id === activeToDo?.id
        ? {
            ...activeToDo,
            boards: activeToDo.boards.map((board) => {
              return {
                ...board,
                tasks: board.tasks.map((task: TaskType) => {
                  return updatedTask.id === task.id ? { ...updatedTask } : task;
                }),
              };
            }),
          }
        : activeToDo;
    });
    setToDos(updatedToDos);
    localStorage.setItem('toDos', JSON.stringify(updatedToDos));
  };

  const getToDo = (id: string) => {
    const toDo = toDos.find((toDo) => toDo.id === id);
    return toDo ? toDo : null;
  };

  const setToDosFromLS = () => {
    if (localStorage.length) {
      const toDoCash = localStorage.getItem('toDos');
      if (toDoCash) {
        setToDos(JSON.parse(toDoCash));
      }
    } else {
      localStorage.setItem('toDos', JSON.stringify(toDos));
    }
  };

  const incrementDevTime = () => {
    const interval = setInterval(() => {
      toDos.map((toDo) => {
        toDo.boards[1].tasks = toDo.boards[1].tasks.map((task) => {
          task.devTime += 1;
          return task;
        });
        return toDo;
      });
    }, 1000);
    return () => clearInterval(interval);
  };

  const dnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    const sourceBoardIndex = activeToDo?.boards.findIndex(
      (board) => board.id === +source.droppableId
    );
    const destinationBoardIndex = activeToDo?.boards.findIndex(
      (board) => board.id === +destination.droppableId
    );
    if (sourceBoardIndex === undefined || destinationBoardIndex === undefined)
      return;
    const sourceBoard = activeToDo?.boards[sourceBoardIndex];
    const destinationBoard = activeToDo?.boards[destinationBoardIndex];

    const movedTask = sourceBoard?.tasks.find(
      (task: TaskType) => task.id === draggableId
    );
    if (!movedTask || !sourceBoard || !destinationBoard) {
      return;
    }
    const newSourceTasks = [...sourceBoard.tasks];
    newSourceTasks.splice(source.index, 1);

    const newDestinationTasks = [...destinationBoard.tasks];
    newDestinationTasks.splice(destination.index, 0, movedTask);

    const newBoards: BoardType[] = [...activeToDo.boards];
    newBoards[sourceBoardIndex] = { ...sourceBoard, tasks: newSourceTasks };
    newBoards[destinationBoardIndex] = {
      ...destinationBoard,
      tasks: newDestinationTasks,
    };
    const newToDos = toDos.map((toDo) => {
      return toDo.id === activeToDo.id
        ? { ...activeToDo, boards: newBoards }
        : toDo;
    });
    setToDos(newToDos);
    localStorage.setItem('toDos', JSON.stringify(newToDos));
  };

  const addComment = (
    task: TaskType,
    content: string,
    activeComment: Comment | null
  ) => {
    const newComment: Comment = {
      id: faker.string.uuid(),
      content,
      comments: [],
      created: new Date().toString().slice(0, 23),
    };
    const updatedToDos: IToDo[] = toDos.map((toDo: IToDo) => {
      return toDo.id === activeToDo?.id
        ? {
            ...toDo,
            boards: toDo.boards.map((board) => {
              return {
                ...board,
                tasks: board.tasks.map((updatedTask: TaskType) => {
                  return updatedTask.id === task.id
                    ? {
                        ...updatedTask,
                        comments: activeComment
                          ? getComments(
                              activeComment,
                              newComment,
                              updatedTask.comments
                            )
                          : [...updatedTask.comments, newComment],
                      }
                    : updatedTask;
                }),
              };
            }),
          }
        : toDo;
    });
    setToDos(updatedToDos);
    localStorage.setItem('toDos', JSON.stringify(updatedToDos));
  };

  const getComments = (
    activeComment: Comment,
    newComment: Comment,
    comments: Comment[]
  ) => {
    const parentId = activeComment.id;
    let stack = [...comments];

    while (stack.length > 0) {
      let comment = stack.pop();
      if (comment?.id === parentId) {
        comment?.comments.push(newComment);
        return comments;
      }
      if (comment?.comments && comment.comments.length > 0) {
        stack = stack.concat(comment.comments);
      }
    }

    return stack;
  };

  return (
    <ToDoContext.Provider
      value={{
        toDos,
        isToggled,
        setIsToggled,
        toDoModal,
        setToDoModal,
        taskModal,
        setTaskModal,
        createToDo,
        getToDo,
        formik,
        dnd,
        setToDosFromLS,
        activeToDo,
        setActiveToDo,
        incrementDevTime,
        addComment,
        getComments,
        updateTask,
        filteredActiveTodo,
        setFilteredActiveTodo,
        search,
        setSearch,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
};
