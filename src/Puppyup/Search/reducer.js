import { createSlice } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";

const initialState = {
  currentSearch: 'dog treat',
  searchResults: null,

};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setCurrentSearch(state, action) {
      state.currentSearch = action.payload;
    },
    setSearchResults(state, action) {
        state.searchResults = action.payload;
    },
  },
});

export const { setCurrentSearch, setSearchResults } = searchSlice.actions;
export default searchSlice.reducer;