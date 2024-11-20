

//function to get subreddit limit from window height
export function getSubredditLimit() {
  return Math.min(12, (Math.floor((window.innerHeight - 70)/ 48) - 2));
};