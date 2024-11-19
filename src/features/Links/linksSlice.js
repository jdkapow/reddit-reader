import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  after: null,
  before: null,
  limit: 12,
  count: 0,
  links: [],
  selectedLink: {},
  isLoading: false,
  hasError: false
};

//if we haven't selected a subreddit or performed a search,
//just return the "reddit.com/top/.json" results
const defaultLinkName = 'top';

export const loadLinks = createAsyncThunk(
  "links/loadLinks",
  async ({ limit, pageChange, subredditLinkName }, { getState }) => {
    const url = "https://www.reddit.com/" + (subredditLinkName || defaultLinkName) + "/.json";
    const state = getState().links;
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

const linksSlice = createSlice({
  name: 'links',
  initialState: initialState,
  reducers: {
    selectLink: (state, action) => {
      const { id, link } = action.payload;
      state.selectedLink = {...link, isSelected: true};
      state.links.forEach((link) => (link.isSelected = (link.id === id)));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadLinks.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadLinks.fulfilled, (state, action) => {
        const { limit, count, json } = action.payload;
        //the json response should always be wrapped in a 'listing' object
        //which contains 'kind' (which we don't care about) and 'data'
        //before and after are used to move to the next or previous page listing of subreddits
        //all the objects in json.data.children should be links, so we can just pass the children object to state
        const { after, before, children } = json.data;
        state.isLoading = false;
        state.hasError = false; 
        state.limit = limit;
        state.count = count;
        state.after = after;
        state.before = before;
        //using the "name" property of a thing as the id, serves as unique id and needed for 'prev' and 'next'
        //also just saving the "data" part of the link
        state.links = children.map((link) => {
          return {
          id: link.data.name, 
          isSelected: (link.data.name === state.selectedLink.id), 
          data: link.data
        }});
      })
      .addCase(loadLinks.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  }
});

export const selectLinks = (state) => state.links;
export const selectedLink = (state) => state.links.selectedLink;
export const { selectLink } = linksSlice.actions;
export default linksSlice.reducer;