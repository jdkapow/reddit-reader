import styles from './Comment.module.css';
import { calculateCreatedText } from '../../utilities/util';

export default function Comment ({ comment }) {

  const createdText = calculateCreatedText(comment.created);

  return (
    <div className={styles["comment-container"]}>
      <div className={styles["comment-info"]}>
        <span className={styles["author"]}>{comment.author}</span>
        <span className={`CreatedText ${styles['created-text']}`}>{createdText}</span>
      </div>
      <p className={styles["body"]}>{comment.body}</p>
    </div>
  );
};