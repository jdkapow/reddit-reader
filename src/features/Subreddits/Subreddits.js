import React from 'react';
import styles from './Subreddits.module.css';
import { useSelector } from 'react-redux';
import { selectSubreddits } from './subredditsSlice';
import Subreddit from './Subreddit';

export default function Subreddits() {
  const { limit, before, after, subreddits } = useSelector(selectSubreddits);

  return (
    <div>
      <h2 className={styles["h2"]}>Subreddits</h2>
      <ul className={styles["subreddits-list"]}>
        {subreddits.map((subreddit) => (
          <Subreddit key={subreddit.data.id} subreddit={subreddit} />
        ))}
      </ul>
    </div>
  )
}