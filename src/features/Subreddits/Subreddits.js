import React from 'react';
import styles from './Subreddits.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectSubreddits, loadSubreddits } from './subredditsSlice';
import Subreddit from './Subreddit';


export default function Subreddits() {
  const { limit, before, after, subreddits } = useSelector(selectSubreddits);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    dispatch(loadSubreddits({limit:null, pageChange:e.target.id}));
  };

  return (
    <div>
      <h2 className={styles["h2"]}>Subreddits</h2>
      <div className={styles["nav"]}>
        <button className={styles["prev"]} id="prev" style={!before ? {visibility:"hidden"} :{}} onClick={handleClick}>&lt;&lt; prev</button>
        <button className={styles["next"]} id="next" style={!after ? {visibility:"hidden"} :{}} onClick={handleClick}>next &gt;&gt;</button>
      </div>
      <ul className={styles["subreddits-list"]}>
        {subreddits.map((subreddit) => (
          <Subreddit key={subreddit.data.id} subreddit={subreddit} />
        ))}
      </ul>
    </div>
  )
}