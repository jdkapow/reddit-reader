import { useState } from 'react';
import styles from './Link.module.css';
import { useDispatch } from 'react-redux';
import { selectLink } from './linksSlice';
import { calculateCreatedText } from '../../utilities/util';
import comment from '../../icons/comment.png';
import upvote from '../../icons/upvote-downvote.png';

export default function Link ({link, id, titleColor}) {
  const dispatch = useDispatch();
  const { title, selftext, url, author, created, num_comments, upvote_ratio, ups} = link.data;
  const [imageDisplay, setImageDisplay] = useState(url);

  const createdText = calculateCreatedText(created);
  const downs = ups / upvote_ratio - ups;
  const net = Math.floor(ups - downs);
  const voteStyle = (net >= 0) 
    ? {color:"green"}
    : {color:"red"};

  const handleClick = () => {
    dispatch(selectLink({id:id, link:link}));
    window.scrollTo({top:0,left:0,behavior:"smooth"});
  };

  const handleError = () => {
    setImageDisplay(null);
  }

  return (
    <div className={styles["link-container"]}>
      <h3 className={styles["title"]} style={{color:titleColor}} onClick={handleClick}>{title}</h3>
      <p className="CreatedText">Posted by <span style={{color:titleColor}}>{author}</span>{` ${createdText}`}</p>
      <img className={styles["post-image"]} src={imageDisplay} onError={handleError} style={imageDisplay ? {} : {display:"none"}} />
      <p className={styles["selftext"]}>{selftext}</p>
      <div className={styles["post-info"]}>
        <p className={styles["vote-container"]} style={voteStyle}>
          <img src={upvote} className={styles["vote-icon"]} alt="Up-Down" />
          {net}
        </p>
        <p className={styles["comment-button"]} onClick={handleClick}>
          <img src={comment} className={styles["comment-icon"]} alt="Comments" />
          {num_comments}
        </p>
      </div>
    </div>
  )
};