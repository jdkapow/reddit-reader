import React, { useEffect } from 'react';
import styles from './Subreddits.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectSubreddits, loadSubreddits } from './subredditsSlice';
import Subreddit from './Subreddit';
import PanelNav from '../../components/PanelNav/PanelNav'
import { getSubredditLimit } from '../../utilities/util';

//helper function to keep from responding to resize so quickly
function debounce(fn, ms) {
  let timer;
  return (() => {
    clearTimeout(timer)
    timer = setTimeout(_ => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  });
};

export default function Subreddits() {
  const { limit, before, after, subreddits } = useSelector(selectSubreddits);
  const dispatch = useDispatch();

  const panelHeight = (limit - 1) * 49 + 120;
    
  useEffect(() => {
    const debouncedUpdateLimit = debounce(() => {
      dispatch(loadSubreddits({limit:getSubredditLimit(), pageChange:null}));
    }, 1000);
    window.addEventListener('resize', debouncedUpdateLimit);

    return (() => {
      window.removeEventListener('resize', debouncedUpdateLimit)});
    
  });

  const handleClick = (e) => {
    dispatch(loadSubreddits({limit:null, pageChange:e.target.id}));
  };

  return (
    <div className={`PanelContainer ${styles["subreddits-container"]}`} style={{height:panelHeight}}>
      <h2 className="PanelTitle">Subreddits</h2>
      <PanelNav before={before} after={after} onClickHandler={handleClick} />
      <ul className="PanelList">
        {subreddits.map((subreddit) => (
          <Subreddit key={subreddit.data.id} subreddit={subreddit} />
        ))}
      </ul>
    </div>
  )
}