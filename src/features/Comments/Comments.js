import React, { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './Comments.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { loadComments, selectComments } from './commentsSlice';
import { selectedLink, clearSelectedLink } from '../Links/linksSlice';
import Link from '../Links/Link';
import Comment from './Comment';

export default function Comments ({activeSubreddit}) {
  const dispatch = useDispatch();
  const commentsData = useSelector(selectComments);
  const selectedPost = useSelector(selectedLink);
  const comments = commentsData.comments;
  const commentsLoading = commentsData.isLoading;
  
  useEffect( () => {
    if (!(!selectedPost.data)) {
      dispatch(loadComments({postName:selectedPost.id, first:null, limit:null}));
    };
  },[selectedPost]);

  const containerBackColor = (!activeSubreddit.backColor) ? "white" :activeSubreddit.backColor;
  
  const handleReturnClick = () => {
    dispatch(clearSelectedLink());
  };

  if (!selectedPost.data) {
    return (
      <></>
    )
  };
  
  return (
    <div className={`PanelContainer ${styles["panel-container"]}`} style={{backgroundColor:containerBackColor}}>
      <h2 className="PanelTitle">Comments</h2>
      <button className={styles["return-button"]} onClick={handleReturnClick}>&lt;&lt; Return to Posts</button>
      <div className={`PanelList ${styles["comment-list"]}`}>
        <Link link={selectedPost} id={selectedPost.id} titleColor="black"/>
        {commentsLoading ? (
          <Skeleton className={styles["skeleton"]} count={10} />
        ) :
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};