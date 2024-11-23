import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import styles from './SearchBar.module.css';
import { useDispatch } from 'react-redux';
import { conductSubredditSearch } from '../../features/Subreddits/subredditsSlice';
import { conductLinkSearch } from '../../features/Links/linksSlice';
import magnifier from '../../icons/magnifier.png'
import cancel from '../../icons/cancel.png';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [ searchTerm, setSearchTerm ] = useState("");
  const [ option, setOption ] = useState({value: 'both', label:'Subreddits & Posts'});

  //Setting up the react-select component
  const selectOptions = [
    {value: 'posts', label: 'All Posts'},
    {value: 'subreddits', label: 'Subreddits'},
    {value: 'both', label: 'Subreddits & Posts'}
  ];
  const selectStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      border:"1px solid black",
      minWidth:"15rem",
      fontSize:"1rem",
      minHeight:0,
      minWidth:0,
      width: "11rem",
      marginRight:"1rem",
      paddingLeft:"5px",
      background: "white"
    }),
    valueContainer: (baseStyles, state) => ({
      ...baseStyles,
      fontSize:"1rem"
    }),
    menu: (baseStyles, state) => ({
      ...baseStyles,
      background:"white",
      border: "1px solid black",
      fontSize: ".8rem",
      paddingLeft: "5px"
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      "&:hover": {
        backgroundColor: "lightgray",
      },
    })
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleDropdownChange = (e) => {
    setOption(e);
  }

  const submitNewSearch = (e) => {
    e.preventDefault();
    //we reach this when the user presses Search or hits enter
    if (searchTerm !== "") {
      const {value} = option;
      if (value === "subreddits" || value === "both") {
        //if we search subreddits, we need to know whether we're also 
        //searching posts: if we are, we need to sever the selected subreddit
        dispatch(conductSubredditSearch({searchTerm:searchTerm, searchType:value}));
      }
      if (value === "posts" || value === "both") {
        console.log(searchTerm);
        dispatch(conductLinkSearch(searchTerm));
      }
    }
  };

  const clearSearch = () => {
    if(searchTerm !== "") {
      setSearchTerm("");
      dispatch(conductSubredditSearch({searchTerm:"", searchType:"both"}));
      dispatch(conductLinkSearch(""));
      setOption({value: 'both', label:'Subreddits & Posts'});
    };
  }

  return (
    <form className={styles["form-container"]} onSubmit={submitNewSearch}>
      <div className={styles["dropdown-container"]}>
        <Select unstyled styles={selectStyles} options={selectOptions} value={option} onChange={handleDropdownChange}/>
      </div>
      <div className={styles["searchbar-container"]}>
        <input name="searchbar" className={styles["searchbar"]} value={searchTerm} onChange={handleInputChange} type="text" placeholder="Enter search term"/>
      </div>
      <div className={styles["button-container"]}>
        <button type="submit" className={styles["search-button"]} id="search"><img src={magnifier} alt="nope" /></button>
        <button type="button" className={styles["clear-button"]} id="clear" onClick={clearSearch}><img src={cancel} alt="nope" /></button>
      </div>
    </form>
  );

};

export default SearchBar;