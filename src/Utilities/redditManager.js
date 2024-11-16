
const redditManager = {
  getRedditData(pageLink) {
    if (!pageLink || !(pageLink.includes('json'))) {
      return null;
    }
    return fetch(pageLink).then(response => {
      return response.json();
    });
  }
};


export default redditManager;