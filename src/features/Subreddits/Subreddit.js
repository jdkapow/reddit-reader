import React from "react";
import styles from './Subreddit.module.css';
import { useDispatch } from 'react-redux';
import { activateSubreddit } from "./subredditsSlice";
import cancel from './cancel.png';

export default function Subreddit({subreddit}) {
  const dispatch = useDispatch();
  const { id, isActive, backColor, iconColor, data } = subreddit;
  const borderStyle = "2px solid " + iconColor;

  const listStyleValue = isActive ? 
    {backgroundColor: backColor,
      width:"150%"
    } :
    {backgroundColor: backColor,
      width:"100%"
    };

  const imgStyleValue = {
    border:borderStyle,
    backgroundColor: iconColor
  };

  const hoverContainerStyleValue = isActive ?
    {backgroundColor: backColor} :
    {};

  const handleActivateSubreddit = () => {
    if (!isActive) {
      dispatch(activateSubreddit({id:id, subreddit:subreddit}));
    }
  };

  const handleDeactivateSubreddit = () => {
    dispatch(activateSubreddit({id:'', subreddit:{}}))
  };
  
  return (
    <li key={id} className={styles["li"]} style={listStyleValue} onClick={handleActivateSubreddit}>
      <div className={styles['hover-container']} style={hoverContainerStyleValue}>
        <img className={styles["icon"]} style={imgStyleValue} src={data.icon_img} alt="" />
        <span className={styles["subreddit-name"]}>{data["display_name"]}</span>
        {isActive ? <button onClick={handleDeactivateSubreddit} className={styles["cancel-button"]}><img src={cancel} alt="X"></img></button> : <></>}
      </div>
    </li>
  );
}
