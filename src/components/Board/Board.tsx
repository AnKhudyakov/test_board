import { Droppable } from 'react-beautiful-dnd';
import { BoardType } from '../../types';
import Task from '../Task/Task';
import styles from './Board.module.scss';

type BoardProps = {
  board: BoardType;
 
};

function Board({ board }: BoardProps) {
  
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <h2>{board.title}</h2>
      </div>

      <div className={styles.content}>
        <Droppable droppableId={board.id.toString()}>
          {(provided,snapshot) => (
            <div className={snapshot.isDraggingOver?styles.dnd_zone_active:styles.dnd_zone}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {board.tasks.map((task, index) => (
                <Task task={task} key={task.id} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
}

export default Board;
