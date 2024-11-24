import Subreddit from './Subreddit';
import PanelNav from '../../components/PanelNav/PanelNav';
import styles from './Subreddits-large.module.css';

export default function SubredditsLarge (props) {
  const { panelHeight, cancel, 
          searchTerm, before, after, subreddits, 
          onClearSearchHandler, onNavHandler} = props;

  const displaySearchTerm = (searchTerm.length < 28) ? searchTerm : searchTerm.slice(0, 27) + "...";
  const titleText = (searchTerm === "") ? "Subreddits" : `Subreddits: "${displaySearchTerm}"`;
  const titleStyle = (titleText === "Subreddits") ? {} : {fontSize:"1.2rem"};

  return (
    <div className={`PanelContainer ${styles["subreddits-container"]}`} style={{height:panelHeight}}>
      <div className={styles["header-container"]}>
        <h2 className="PanelTitle" style={titleStyle}>{titleText}</h2>
        <img className={styles["cancel-icon"]} 
              src={cancel} alt="Cancel" 
              style={!searchTerm ? {display:"none"} : {}}
              onClick={onClearSearchHandler} 
        />
      </div>
      <PanelNav before={before} after={after} onClickHandler={onNavHandler} />
      <ul className="PanelList">
        {subreddits.map((subreddit) => (
          <Subreddit key={subreddit.data.id} subreddit={subreddit} />
        ))}
      </ul>
    </div>
  );
}