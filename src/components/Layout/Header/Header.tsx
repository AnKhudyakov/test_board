import { useContext, useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { ToDoContext } from '../../../context';
import { IToDo, ToDoContextType } from '../../../types';
import Button from '../../Button/Button';
import Modal from '../../Modal/Modal';
import ToDoForm from '../../ToDoForm/ToDoForm';
import { Link, useParams } from 'react-router-dom';
import TaskForm from '../../TaskForm/TaskForm';
import Search from '../../Search/Search';

function Header() {
  const { id } = useParams();
  const { toDoModal, setToDoModal, taskModal, setTaskModal, toDos, getToDo } =
    useContext(ToDoContext) as ToDoContextType;
  const [toDo, setToDo] = useState<IToDo | null>(null);
  const setModal = id ? setTaskModal : setToDoModal;
  const modal = id ? taskModal : toDoModal;
  const title = id ? 'Task' : 'Project';

  useEffect(() => {
    if (toDos && id && getToDo(id)) setToDo(getToDo(id));
  }, [toDos]);

  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <div className={styles.toolbar}>
          <Link to="/" className={id ? styles.link : styles.link_active}>
            Projects
          </Link>
          <Button
            onClick={() => setModal(true)}
            value={id ? 'Add task' : 'Add project'}
          ></Button>
        </div>
        {id && <Search />}
      </nav>
      <Modal
        visible={modal}
        setVisible={setModal}
        title={`New ${title} creation`}
      >
        {id ? <TaskForm /> : <ToDoForm />}
      </Modal>
    </header>
  );
}

export default Header;
