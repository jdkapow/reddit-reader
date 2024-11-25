import React, { useEffect } from 'react';
import styles from './Links.module.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectLinks, loadLinks, clearLinkSearch } from './linksSlice';
import Link from './Link';
import PanelNav from '../../components/PanelNav/PanelNav';
import cancel from '../../icons/cancel.png';

export default function Links ({activeSubreddit}) {
  const dispatch = useDispatch();
  const {limit, before, after, links, searchTerm, selectedLink, isLoading, hasError} = useSelector(selectLinks);

  const subredditLinkName = activeSubreddit.linkName;
  const displaySearchTerm = (searchTerm.length < 28) ? searchTerm : searchTerm.slice(0, 27) + "...";
  const headerText = !(activeSubreddit.data || searchTerm)
    ? "Top Reddit Posts" :
    !searchTerm
    ? "Posts in " + activeSubreddit.data.display_name_prefixed
    : `Posts: "${displaySearchTerm}"`;

  const containerBackColor = (!activeSubreddit.backColor) ? "white" :activeSubreddit.backColor;
  const titleColor = (!activeSubreddit.iconColor) ? "black" : activeSubreddit.iconColor;

  useEffect(() => {
    dispatch(loadLinks({limit:null, pageChange:null, 
                        subredditLinkName:subredditLinkName, searchTerm:searchTerm}));
  }, [searchTerm, activeSubreddit]);

  const handleNavClick = (e) => {
    dispatch(loadLinks({limit:limit, pageChange:e.target.id, 
                        subredditLinkName:subredditLinkName, searchTerm:searchTerm}));
  };

  const handleClearSearchClick = () => {
    dispatch(clearLinkSearch());
  }

  if (isLoading) {
    return (
      <div className={`PanelContainer ${styles["panel-container"]}`}>
        <div className={styles["header-container"]}>
          <h2 className="PanelTitle">Loading...</h2>
        </div>
        <PanelNav before="loading" after="loading" onClickHandler={handleNavClick} />
        <div className={styles["skeleton-container"]}>
          <Skeleton count={10} className={styles["skeleton"]} />
        </div>
      </div>
    );
  };

  if (hasError) {
    return (
      <div className={`PanelContainer ${styles["panel-container"]}`}>
        <div className={styles["header-container"]}>
          <h2 className="PanelTitle">Cannot load posts</h2>
        </div>
      </div>
    )
  }
  
  return (
    <div className={`PanelContainer ${styles["panel-container"]}`} 
          style={!selectedLink.id 
                ? {backgroundColor:containerBackColor} 
                : {backgroundColor:containerBackColor,display:"none"}}>
      <div className={styles["header-container"]}>
        <h2 className="PanelTitle">{headerText}</h2>
        <img className={styles["cancel-icon"]} 
              src={cancel} alt="Cancel" 
              style={!searchTerm ? {display:"none"} : {}}
              onClick={handleClearSearchClick} 
        />
      </div>
      <PanelNav before={before} after={after} onClickHandler={handleNavClick} />
      <ul className="PanelList">
        {links.map((link) => (
          <Link key={link.id} id={link.id} link={link} titleColor={titleColor} />
        ))}
      </ul>
      <PanelNav before={before} after={after} onClickHandler={handleNavClick} />
      <br/>
    </div>
  )
};