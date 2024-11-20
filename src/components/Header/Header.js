import styles from './Header.module.css';

const Header = () => {

 
  return (
    <div>
      <div className={styles["header-main"]}>
          <div className={styles["jgt-logo"]}>
            <h1 className={`${styles["h1-big"]} ${styles["h1"]}`}>Jim's Giant Reddit Reader</h1>
          </div>
        </div>
    </div>
  )
}

export default Header;