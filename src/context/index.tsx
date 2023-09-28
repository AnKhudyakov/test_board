import { faker } from '@faker-js/faker';
import React, { createContext, useState } from 'react';
import {
  BoardType,
  Comment,
  IToDo,
  TaskType,
  TaskValue,
  ToDoContextType,
} from '../types';
import { initialBoard, initialTask } from '../heplers/initialValues';
import { useFormik } from 'formik';
import { DropResult } from 'react-beautiful-dnd';
import { findRow } from '../heplers/comment';

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
  const handleFormSubmit = async () => {
    //const activeToDo = getActive();
    if (activeToDo)
      //  updateToDo({ ...formik.values, id: activeToDo.id });
      // } else {
      createTask(formik.values, activeToDo);
  };

  const formik = useFormik({
    initialValues: initialTask,
    onSubmit: handleFormSubmit,
  });

  const createToDo = (name: string) => {
    const newToDo: IToDo = {
      toDoName: name,
      id: faker.string.uuid(),
      boards: initialBoard,
    };
    setToDos([...toDos, newToDo]);
    // setActiveToDoId(newToDo.id);
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
    localStorage.setItem('toDos', JSON.stringify(toDos));
    setTaskModal(false);
  };
  // const updateToDo = (updatedToDo: IToDo) => {
  //   const updatedToDos = toDos.map((toDo: IToDo) => {
  //     if (toDo.id === updatedToDo.id) {
  //       return updatedToDo;
  //     }
  //     return toDo;
  //   });
  //   setToDos([...updatedToDos]);
  //   localStorage.setItem("toDos", JSON.stringify([...updatedToDos]));
  // };

  // const removeToDo = (id: string) => {
  //   const newToDos = toDos.filter((toDo: IToDo) => {
  //     if (toDo.id != id) return toDo;
  //   });
  //   setToDos([...newToDos]);
  //   localStorage.setItem("toDos", JSON.stringify([...newToDos]));
  // };

  const getToDo = (id: string) => {
    const toDo = toDos.find((toDo) => toDo.id === id);
    return toDo ? toDo : null;
  };

  // const getActive = () => {
  //   let anctiveToDo: IToDo | undefined;
  //   if (activeToDoId) {
  //     anctiveToDo = toDos.find((toDo: IToDo) => toDo.id === activeToDoId);
  //   }
  //   return anctiveToDo;
  // };

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
      const undatedToDos = toDos.map((toDo) => {
        toDo.boards[1].tasks = toDo.boards[1].tasks.map((task) => {
          task.devTime += 1;
          return task;
        });
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
    // setComments(commentParent(projectId, id, newComment));
    // setCommentInput(false);
    // setCommentValue("");
  };

  const getComments = (
    activeComment: Comment,
    newComment: Comment,
    comments: Comment[]
  ) => {
    const parentId = activeComment.id;
    let stack= [...comments];

    while (stack.length > 0)
    { 
      let comment = stack.pop(); // Извлекаем комментарий из стека
      if (comment?.id === parentId) {
          // Найден активный комментарий, добавляем новый комментарий
          comment?.comments.push(newComment);
          return comments; // Выходим из цикла, так как задача выполнена
      }

      // Если у комментария есть вложенные комментарии, добавляем их в стек
      if (comment?.comments && comment.comments.length > 0) {
          stack = stack.concat(comment.comments);
      }
  }
      // const row = findRow(comments, parentId);
      // console.log("ROW",row);
      
      // if (!row) return [];
      // parent = row.comments;
      // console.log("Currentparent",parent);

    //if (!parent) return [];
    //parent.pop();
    // parent.push({
    //   ...newComment,
    //   comments: [],
    // });
    // console.log(parent);
    
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
        // updateToDo,
        // removeToDo,
        // setActive,
        // getActive,
        setToDosFromLS,
        activeToDo,
        setActiveToDo,
        incrementDevTime,
        addComment,
        getComments,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
};
