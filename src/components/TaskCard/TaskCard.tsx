import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as BackIcon } from '../../assets/icons/backIcon.svg';
import { ReactComponent as EditIcon } from '../../assets/icons/editIcon.svg';
import { ToDoContext } from '../../context';
import { initialUpdateTask } from '../../heplers/initialValues';
import { Comment, TaskType, ToDoContextType } from '../../types';
import Button from '../Button/Button';
import Comments from '../Comments/Comments';
import TaskForm from '../TaskForm/TaskForm';
import styles from './TaskCard.module.scss';

type TaskCardProps = {
  task: TaskType;
};

function TaskCard({ task }: TaskCardProps) {
  const {
    title,
    desc,
    created,
    deadline,
    prior,
    files,
    status,
    tasks,
    comments,
    devTime,
  } = task;
  const { addComment, updateTask, formik } = useContext(
    ToDoContext
  ) as ToDoContextType;
  const [comment, setComment] = useState<string>('');
  const [edit, setEdit] = useState<boolean>(false);
  const [isNested, setIsNested] = useState<boolean>(false);
  const [activeComment, setActiveComment] = useState<Comment | null>(null);
  const [timer, setTimer] = useState<number>(0);
  const handleComment = (e: any) => {
    e.preventDefault();
    addComment(task, comment, activeComment);
    setComment('');
  };

  const handleFormSubmit = async () => {
    if (task) {
      updateTask(updatedFormik.values, task);
      setEdit(false);
    }
  };

  const updatedFormik = useFormik({
    initialValues: initialUpdateTask(task),
    onSubmit: handleFormSubmit,
  });

  useEffect(() => {
    setTimer(devTime);
  }, [devTime]);

  return (
    <div className={styles.container}>
      {!edit ? (
        <div className={styles.container_card}>
          <div className={styles.head}>
            <h2>{title}</h2>
          </div>
          <div className={styles.content}>
            <p className={styles.item}>{desc}</p>
            <p className={styles.item}>
              <strong>In Work:</strong>{' '}
              {timer
                ? Math.floor(timer / 3600) +
                  'h:' +
                  Math.floor((timer / 60) % 60) +
                  'm:' +
                  Math.floor(timer % 60) +
                  's'
                : '00:00:00'}
            </p>
            <p className={styles.item}>
              <strong>Deadline: </strong>
              {deadline}
            </p>
            <p className={styles.item}>
              <strong>Priority: </strong>
              {prior}
            </p>
            <p className={styles.item}>
              <strong>Status: </strong>
              {status}
            </p>
            <ul>
              <strong>Tasks:</strong>
              {tasks?.length
                ? tasks.map((task) => (
                    <div key={task.id} className={styles.file}>
                      <p>
                        {task.number}
                        {task.title}
                      </p>
                    </div>
                  ))
                : ' No Tasks'}
              <div className={styles.btn}>
                <Button
                  value="Add nested task"
                  onClick={() => {
                    setIsNested(true);
                    setEdit(true);
                  }}
                ></Button>
              </div>
            </ul>
            <ul>
              <strong> Files:</strong>
              {files?.length
                ? files.map((file) => (
                    <div key={file.name} className={styles.file}>
                      <Link
                        to={file.url}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.link}
                        download
                      >
                        {file.name}, size:{' '}
                        {`${(file.size / 1024).toFixed(2)} Кб`}
                      </Link>
                      <Link className={styles.download} to={file.url} download>
                        Download
                      </Link>
                    </div>
                  ))
                : ' No Files'}
            </ul>
            <div className={styles.comments}>
              <strong> Comments:</strong>
              <Comments
                comments={comments}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
              />
            </div>
            <form onSubmit={(e) => handleComment(e)} className={styles.comment}>
              <input
                className={styles.input}
                autoFocus
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Comment"
                width={150}
              />
              <Button
                type="submit"
                value={activeComment ? 'Add nested Comment' : 'Add Comment'}
              ></Button>
            </form>

            <p className={styles.created}>{created.toString()}</p>
          </div>
          <div className={styles.edit}>
            <Button
              value=""
              onClick={() => {
                setEdit(true);
              }}
            >
              <EditIcon />
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <TaskForm
            updatedFormik={isNested ? null : updatedFormik}
            currentFiles={isNested ? [] : task.files}
          />
          <div className={styles.edit}>
            <Button
              type="button"
              value=""
              onClick={() => {
                setEdit(false);
                setIsNested(false);
              }}
            >
              <BackIcon />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskCard;
