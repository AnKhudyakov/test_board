import { useContext, useEffect, useState } from 'react';
import { ToDoContext } from '../../context';
import { BoardType, IToDo, TaskType, ToDoContextType } from '../../types';
import ToDoItem from '../../components/ToDoItem/ToDoItem';
import styles from './BoardPage.module.scss';
import { useParams } from 'react-router-dom';
import Board from '../../components/Board/Board';
import Layout from '../../components/Layout/Layout';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

function BoardPage() {
  const { id } = useParams();
  const { toDos, getToDo, setActiveToDo, activeToDo, dnd } = useContext(
    ToDoContext
  ) as ToDoContextType;

  useEffect(() => {
    if (toDos && id && getToDo(id)) setActiveToDo(getToDo(id));
  }, [toDos]);

  const onDragEnd = (result: DropResult) => {
    dnd(result)
  }

  return (
    <Layout>
      <div className={styles.container}>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={styles.boards}>
            {activeToDo?.boards.map((board) => (
              <Board board={board} key={board.id} />
            ))}
          </div>
        </DragDropContext>
      </div>
    </Layout>
  );
}

export default BoardPage;
