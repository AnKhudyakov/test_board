import { Dispatch } from 'react';
import { Comment } from '../../types';
import styles from './Comments.module.scss';

type CommentsProps = {
  comments: Comment[];
  activeComment: Comment | null;
  setActiveComment: Dispatch<React.SetStateAction<Comment | null>>;
};

function Comments({
  comments,
  activeComment,
  setActiveComment,
}: CommentsProps) {
  return (
    <div className={styles.container} onClick={() => setActiveComment(null)}>
      {comments?.length
        ? comments.map((comment) => (
            <div
              key={comment.id}
              className={
                comment.id === activeComment?.id
                  ? styles.comment_active
                  : styles.comment
              }
              onClick={(e) => {
                e.stopPropagation();
                setActiveComment(comment);
              }}
            >
              <div className={styles.head}>{comment.created?.toString()}</div>

              <div className={styles.content}>{comment.content}</div>
              {comment.comments.length ? (
                <Comments
                  comments={comment.comments}
                  activeComment={activeComment}
                  setActiveComment={setActiveComment}
                />
              ) : (
                <></>
              )}
            </div>
          ))
        : ' No Comments'}
    </div>
  );
}

export default Comments;
