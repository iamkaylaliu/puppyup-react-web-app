import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../users/reducer";
import searchReducer from "../Search/reducer";
const store = configureStore({
    reducer: {
        userReducer,
        searchReducer
    }
});

export default store;
