import { Link } from 'react-router-dom';
import { Comment, TaskType, ToDoContextType } from '../../types';
import styles from './TaskCard.module.scss';
import Comments from '../Comments/Comments';
import { useContext, useState } from 'react';
import { ToDoContext } from '../../context';
import Button from '../Button/Button';

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
  } = task;
  const { addComment } = useContext(ToDoContext) as ToDoContextType;
  const [comment, setComment] = useState<string>("");
  const [activeComment, setActiveComment] = useState<Comment | null>(null);

  const handleComment = (e: any) => {
    e.preventDefault();
    addComment(task, comment, activeComment);
    setComment("")
  };


  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <h2>{title}</h2>
      </div>
      <div className={styles.content}>
        <p className={styles.item}>{desc}</p>
        <p className={styles.item}>
          <strong>In Work:</strong>{' '}
          {task.devTime
            ? Math.floor(task.devTime / 60) + ':' + (task.devTime % 60)
            : '00:00'}
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
                    {file.name}, size: {`${(file.size / 1024).toFixed(2)} Кб`}
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
        <Comments comments={comments} activeComment={activeComment} setActiveComment={setActiveComment} />
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
          <Button type="submit" value={activeComment?"Add nested Comment":"Add Comment"}></Button>
        </form>

        <p className={styles.created}>{created.toString()}</p>
      </div>
    </div>
  );
}

export default TaskCard;
