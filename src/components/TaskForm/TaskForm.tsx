import { Dispatch, useContext, useEffect, useState } from 'react';
import { ToDoContext } from '../../context';
import { File, IToDo, ToDoContextType } from '../../types';
import styles from './TaskForm.module.scss';
import Button from '../Button/Button';
import Uploader from '../Uploader/Uploader';
import { FormikValues } from 'formik';

type TaskFormProps = {
  updatedFormik?: FormikValues;
  currentFiles?: File[];
};

function TaskForm({ updatedFormik, currentFiles }: TaskFormProps) {
  const { formik } = useContext(ToDoContext) as ToDoContextType;
  const [error, setError] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>(currentFiles ? currentFiles : []);
  const activeFormik = updatedFormik ? updatedFormik : formik;

  return (
    <>
      <form onSubmit={activeFormik.handleSubmit} className={styles.form}>
        <div className={styles.input_container}>
          <div>
            <label className={styles.label}>Title:</label>
            <input
              className={styles.input}
              name="title"
              value={activeFormik.values.title}
              onChange={activeFormik.handleChange}
              onBlur={activeFormik.handleBlur}
              type="text"
              placeholder="Please enter task title here..."
              autoFocus
            />
          </div>
          <div>
            <label className={styles.label}>Description:</label>
            <textarea
              className={styles.textarea}
              name="desc"
              rows={3}
              value={activeFormik.values.desc}
              onChange={activeFormik.handleChange}
              onBlur={activeFormik.handleBlur}
              placeholder="Please enter task description here..."
            />
          </div>
          <div>
            <label className={styles.label}>Files:</label>
            <Uploader files={files} setFiles={setFiles} />
          </div>
          <div className={styles.radio}>
            <label className={styles.label}>Priority:</label>
            <label className={styles.label}>
              <input
                onChange={activeFormik.handleChange}
                type="radio"
                name="prior"
                value={'Low'}
                checked={activeFormik.values.prior === 'Low'}
              />
              Low
            </label>
            <label className={styles.label}>
              <input
                onChange={activeFormik.handleChange}
                type="radio"
                name="prior"
                value={'Medium'}
                checked={activeFormik.values.prior === 'Medium'}
              />
              Medium
            </label>
            <label className={styles.label}>
              <input
                onChange={activeFormik.handleChange}
                type="radio"
                name="prior"
                value={'High'}
                checked={activeFormik.values.prior === 'High'}
              />
              High
            </label>
          </div>
          <div>
            <label className={styles.label}>Deadline:</label>
            <input
              className={styles.date}
              type="date"
              name="deadline"
              value={activeFormik.values.deadline}
              onChange={activeFormik.handleChange}
            />
          </div>
          {
            <h5 className={error ? styles.error_active : styles.error}>
              No name provided
            </h5>
          }
        </div>
        <Button
          type="submit"
          value={updatedFormik ? 'Save' : 'Add new'}
          disabled={!activeFormik.dirty}
        ></Button>
      </form>
    </>
  );
}

export default TaskForm;
