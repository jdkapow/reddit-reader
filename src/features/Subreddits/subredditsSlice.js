import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  after: null,
  before: null,
  limit: 12,
  count: 0,
  subreddits: [],
  selectedSubreddit: {},
  isLoading: false,
  hasError: false
};

const iconColors = ["#0066CC","#175DB9","#2E53A7","#464A94","#5D4182","#74386F",
                    "#8B2E5D","#A2254A","#B91C38","#D11325","#E80913","#FF0000"];
const backColors = ["#8FBDE8","#99B9E0","#A3B5D8","#AEB0D0","#B8ACC8","#C2A8C0",
                    "#CCA4B7","#D6A0AF","#E09CA7","#EB979F","#F59397","#FF8F8F"];

export const loadSubreddits = createAsyncThunk(
  "subreddits/getSubredditsList",
  async ({ limit, pageChange }, { getState }) => {
    const url = "https://www.reddit.com/subreddits.json"
    const state = getState().subreddits;
    limit = limit || state.limit;
    let query = "?limit=" + limit;
    let count = state.count;
    if (pageChange === "next" && state.after !== null) {
      count = count + limit;
      query = query + '&after=' + state.after + '&count=' + count;
    };
    if (pageChange === "prev" && state.before !== null) {
      query = query + '&before=' + state.before + '&count=' + count;
      count = count - limit;
    };
    const data = await fetch(url + query);
    const json = await data.json();
    return {limit: limit, count: count, json: json};
  }
);

const subredditsSlice = createSlice({
  name: 'subreddits',
  initialState: initialState,
  reducers: {
    selectSubreddit: (state, action) => {
      const { id, subreddit } = action.payload;
      state.selectedSubreddit = subreddit;
      state.subreddits.forEach((subreddit) => (subreddit.isSelected = (subreddit.id === id)));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSubreddits.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadSubreddits.fulfilled, (state, action) => {
        const { limit, count, json } = action.payload;
        //the json response should always be wrapped in a 'listing' object
        //which contains 'kind' (which we don't care about) and 'data'
        //before and after are used to move to the next or previous page listing of subreddits
        //all the objects in json.data.children should be subreddits, so we can just pass the children object to state
        const { after, before, children } = json.data;
        state.isLoading = false;
        state.hasError = false; 
        state.limit = limit;
        state.count = count;
        state.after = after;
        state.before = before;
        let colorCount = -1
        //using the "name" property of a thing as the id, serves as unique id and needed for 'prev' and 'next'
        //also just saving the "data" part of the subreddit
        state.subreddits = children.map((subreddit) => {
          colorCount++;
          return {
          id: subreddit.data.name,
          linkName: subreddit.data.display_name_prefixed,
          isSelected: (subreddit.data.name === state.selectedSubreddit.id), 
          iconColor: iconColors[colorCount],
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
export const selectedSubreddit = (state) => state.subreddits.selectedSubreddit;
export const { selectSubreddit } = subredditsSlice.actions;
export default subredditsSlice.reducer;