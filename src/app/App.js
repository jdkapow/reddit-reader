import './App.css';
import { getSubredditLimit } from '../utilities/util';
import Header from '../components/Header/Header';
import Subreddits from '../features/Subreddits/Subreddits';
import Links from '../features/Links/Links';
import Comments from '../features/Comments/Comments';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadSubreddits } from '../features/Subreddits/subredditsSlice';

function App() {
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(loadSubreddits({searchTerm:"", limit:getSubredditLimit(), pageChange:null}));
  },[]);

  return (
    <div className="App">
      <header className="Header">
        <Header />
      </header>
      <main className="Main">
        <div className="SubredditsBlock">
          <Subreddits />
        </div>
        <div className="LinksBlock">
          <Links />
        </div>
        <div className="CommentsBlock">
          <Comments />
        </div>
      </main>
      <footer>

      </footer>
    </div>
  );
}

export default App;
