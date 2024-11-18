import React, { useEffect } from 'react';
import styles from './Links.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectLinks, loadLinks } from './linksSlice';
import { selectedSubreddit } from '../Subreddits/subredditsSlice';
import Link from './Link';

export default function Links () {
  const dispatch = useDispatch();
  const {limit, before, after, links} = useSelector(selectLinks);

  const activeSubreddit = useSelector(selectedSubreddit);
  const subredditLinkName = activeSubreddit.linkName || "";
  const headerText = !activeSubreddit.data ? "Top Reddit Posts" : "Posts in " + activeSubreddit.data.display_name_prefixed

  const containerBackColor = (!activeSubreddit.backColor) ? 
    {backgroundColor:"white"} :
    {backgroundColor:activeSubreddit.backColor};

  const titleColor = (!activeSubreddit.iconColor) ? "black" : activeSubreddit.iconColor;

  useEffect( () => {
    dispatch(loadLinks({limit:null, pageChange:null, subredditLinkName:subredditLinkName}));
  },[activeSubreddit]);

  const handleClick = (e) => {
    dispatch(loadLinks({limit:limit, pageChange:e.target.id, subredditLinkName:subredditLinkName}));
  };
  
  const navSection = (
    <div className={styles["nav"]}>
        <button className={styles["prev"]} id="prev" onClick={handleClick}>&lt;&lt; prev</button>
        <button className={styles["next"]} id="next" onClick={handleClick}>next &gt;&gt;</button>
    </div>
  );

  return (
    <div className={styles["link-container"]} style={containerBackColor}>
      <h2 className={styles["h2"]}>{headerText}</h2>
      {navSection}
      <ul className={styles["links-list"]}>
        {links.map((link) => (
          <Link key={link.data.id} link={link} titleColor={titleColor} />
        ))}
      </ul>
      {navSection}
      <br/>
    </div>
  )
};