export const initialState = {
  user: null,
  token: null,
  playlists: [],
  playing: false,
  item: null,
  discover_weekly: null,
  top_artists: null,
  spotify: null,
  search_results: null,
  view: "home", // "home" or "search"
};

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    case "SET_DISCOVER_WEEKLY":
      return {
        ...state,
        discover_weekly: action.discover_weekly,
      };
    case "SET_PLAYING":
      return {
        ...state,
        playing: action.playing,
      };
    case "SET_ITEM":
      return {
        ...state,
        item: action.item,
      };
    case "SET_SEARCH_RESULTS":
      return {
        ...state,
        search_results: action.search_results,
      };
    case "SET_VIEW":
      return {
        ...state,
        view: action.view,
      };
    default:
      return state;
  }
};

export default reducer;