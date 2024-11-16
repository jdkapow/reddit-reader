import React from "react";
import styles from './Subreddit.module.css';

export default function Subreddit({subreddit}) {
  const { id, isSelected, backColor, data } = subreddit;
  const defaultBackColor = backColor + "20";
  const selectedBackColor = backColor + "80";
  const borderStyle = "2px solid " + backColor;

  const listStyleValue = {
    backgroundColor: (isSelected ? selectedBackColor : defaultBackColor),
  };

  const imgStyleValue = {
    border:borderStyle,
    backgroundColor: backColor
  };
  
  return (
    <li key={id} className={styles["li"]} style={listStyleValue}>
      <div className={styles["item-container"]}>
        <img className={styles["icon"]} style={imgStyleValue} src={data.icon_img} alt="" />
        <span className={styles["subreddit-name"]}>{data["display_name"]}</span>
      </div>
    </li>
  );
}
