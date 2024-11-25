import React from "react";
import styles from './Subreddit.module.css';
import { useDispatch } from 'react-redux';
import { activateSubreddit, clearActiveSubreddit } from "./subredditsSlice";
import cancel from '../../icons/cancel.png';

export default function Subreddit({subreddit}) {
  const dispatch = useDispatch();
  const { id, isActive, isPrivate, backColor, iconColor, data } = subreddit;
  const borderStyle = "2px solid " + iconColor;

  const listStyleValue = (isActive && !isPrivate) ? 
    {backgroundColor: backColor,
      width:"150%"
    } :
    (!isPrivate) ?
    {backgroundColor: backColor,
      width:"100%"
    } :
    {backgroundColor: "lightgray",
      width:"100%"
    };

  const imgStyleValue = {
    border:borderStyle,
    backgroundColor: iconColor
  };

  const hoverContainerStyleValue = isActive ?
    {backgroundColor: backColor} :
    {};

  const displayName = data.display_name + (isPrivate ? " (private)" : "");

  const handleActivateSubreddit = () => {
    if (!(isActive || isPrivate)) {
      dispatch(activateSubreddit({id:id, subreddit:subreddit}));
    }
    window.scrollTo({top:0,left:0,behavior:"smooth"});
  };

  const handleDeactivateSubreddit = () => {
    dispatch(clearActiveSubreddit());
    window.scrollTo({top:0,left:0,behavior:"smooth"});
  };
  
  return (
    <li key={id} className={styles["li"]} style={listStyleValue} onClick={handleActivateSubreddit}>
      <div className={styles['hover-container']} style={hoverContainerStyleValue}>
        <img className={styles["icon"]} style={imgStyleValue} src={data.icon_img} alt="" />
        <span className={styles["subreddit-name"]}>{displayName}</span>
        {isActive ? <button onClick={handleDeactivateSubreddit} className={styles["cancel-button"]}><img src={cancel} alt="X"></img></button> : <></>}
      </div>
    </li>
  );
}
