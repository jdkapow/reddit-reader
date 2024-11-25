import React, { useEffect } from 'react';
import styles from './Subreddits.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectSubreddits, loadSubreddits, clearSubredditSearch } from './subredditsSlice';
import SubredditsLarge from './Subreddits-large';
import SubredditsSmall from './Subreddits-small';
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
  const { limit, before, after, subreddits, searchTerm, activeSubreddit, isLoading, hasError } = useSelector(selectSubreddits);
  const dispatch = useDispatch();

  const panelHeight = (limit - 1) * 49 + 120;

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

  const handleMoreSelect = () => {
    dispatch(loadSubreddits({searchTerm:searchTerm, limit:null, pageChange:"next"}));
  }
        
  const handleNavClick = (e) => {
    dispatch(loadSubreddits({searchTerm:searchTerm, limit:null, pageChange:e.target.id}));
  };

  const handleClearSearch = () => {
    dispatch(clearSubredditSearch());
  };

  return (
    <div>
      <SubredditsLarge 
        className={styles["subreddits-large"]}
        panelHeight={panelHeight}
        cancel={cancel} 
        searchTerm={searchTerm}
        before={before}
        after={after} 
        subreddits={subreddits} 
        onClearSearchHandler={handleClearSearch}
        onNavHandler={handleNavClick}
        isLoading={isLoading}
        hasError={hasError}
      />
      <SubredditsSmall 
        className={styles["subreddits-small"]}
        panelHeight={panelHeight}
        cancel={cancel} 
        searchTerm={searchTerm}
        before={before}
        after={after} 
        subreddits={subreddits}
        activeSubreddit={activeSubreddit}
        onClearSearchHandler={handleClearSearch}
        onMoreHandler={handleMoreSelect}
        isLoading={isLoading}
        hasError={hasError}
      />
    </div>
  )
}