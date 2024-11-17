import React from "react";
import styles from './Subreddit.module.css';
import { useDispatch } from 'react-redux';
import { selectSubreddit } from "./subredditsSlice";

export default function Subreddit({subreddit}) {
  const dispatch = useDispatch();
  const { id, isSelected, backColor, data } = subreddit;
  const defaultBackColor = backColor + "15";
  const selectedBackColor = backColor + "40";
  const borderStyle = "2px solid " + backColor;

  const listStyleValue = isSelected ? 
    {backgroundColor: selectedBackColor,
      width:"150%"
    } :
    {backgroundColor: defaultBackColor,
      width:"100%"
    };

  const imgStyleValue = {
    border:borderStyle,
    backgroundColor: backColor
  };

  const hoverContainerStyleValue = isSelected ?
    {backgroundColor: selectedBackColor} :
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
