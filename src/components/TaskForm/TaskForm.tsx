import { Dispatch, useContext, useEffect, useState } from 'react';
import { ToDoContext } from '../../context';
import { File, IToDo, ToDoContextType } from '../../types';
import styles from './TaskForm.module.scss';
import Button from '../Button/Button';
import Uploader from '../Uploader/Uploader';

type TaskFormProps = {
  toDo: IToDo | null;
};

function TaskForm({ toDo }: TaskFormProps) {
  const { createToDo, setToDoModal, toDos, formik } = useContext(
    ToDoContext
  ) as ToDoContextType;
  const [error, setError] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  //console.log(formik.values);

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.input_container}>
          <input
            className={styles.input}
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            placeholder="Title"
            autoFocus
          />
          <textarea
            className={styles.textarea}
            name="desc"
            rows={3}
            value={formik.values.desc}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Description"
          />
          <Uploader files={files} setFiles={setFiles} />
          <div className={styles.radio}>
          <h4>Priority:</h4>
          <label className={styles.label}>
          <input
              onChange={formik.handleChange}
              type="radio"
              name="prior"
              value={'Low'}
              checked={formik.values.prior === 'Low'}
            />
            Low
          </label>
          <label className={styles.label}>
            <input
              onChange={formik.handleChange}
              type="radio"
              name="prior"
              value={'Medium'}
              checked={formik.values.prior === 'Medium'}
            />
             Medium
          </label>
          <label className={styles.label}>
            <input
              onChange={formik.handleChange}
              type="radio"
              name="prior"
              value={'High'}
              checked={formik.values.prior === 'High'}
            />
            High
          </label>
          </div>
          <input
            className={styles.date}
            type="date"
            name="deadline"
            value={formik.values.deadline}
            onChange={formik.handleChange}
          />
          {
            <h5 className={error ? styles.error_active : styles.error}>
              No name provided
            </h5>
          }
        </div>
        <Button type="submit" value="Add new"></Button>
      </form>
    </>
  );
}

export default TaskForm;
