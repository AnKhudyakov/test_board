import { useContext, useEffect } from 'react';
import { ToDoContext } from '../../context';
import { ToDoContextType } from '../../types';
import ToDoItem from '../../components/ToDoItem/ToDoItem';
import styles from './ToDoListPage.module.scss';
import Layout from '../../components/Layout/Layout';

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
