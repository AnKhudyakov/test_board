import { Dispatch } from 'react';
import styles from './Modal.module.scss';

type ModalProps = {
  children: React.ReactNode;
  visible: boolean;
  setVisible: Dispatch<React.SetStateAction<boolean>>;
  title:string;
};

function Modal({ children, visible, setVisible, title }: ModalProps) {
  const rootClasses = [styles.modal];
  if (visible) {
    rootClasses.push(styles.active);
  }

  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div
        className={styles.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
         <div className={styles.modal_header}><p>{title}</p></div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
