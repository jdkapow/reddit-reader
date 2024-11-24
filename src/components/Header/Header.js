import styles from './Header.module.css';
import SearchBar from '../SearchBar/SearchBar';

const Header = () => {

  return (
    <div className={styles["header-main"]}>
      <h1 className={`${styles["h1-small"]} ${styles["h1"]}`}>Jim's Giant Reddit Reader</h1>
      <div className={styles["header-flex"]}>
          <div className={styles["jgt-logo"]}>
          <h1 className={`${styles["h1-big"]} ${styles["h1"]}`}>Jim's Giant Reddit Reader</h1>
        </div>
        <div className={styles["searchbar-container"]}>
          <SearchBar />
        </div>
      </div>
    </div>
  )
}

export default Header;