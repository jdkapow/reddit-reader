import React, { useEffect } from 'react';
import styles from './Links.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectLinks, loadLinks } from './linksSlice';
import { selectedSubreddit } from '../Subreddits/subredditsSlice';
import Link from './Link';

export default function Links () {
  const dispatch = useDispatch();
  const links = useSelector(selectLinks);

  console.log(links);
  const activeSubreddit = useSelector(selectedSubreddit);
  console.log(activeSubreddit);
  const headerText = !activeSubreddit.data ? "Top Reddit Posts" : "Posts in " + activeSubreddit.data.display_name_prefixed

  const containerBackColor = (activeSubreddit !== null) ? 
        {backgroundColor:activeSubreddit.backColor} : 
        {backgroundColor:"white"};

  useEffect( () => {
    const subredditLinkName = activeSubreddit.linkName || "";
    dispatch(loadLinks({limit:null, pageChange:null, subredditLinkName:subredditLinkName}));
  },[activeSubreddit]);

  const handleClick = () => {

  };

  return (
    <div className={styles["link-container"]} style={containerBackColor}>
      <h2 className={styles["h2"]}>{headerText}</h2>
      <div className={styles["nav"]}>
        <button className={styles["prev"]} id="prev" onClick={handleClick}>&lt;&lt; prev</button>
        <button className={styles["next"]} id="next" onClick={handleClick}>next &gt;&gt;</button>
      </div>
      <ul className={styles["links-list"]}>
        {links.links.map((link) => (
          <Link key={link.data.id} link={link} />
        ))}
      </ul>
    </div>
  )
};