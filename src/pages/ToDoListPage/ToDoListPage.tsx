import { useContext } from 'react';
import Layout from '../../components/Layout/Layout';
import ToDoItem from '../../components/ToDoItem/ToDoItem';
import { ToDoContext } from '../../context';
import { ToDoContextType } from '../../types';
import styles from './ToDoListPage.module.scss';

function ToDoListPage() {
  const { toDos } = useContext(ToDoContext) as ToDoContextType;

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.list}>
          {!toDos.length && <div>No ToDos</div>}
          {toDos.map((toDo) => (
            <ToDoItem toDo={toDo} key={toDo.id} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default ToDoListPage;
