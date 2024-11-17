import logo from './logo.svg';
import styles from './App.module.css';
import Header from '../components/Header';
import Subreddits from '../features/Subreddits/Subreddits';
import Links from '../features/Links/Links';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadSubreddits } from '../features/Subreddits/subredditsSlice';

function App() {
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(loadSubreddits({limit:null, pageChange:null}));
  },[]);

  return (
    <div className={styles['app']}>
      <header>
        <Header />
      </header>
      <main className={styles["main"]}>
        <div className={styles["subreddit-container"]}>
          <Subreddits />
        </div>
        <Links />
      </main>
      <footer>

      </footer>
    </div>
  );
}

export default App;
