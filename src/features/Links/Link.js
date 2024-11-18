import styles from './Link.module.css';

export default function Link ({link, titleColor}) {
  const { title, selftext, url, author, num_comments, upvote_ratio, ups} = link.data;

  const downs = ups / upvote_ratio - ups;
  const net = Math.floor(ups - downs);

  console.log(titleColor);

  const handleClick = () => {

  };

  return (
    <div className={styles["link-container"]}>
      <h3 className={styles["title"]} style={{color:titleColor}}>{title}</h3>
      <img className={styles["post-image"]} src={url} alt="" />
      <p className={styles["selftext"]}>{selftext}</p>
      <div className={styles["post-info"]}>
        <p className={styles["author"]} style={{color:titleColor}}>Posted by: {author}</p>
        <p className={styles["votes"]} style={{color:titleColor}}>Net upvotes: {net}</p>
        <p className={styles["comment-button"]} onClick={handleClick}>{num_comments} comments</p>
      </div>
    </div>
  )
};