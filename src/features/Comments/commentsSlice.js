import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  limit: 36,
  first: 0,
  selectedPostId: "",
  comments: [],
  moreComments: [],
  isLoading: false,
  hasError: false
};

export const loadComments = createAsyncThunk(
  "comments/loadComments",
  async ({ postName, first, limit }, { getState }) => {
    //the url for getting comment data uses the post id (not fullname)
    const postId = (postName.slice(0,3) === "t3_") ? postName.substring(3) : postName;
    const url = "https://www.reddit.com/comments/" + postId + "/.json";
    const state = getState().comments;
    const data = await fetch(url);
    const json = await data.json();
    return {postId: postId, limit: !limit ? state.limit : limit, first: !first ? 0 : first, json: json};
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadComments.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        const { postId, limit, first, json } = action.payload;
        //for comments, the json response is an array
        //of two objects
        //the first object is the post itself--we'll ignore that
        //the second one contains all the comment information
        const comments = json[1].data.children;
        state.selectedPostId = postId; 
        state.limit = limit;
        state.first = first;
        const commentsData = comments.filter((comment) => (comment.kind !== "more"));
        const moreCommentsData = comments.filter((comment) => (comment.kind === "more"));
        state.comments = commentsData.map((comment) => {
          const data = comment.data;
          return {
            id: data.id,
            author: data.author,
            body: data.body,
            ups: data.ups,
            created: data.created,
            replies: !data.replies.data ? [] : data.replies.data.children,
          };
        });
        if (moreCommentsData.length === 0) {
          state.moreComments = [];
        } else {
          state.moreComments = moreCommentsData[0].data.children;
        };
      })
      .addCase(loadComments.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  }
});

export const selectComments = (state) => state.comments;
export default commentsSlice.reducer;