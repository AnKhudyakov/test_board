import { Dispatch, useContext, useState } from 'react';
import { ToDoContext } from '../../context';
import { ToDoContextType } from '../../types';
import styles from './ToDoForm.module.scss';
import Button from '../Button/Button';

// type ToDoFormProps = {
//   name: string;
//   setName: Dispatch<React.SetStateAction<string>>;
// };

function ToDoForm() {
  const { createToDo, setToDoModal } = useContext(
    ToDoContext
  ) as ToDoContextType;
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const handleCreate = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!name) {
      setError(true);
    } else {
      createToDo(name);
      setName('');
    }
  };
  return (
    <>
      <form onSubmit={handleCreate} className={styles.form}>
        <div className={styles.input_container}>
        <input
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Project name"
        />
        { <h5 className={error?styles.error_active:styles.error}>No name provided</h5>}
        </div>
        <Button type="submit" value="Add new"></Button>
      </form>
    </>
  );
}

export default ToDoForm;
