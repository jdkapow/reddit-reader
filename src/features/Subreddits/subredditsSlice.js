import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import parseRedditJSON from "../../Utilities/jsonParser";

const initialState = {
  after: null,
  before: null,
  limit: 12,
  subreddits: [],
  selectedSubredditId: null,
  isLoading: false,
  hasError: false
};

const backColors = ["#0066CC","#175DB9","#2E53A7","#464A94","#5D4182","#74386F","#8B2E5D","#A2254A","#B91C38","#D11325","#E80913","#FF0000"];

export const loadSubreddits = createAsyncThunk(
  "subreddits/getSubredditsList",
  async ({ limit, pageChange }, { getState }) => {
    const url = "https://www.reddit.com/subreddits.json"
    const state = getState();
    const queryLimit = limit || state.limit || initialState.limit;
    const queryAfter = pageChange === "next" && state.after ? `%after=${state.after}` : "";
    const queryBefore = pageChange === "prev" && state.before ? `%before=${state.before}` : "";
    const query = "?limit=" + queryLimit + queryAfter + queryBefore;
    const data = await fetch(url + query);
    const json = await data.json();
    return {limit: queryLimit, json: json};
  }
);

const subredditsSlice = createSlice({
  name: 'subreddits',
  initialState: initialState,
  reducers: {
    selectSubreddit: (state, action) => {
      state.selectedSubredditId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSubreddits.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadSubreddits.fulfilled, (state, action) => {
        const { limit, json } = action.payload;
        //the json response should always be wrapped in a 'listing' object
        //which contains 'kind' (which we don't care about) and 'data'
        //before and after are used to move to the next or previous page listing of subreddits
        //all the objects in json.data.children should be subreddits, so we can just pass the children object to state
        const { after, before, children } = json.data;
        state.isLoading = false;
        state.hasError = false; 
        state.limit = limit;
        state.after = after;
        state.before = before;
        let colorCount = -1
        //using the "name" property of a thing as the id, i think that's what i use for 'before' and 'after' and i don't see any reason to distinguish
        //also just saving the "data" part of the subreddit, i think everything i want will be in there
        state.subreddits = children.map((subreddit) => {
          colorCount++;
          return {
          id: subreddit.data.name, 
          isSelected: (subreddit.id === state.selectedSubredditId), 
          backColor: backColors[colorCount],
          data: subreddit.data
        }});
      })
      .addCase(loadSubreddits.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  }
});

export const selectSubreddits = (state) => state.subreddits;
export const { selectSubreddit } = subredditsSlice.actions;
export default subredditsSlice.reducer;