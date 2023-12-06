import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/modulesReducer";
import assignmentsReducer from "../Courses/Assignments/assignmentsReducer";
import userReducer from "../users/reducer";
const store = configureStore({
    reducer: {
        modulesReducer,
        assignmentsReducer,
        userReducer,
    }
});

export default store;
