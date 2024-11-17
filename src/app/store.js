import { configureStore } from "@reduxjs/toolkit";
import subredditsReducer from "../features/Subreddits/subredditsSlice";
import linksReducer from "../features/Links/linksSlice";

export default configureStore({
  reducer: {
    subreddits: subredditsReducer,
    links: linksReducer
  },
});