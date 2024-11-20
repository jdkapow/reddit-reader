import React, { useEffect } from 'react';
import styles from './Links.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectLinks, loadLinks } from './linksSlice';
import { selectedSubreddit } from '../Subreddits/subredditsSlice';
import Link from './Link';
import PanelNav from '../../components/PanelNav/PanelNav';

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
  
  return (
    <div className="PanelContainer" style={containerBackColor}>
      <h2 className="PanelTitle">{headerText}</h2>
      <PanelNav before={before} after={after} onClickHandler={handleClick} />
      <ul className="PanelList">
        {links.map((link) => (
          <Link key={link.id} id={link.id} link={link} titleColor={titleColor} />
        ))}
      </ul>
      <PanelNav before={before} after={after} onClickHandler={handleClick} />
      <br/>
    </div>
  )
};