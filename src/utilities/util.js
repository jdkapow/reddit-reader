

//function to get subreddit limit from window height
export function getSubredditLimit() {
  return Math.min(12, (Math.floor((window.innerHeight - 70)/ 48) - 2));
};

export function calculateCreatedText(created) {
  const createdAgo = Math.abs(new Date() - (new Date(created * 1000))) / 1000;
  if (createdAgo < 60) {
    return "Just now";
  };
  if (createdAgo < 3600) {
    return `${Math.floor(createdAgo / 60)} minutes ago`; 
  }
  if (createdAgo < 86400) {
    return `${Math.floor(createdAgo / 3600)} hours ago`;
  } 
  return `${Math.floor(createdAgo / 86400)} days ago`;
}