import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { conductSubredditSearch } from '../../features/Subreddits/subredditsSlice';
import { conductLinkSearch } from '../../features/Links/linksSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [ searchTerm, setSearchTerm ] = useState("");
  const [ radioOption, setRadioOption ] = useState(null);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleRadioChange = (e) => {
    setRadioOption(e.target.value);
  }

  const submitNewSearch = (e) => {
    e.preventDefault();
    //we reach this when the user presses Search or hits enter
    if (searchTerm !== "") {
      if (radioOption !== "posts") { //option is subreddits or both, so do a subreddit search
        dispatch(conductSubredditSearch(searchTerm));
      }
      if (radioOption !== "subreddits") { //option is posts or both, so do a post search
        dispatch(conductLinkSearch(searchTerm));
      }
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    dispatch(conductSubredditSearch(""));
    dispatch(conductLinkSearch(""));
  }

  return (
    <form className={styles["form-container"]} onSubmit={submitNewSearch}>
      <div>
        <input name="searchbar" className={styles["searchbar"]} value={searchTerm} onChange={handleInputChange} type="text" placeholder="Search"/>
        <button type="submit" className={styles["search-button"]} id="search">Search</button>
        <button type="button" className={styles["clear-button"]} id="clear" onClick={clearSearch}>Clear</button>
      </div>
      <div className={styles["radio-container"]}>
        <input id="radio-subreddit" name="searchOption" value="subreddits" type="radio" onChange={handleRadioChange}/>
        <label htmlFor="radio-subreddit" className={styles["radio-label"]}>Subreddits</label>
        <input id="radio-posts" name="searchOption" value="posts" type="radio" onChange={handleRadioChange} />
        <label htmlFor="radio-posts" className={styles["radio-label"]}>Posts</label>        
        <input id="radio-both" name="searchOption" value="both" type="radio" onChange={handleRadioChange} defaultChecked />
        <label htmlFor="radio-both" className={styles["radio-label"]}>Both</label>
      </div>
    </form>
  );

};


export default SearchBar;