import { useContext, useEffect } from 'react';
import { ReactComponent as CancelIcon } from '../../assets/icons/cancelIcon.svg';
import { ToDoContext } from '../../context';
import { BoardType, ToDoContextType } from '../../types';
import Button from '../Button/Button';
import styles from './Search.module.scss';

function Search() {
  const {
    activeToDo,
    setFilteredActiveTodo,
    search,
    setSearch,
  } = useContext(ToDoContext) as ToDoContextType;

  useEffect(() => {
    if (search && activeToDo) {
      setFilteredActiveTodo({
        ...activeToDo,
        boards: activeToDo.boards.map((board: BoardType) => {
          return {
            ...board,
            tasks: board.tasks.filter(
              (task) =>
                task.number.toLowerCase().includes(search.toLowerCase()) ||
                task.title.toLowerCase().includes(search.toLowerCase())
            ),
          };
        }),
      });
    } else {
      setFilteredActiveTodo(activeToDo);
    }
  }, [activeToDo, search]);

  return (
    <div className={styles.form}>
      <div className={styles.input_container}>
        <input
          className={styles.input}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search task by number..."
        />
      </div>
      {search && (
        <div className={styles.submit}>
          <Button type="submit" value="" onClick={() => setSearch('')}>
            <CancelIcon />
          </Button>
        </div>
      )}
    </div>
  );
}

export default Search;
