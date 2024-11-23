import React, { useEffect } from 'react';
import styles from './Subreddits.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectSubreddits, loadSubreddits, clearSubredditSearch } from './subredditsSlice';
import Subreddit from './Subreddit';
import PanelNav from '../../components/PanelNav/PanelNav';
import { getSubredditLimit } from '../../utilities/util';
import cancel from '../../icons/cancel.png';

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
  const { limit, before, after, subreddits, searchTerm } = useSelector(selectSubreddits);
  const dispatch = useDispatch();

  const panelHeight = (limit - 1) * 49 + 120;
  const displaySearchTerm = (searchTerm.length < 13) ? searchTerm : searchTerm.slice(0, 12) + "...";
  const titleText = (searchTerm === "") ? "Subreddits" : `Subreddits: "${displaySearchTerm}"`;
  const titleStyle = (titleText === "Subreddits") ? {} : {fontSize:"1.2rem"};

  useEffect(() => {
   dispatch(loadSubreddits({searchTerm:searchTerm, limit:null, pageChange:0}));
  }, [searchTerm, dispatch]);
    
  useEffect(() => {
    const debouncedUpdateLimit = debounce(() => {
      dispatch(loadSubreddits({searchTerm: searchTerm, limit:getSubredditLimit(), pageChange:null}));
    }, 1000);
    window.addEventListener('resize', debouncedUpdateLimit);

    return (() => {
      window.removeEventListener('resize', debouncedUpdateLimit)});
    
  });

  const handleNavClick = (e) => {
    dispatch(loadSubreddits({searchTerm:searchTerm, limit:null, pageChange:e.target.id}));
  };

  const handleClearSearchClick = () => {
    dispatch(clearSubredditSearch());
  };

  return (
    <div className={`PanelContainer ${styles["subreddits-container"]}`} style={{height:panelHeight}}>
      <div className={styles["header-container"]}>
        <h2 className="PanelTitle" style={titleStyle}>{titleText}</h2>
        <img className={styles["cancel-icon"]} 
              src={cancel} alt="Cancel" 
              style={!searchTerm ? {display:"none"} : {}}
              onClick={handleClearSearchClick} 
        />
      </div>
      <PanelNav before={before} after={after} onClickHandler={handleNavClick} />
      <ul className="PanelList">
        {subreddits.map((subreddit) => (
          <Subreddit key={subreddit.data.id} subreddit={subreddit} />
        ))}
      </ul>
    </div>
  )
}