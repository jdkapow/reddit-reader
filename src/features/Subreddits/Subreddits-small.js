import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectSubreddits, activateSubreddit, clearActiveSubreddit } from "./subredditsSlice";
import styles from './Subreddits-small.module.css';
import Select from 'react-select';

export default function SubredditsSmall (props) {
  const dispatch = useDispatch();
  const { searchTerm, after, subreddits,
    onClearSearchHandler, onMoreHandler} = props;

  const firstOption = {value:"top", label:"Top Reddit Posts"};
  const [ option, setOption ] = useState(firstOption);
  const [ activeOption, setActiveOption ] = useState(firstOption);

  const publicSubreddits = subreddits.filter((subreddit) => (subreddit.isPrivate === false));
  const subredditOptions = publicSubreddits.map((subreddit) => ({value:subreddit.data.id, label:subreddit.data.display_name}));
  const finalOption = {value:"next", label:"More..."}
  const selectOptions = [firstOption].concat(subredditOptions.concat([finalOption]));

  const displaySearchTerm = (searchTerm.length < 48) ? searchTerm : searchTerm.slice(0, 47) + "...";
  const titleText = ! searchTerm ? "Subreddits" : `"${displaySearchTerm}"`;
  const titleStyle = (titleText === "Subreddits") ? {} : {fontSize:"1.2rem"};
  
  const selectStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      border:"1px solid black",
      fontSize:"1rem",
      minHeight:0,
      minWidth:0,
      flex:1,
      background: "white",
      marginRight:".5rem"
    }),
    valueContainer: (baseStyles, state) => ({
      ...baseStyles,
      paddingLeft:"10px",
      fontSize:"1rem",
    }),
    menu: (baseStyles, state) => ({
      ...baseStyles,
      background:"white",
      border: "1px solid black",
      fontSize: ".8rem",
      paddingLeft:"5px"
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      "&:hover": {
        backgroundColor: "lightgray",
      },
    })
  };

  const handleDropdownChange = (e) => {
    setOption(e);
    if (e.value === "top") {
      dispatch(clearActiveSubreddit());
      setActiveOption(firstOption);
    } else if (e.value === "next") {
      onMoreHandler();
      if (activeOption) {
        setOption(activeOption);
      }
    } else {
      const selectedSubreddit = subreddits.filter((subreddit) => (subreddit.data.id === e.value))[0];
      dispatch(activateSubreddit({id:selectedSubreddit.data.id,subreddit:selectedSubreddit}));
      setOption({value:selectedSubreddit.data.id, label:selectedSubreddit.data.display_name});
      setActiveOption({value:selectedSubreddit.data.id, label:selectedSubreddit.data.display_name});
    };
  }

  return (
    <div className={`PanelContainer ${styles["subreddits-container"]}`}>
      <h2 className="PanelTitle" style={titleStyle}>{titleText}</h2>
      <div className={styles["dropdown-container"]}>
        <Select className={styles["select"]}
                unstyled
                styles={selectStyles} options={selectOptions} 
                value={option} 
                onChange={handleDropdownChange}
                menuPosition="fixed"
                menuPlacement="auto"
        />
      </div>
    </div>
  )
    
}