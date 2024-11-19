import React, { useEffect } from 'react';
import styles from './Comments.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { loadComments, selectComments } from './commentsSlice';
import { selectedLink } from '../Links/linksSlice';
import Link from '../Links/Link';
import Comment from './Comment';

export default function Links () {
  const dispatch = useDispatch();
  const commentsData = useSelector(selectComments);
  const selectedPost = useSelector(selectedLink);
  const comments = commentsData.comments;
  
  useEffect( () => {
    if (!(!selectedPost.data)) {
      dispatch(loadComments({postName:selectedPost.id, first:null, limit:null}));
    };
  },[selectedPost]);

  if (!selectedPost.data) {
    return (
      <></>
    )
  };
  
  return (
    <div className={styles["comments-container"]}>
      <h2 className={styles["h2"]}>Comments</h2>
      <Link link={selectedPost} id={selectedPost.id} titleColor="black"/>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};