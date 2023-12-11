import { Route, Routes, Navigate } from "react-router";
import PuppyUpNavigation from "./PuppyUpNavigation";
import Account from "./users/account";
import store from "./store";
import { Provider } from "react-redux";
import Search from "./Search/search"
import "./index.css";
import Details from "./Search/details";
import SignIn from "./users/signin";
import { Link } from "react-router-dom";
import Profile from "./users/profile";
import SignUp from "./users/signup";
import UserList from "./users/list";
import VetList from "./admin/vets";
import ParkList from "./admin/parks";
import CurrentUser from "./users/currentUser";
import Welcome from "./users/welcome";
import MyPosts from "./posts/myPosts";
import Home from "./posts/home";
import DoctorList from "./admin/doctor/doctor";
import StaffList from "./admin/staff/staff";
import AdList from "./ads/adList";
function Puppyup() {
   return (
      <Provider store={store}>
         <CurrentUser>
         <div style={{maxWidth: "100%"}}>
            <div className="wd-top-bar">
                <img className="wd-logo mx-3 my-3" src="logo.jpg" alt=""/>
                <span className="wd-web-app-name">PuppyUp!</span>
                
                <Welcome />
                
            </div>
            <div className="d-flex">
               <PuppyUpNavigation />
               <div  className="wd-sub flex-grow-1" style={{maxWidth: "100%"}}>
                  <Routes>
                     <Route path="/" element={<Navigate to="Home" />} />
                     <Route path="Account" element={<Account />} />
                     <Route path="Ads" element={<AdList />} />
                     <Route path="MarketPlace/:search" element={<Search />} />
                     <Route path="MarketPlace" element={<Search />} />
                     <Route path="MarketPlace/details/:itemId" element={<Details />} />
                     <Route path="signin" element={<SignIn />} />
                     <Route path="signup" element={<SignUp />} />
                     <Route path="Admin" element={<UserList />} />

                     <Route path="Admin/users" element={<UserList />} />
                     <Route path="Admin/vets" element={<VetList />} />
                     <Route path="Admin/parks" element={<ParkList />} />
                     <Route path="Profile/users/:id" element={<Profile />} />
                     <Route path="Profile" element={<Profile />} />
                     <Route path="MyPost" element={<MyPosts />} />
                     <Route path="Home" element={<Home />} />
                     <Route path="Admin/vets/:vetId" element={<DoctorList />} />
                     <Route path="Admin/parks/:parkId" element={<StaffList />} />

                  </Routes>
               </div>
            </div>   
         </div>
         </CurrentUser>
      </Provider>
   );
}
export default Puppyup;