import { Link, useLocation } from "react-router-dom";

import { FaUser } from "react-icons/fa";
import { TfiDashboard } from "react-icons/tfi";
import { BiSolidBook } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";
import { PiMagnifyingGlassLight } from "react-icons/pi";

import "./index.css";

function KanbasNavigation() {
    const links = ["Account", "Dashboard", "Courses", "Calendar", "MarketPlace"];

    const linkToIconMap = {
        Account: <FaUser className="wd-icon" />,
        Dashboard: <TfiDashboard className="wd-icon" />,
        Courses: <BiSolidBook className="wd-icon" />,
        Calendar: <AiOutlineCalendar className="wd-icon" />,
        MarketPlace: <PiMagnifyingGlassLight className="wd-icon" />
    };

    const { pathname } = useLocation();
    return (
        <div>
            <div className="list-group wd-kanbas-navigation px-2" >
                {links.map((link, index) => (
                    <Link
                        key={index}
                        to={`/Puppyup/${link}`}
                        className={`list-group-item ${pathname.includes(link) && "active"}`}
                    >
                        {linkToIconMap[link]}
                        <span className="px-2">{link}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
export default KanbasNavigation;
