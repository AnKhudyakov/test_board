import { useContext, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import Board from '../../components/Board/Board';
import Layout from '../../components/Layout/Layout';
import { ToDoContext } from '../../context';
import { ToDoContextType } from '../../types';
import styles from './BoardPage.module.scss';

function BoardPage() {
  const { id } = useParams();
  const {
    toDos,
    getToDo,
    setActiveToDo,
    filteredActiveTodo,
    dnd,
  } = useContext(ToDoContext) as ToDoContextType;

  useEffect(() => {
    if (toDos && id && getToDo(id)) setActiveToDo(getToDo(id));
  }, [toDos, id]);

  const onDragEnd = (result: DropResult) => {
    dnd(result);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={styles.boards}>
            {filteredActiveTodo?.boards.map((board) => (
              <Board board={board} key={board.id} />
            ))}
          </div>
        </DragDropContext>
      </div>
    </Layout>
  );
}

export default BoardPage;
