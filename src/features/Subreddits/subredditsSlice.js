import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { conductLinkSearch } from "../Links/linksSlice";

const initialState = {
  after: null,
  before: null,
  limit: 6,
  count: 0,
  subreddits: [],
  selectedSubreddit: {},
  searchTerm: "",
  isLoading: false,
  hasError: false
};

const iconColors = ["#0066CC","#175DB9","#2E53A7","#464A94","#5D4182","#74386F",
                    "#8B2E5D","#A2254A","#B91C38","#D11325","#E80913","#FF0000"];
const backColors = ["#8FBDE8","#99B9E0","#A3B5D8","#AEB0D0","#B8ACC8","#C2A8C0",
                    "#CCA4B7","#D6A0AF","#E09CA7","#EB979F","#F59397","#FF8F8F"];

export const loadSubreddits = createAsyncThunk(
  "subreddits/getSubredditsList",
  async ({ searchTerm, limit, pageChange }, { getState }) => {
    let url;
    const state = getState().subreddits;
    if (searchTerm === "") {
      url = "https://www.reddit.com/subreddits.json"
    } else {
      url = "https://www.reddit.com/subreddits/search.json"
    }
    if (searchTerm !== state.searchTerm) {
      state.count = 0;
      pageChange = "";
    }
    limit = limit || state.limit;
    const searchQuery = "q=" + searchTerm;
    const limitQuery = "limit=" + limit;
    let count = state.count;
    let pageChangeQuery = "";
    if (pageChange === "next" && state.after !== null) {
      count = count + limit;
      pageChangeQuery = 'after=' + state.after + '&count=' + count;
    };
    if (pageChange === "prev" && state.before !== null) {
      pageChangeQuery = 'before=' + state.before + '&count=' + count;
      count = count - limit;
    };
    const query = "?" + (searchTerm !== "" ? searchQuery + "&" : "") + limitQuery + (pageChangeQuery !== "" ? "&" + pageChangeQuery : "") ;
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
    },
    conductSubredditSearch: (state, action) => {
      const { searchTerm, searchType } = action.payload;
      state.searchTerm = searchTerm;
      if (searchType === "both") {
        state.selectedSubreddit = {};
      };
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
      })
      .addCase(conductLinkSearch, (state) => {
        console.log('got here!')
        //when we conduct a new link search, we deselect subreddits)
        state.selectedSubreddit = {};
        state.subreddits.forEach((subreddit) => (subreddit.isSelected = false));
      })
  }
});

export const selectSubreddits = (state) => state.subreddits;
export const selectedSubreddit = (state) => state.subreddits.selectedSubreddit;
export const { selectSubreddit, conductSubredditSearch } = subredditsSlice.actions;
export default subredditsSlice.reducer;