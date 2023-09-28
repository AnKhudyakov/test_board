import { Link } from 'react-router-dom';
import { IToDo } from '../../types';
import styles from './ToDoItem.module.scss';

type ToDoItemProps = {
  toDo: IToDo;
};

function ToDoItem({ toDo }: ToDoItemProps) {
  return (
    <Link to={`/project/${toDo.id}`} className={styles.container}>
      <h4 className={styles.head}>Name</h4>
      <h4 className={styles.head}>Queue</h4>
      <h4 className={styles.head}>Development</h4>
      <h4 className={styles.head}>Done</h4>
      <h2 className={styles.title}>{toDo.toDoName}</h2>

      {toDo.boards &&
        toDo.boards.map((board) => {
          return (
            <h5 key={board.id} className={styles.head}>
              <span>{board.tasks.length}</span>
            </h5>
          );
        })}
    </Link>
  );
}

export default ToDoItem;
