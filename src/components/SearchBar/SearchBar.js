import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import styles from './SearchBar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { conductSubredditSearch, selectedSubreddit } from '../../features/Subreddits/subredditsSlice';
import { conductLinkSearch } from '../../features/Links/linksSlice';
import magnifier from './magnifier.png';
import cancel from './cancel.png';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [ searchTerm, setSearchTerm ] = useState("");
  const [ option, setOption ] = useState({value: 'both', label:'Subreddits & Posts'});
  const activeSubredditName = useSelector(selectedSubreddit).linkName;

  //Setting up the react-select component
  const standardSelectOptions = [
    {value: 'posts', label: 'All Posts'},
    {value: 'subreddits', label: 'Subreddits'},
    {value: 'both', label: 'Subreddits & Posts'}
  ];
  const activeSelectOption = !activeSubredditName ?
    [] :
    [{value: 'active', label: activeSubredditName}];
  const selectOptions = activeSelectOption.concat(standardSelectOptions);
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

  useEffect(() => {
    if (activeSubredditName) {
      setOption(selectOptions[0]);
    };
  }, [activeSubredditName]);

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
      console.log(value);
      if (value === "subreddits" || value === "both") {
        dispatch(conductSubredditSearch(searchTerm));
      }
      if (value === "posts" || value === "both") {
        dispatch(conductLinkSearch({searchTerm:searchTerm, searchType:"global"}));
      }
      if (value === "active") {
        dispatch(conductLinkSearch({searchTerm:searchTerm, searchType:"local"}));
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