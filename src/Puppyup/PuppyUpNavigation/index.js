import { Link, useLocation } from "react-router-dom";

import { FaUser } from "react-icons/fa";
import { TfiDashboard } from "react-icons/tfi";
import { BiSolidBook } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";
import { PiMagnifyingGlassLight } from "react-icons/pi";
import { CiStickyNote } from "react-icons/ci";
import { CiHome } from "react-icons/ci";
import { GrUserAdmin } from "react-icons/gr";
import { GiEgyptianProfile } from "react-icons/gi";
import { FaBuysellads } from "react-icons/fa";


import "./index.css";

function PuppyUpNavigation() {
    const links = ["Home","MyPost","Account", "Profile", "Ads", "MarketPlace", "Admin"];

    const linkToIconMap = {
        Home: <CiHome className="wd-icon"/>,
        MyPost: <CiStickyNote className="wd-icon"/>,
        Account: <FaUser className="wd-icon" />,
        Profile: <GiEgyptianProfile className="wd-icon" />,
        Ads: <FaBuysellads className="wd-icon" />,
        MarketPlace: <PiMagnifyingGlassLight className="wd-icon" />,
        Admin: <GrUserAdmin className="wd-icon" />
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
export default PuppyUpNavigation;
