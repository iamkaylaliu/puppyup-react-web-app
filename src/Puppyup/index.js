import { Route, Routes, Navigate } from "react-router";
import KanbasNavigation from "./KanbasNavigation";
import Courses from "./Courses";
import Account from "./Account";
import Dashboard from "./Dashboard";
import db from "./Database";
import { useState } from "react";
import store from "./store";
import { Provider } from "react-redux";
import Search from "./Search/search"
import "./index.css";
import Details from "./Search/details";

function Puppyup() {
   const [courses, setCourses] = useState(db.courses);
   const [course, setCourse] = useState({
      name: "",
      number: "",
      startDate: "",
      endDate: "",
   });

   const updateCourse = () => {
      setCourses(
         courses.map((c) => {
            if (c._id === course._id) {
               return course;
            } else {
               return c;
            }
         })
      );
   };

   const addNewCourse = () => {
      setCourses([
         ...courses,
         {
            ...course,
            _id: new Date().getTime(),
         },
      ]);
   };

   const deleteCourse = (courseId) => {
      setCourses(courses.filter((c) => c._id !== courseId));
   };

   return (
      <Provider store={store}>
         <div>
            <div className="wd-top-bar">
                <img className="wd-logo mx-3 my-3" src="logo.jpg" alt=""/>
                <span className="wd-web-app-name">PuppyUp!</span>
            </div>
            <div className="d-flex">
               <KanbasNavigation />
               <div  className="wd-sub flex-grow-1">
                  <Routes>
                     <Route path="/" element={<Navigate to="Dashboard" />} />
                     <Route path="Account" element={<Account />} />
                     <Route path="Dashboard" element={
                        <Dashboard
                           courses={courses}
                           course={course}
                           setCourse={setCourse}
                           addNewCourse={addNewCourse}
                           deleteCourse={deleteCourse}
                           updateCourse={updateCourse} />
                     } />
                     <Route path="Courses" element={<Navigate to="RS101/Home" />} />
                     <Route path="Courses/:courseId/*" element={
                        <Courses courses={courses} />
                     } />
                     <Route path="Calendar" element={<h1>Calendar</h1>} />
                     <Route path="MarketPlace/:search" element={<Search />} />
                     <Route path="MarketPlace" element={<Search />} />
                     <Route path="MarketPlace/details/:itemId" element={<Details />} />
                  </Routes>
               </div>
            </div>   
         </div>
      </Provider>
   );
}
export default Puppyup;