import { Link, useLocation } from "react-router-dom";

import { FaUser } from "react-icons/fa";
import { TfiDashboard } from "react-icons/tfi";
import { BiSolidBook } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";
import "./index.css";

function KanbasNavigation() {
    const links = ["Account", "Dashboard", "Courses", "Calendar"];

    const linkToIconMap = {
        Account: <FaUser className="wd-icon" />,
        Dashboard: <TfiDashboard className="wd-icon" />,
        Courses: <BiSolidBook className="wd-icon" />,
        Calendar: <AiOutlineCalendar className="wd-icon" />,
    };

    const { pathname } = useLocation();
    return (
        <div className="list-group wd-kanbas-navigation" >
            {links.map((link, index) => (
                <Link
                    key={index}
                    to={`/Puppyup/${link}`}
                    className={`list-group-item ${pathname.includes(link) && "active"}`}
                >
                    {linkToIconMap[link]}
                    <br />
                    {link}
                </Link>
            ))}
        </div>
    );
}
export default KanbasNavigation;
