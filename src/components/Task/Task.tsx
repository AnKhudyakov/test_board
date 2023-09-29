import { Link } from 'react-router-dom';
import { IToDo, TaskType } from '../../types';
import styles from './Task.module.scss';
import { Draggable } from 'react-beautiful-dnd';
import Modal from '../Modal/Modal';
import TaskCard from '../TaskCard/TaskCard';
import { useState } from 'react';

type TaskProps = {
  task: TaskType;
  index: number;
};

function Task({ task, index }: TaskProps) {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <div
            className={styles.dnd_item}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className={styles.container} onClick={() => setVisible(true)}>
              <div className={styles.head}>
                <h4>#{task.number}</h4>
                <h2>Name:{task.title}</h2>
              </div>
              <div className={styles.content}>
                {/* <p>{task.desc}</p> */}
                <p>Created:{task.created.toString()}</p>
                {/* <p>In Work: {task.devTime}</p> */}
                <p>Deadline: {task.deadline}</p>
                <p>Priority: {task.prior}</p>
              </div>
            </div>
          </div>
        )}
      </Draggable>
      <Modal
        visible={visible}
        setVisible={setVisible}
        title={`#${task.number}`}
      >
        <TaskCard task={task} />
      </Modal>
    </>
  );
}

export default Task;
