import React from "react";
import styles from './Subreddit.module.css';
import { useDispatch } from 'react-redux';
import { selectSubreddit } from "./subredditsSlice";

export default function Subreddit({subreddit}) {
  const dispatch = useDispatch();
  const { id, isSelected, backColor, iconColor, data } = subreddit;
  const defaultBackColor = backColor + "50";
  const borderStyle = "2px solid " + iconColor;

  const listStyleValue = isSelected ? 
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

  const hoverContainerStyleValue = isSelected ?
    {backgroundColor: backColor} :
    {};

  const handleClick = () => {
    console.log('got here!');
    dispatch(selectSubreddit(id));
  };
  
  return (
    <li key={id} className={styles["li"]} style={listStyleValue} onClick={handleClick}>
      <div className={styles['hover-container']} style={hoverContainerStyleValue}>
        <img className={styles["icon"]} style={imgStyleValue} src={data.icon_img} alt="" />
        <span className={styles["subreddit-name"]}>{data["display_name"]}</span>
      </div>
    </li>
  );
}
