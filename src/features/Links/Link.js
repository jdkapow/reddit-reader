import styles from './Link.module.css';

export default function Link ({link}) {
  const { title, url, author, num_comments, upvote_ratio, ups} = link.data;

  const downs = ups / upvote_ratio - ups;
  const net = Math.floor(ups - downs);

  const handleClick = () => {

  };

  return (
    <div className={styles["link-container"]}>
      <h3 className={styles["title"]}>{title}</h3>
      <img className={styles["post-image"]} src={url} alt="" />
      <div className={styles["post-info"]}>
        <p className={styles["author"]}>Posted by: {author}</p>
        <p className={styles["votes"]}>Net upvotes: {net}</p>
        <p className={styles["comment-button"]} onClick={handleClick}>{num_comments} comments</p>
      </div>
    </div>
  )
};