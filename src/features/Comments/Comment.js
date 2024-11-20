import styles from './Comment.module.css';

export default function Comment ({ comment }) {

  console.log(comment.created);
  const createdAgo = Math.abs(new Date() - (new Date(comment.created * 1000))) / 1000;
  let createdText;
  if (createdAgo < 60) {
    createdText = "Just now"; } else 
  if (createdAgo < 3600) {
    createdText = `${Math.floor(createdAgo / 60)} minutes ago`; } else
  if (createdAgo < 86400) {
    createdText = `${Math.floor(createdAgo / 3600)} hours ago`; } 
  else {createdText = `${Math.floor(createdAgo / 86400)} days ago`; }

  return (
    <div className={styles["comment-container"]}>
      <div className={styles["comment-info"]}>
        <span className={styles["author"]}>{comment.author}</span>
        <span className={styles["created"]}>{createdText}</span>
      </div>
      <p className={styles["body"]}>{comment.body}</p>
    </div>
  );
};