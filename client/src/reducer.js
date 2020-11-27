export const initialState = {
  user: null,
  loading: false,
  pageLoading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_PAGE_LOADING":
      return { ...state, pageLoading: action.payload };
    default:
      return state;
  }
};

export default reducer;
