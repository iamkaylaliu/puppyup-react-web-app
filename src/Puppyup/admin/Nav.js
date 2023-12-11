import { Link, useLocation } from "react-router-dom";
import "./index.css";
function Nav() {
  const { pathname } = useLocation();
  return (
    <nav className="nav nav-tabs mt-2">
      <Link to="/PuppyUp/Admin/users"
            className={`nav-link ${pathname.includes("users") ? "active" : ""}`}>Users</Link>
      <Link to="/PuppyUp/Admin/vets"
            className={`nav-link ${pathname.includes("vets") ? "active" : ""}`}>Vets</Link>      
      <Link to="/PuppyUp/Admin/parks"
            className={`nav-link ${pathname.includes("parks") ? "active" : ""}`}>Parks</Link>        
      
    </nav>
  );
}
export default Nav;