import styles from './PanelNav.module.css';

export default function PanelNav ({ before, after, onClickHandler }) {
  return (
    <div className={styles["nav"]}>
      <button className={styles["prev"]} id="prev" style={!before ? {visibility:"hidden"} :{}} onClick={onClickHandler}>&lt;&lt; prev</button>
      <button className={styles["next"]} id="next" style={!after ? {visibility:"hidden"} :{}} onClick={onClickHandler}>next &gt;&gt;</button>
    </div>
  )
}