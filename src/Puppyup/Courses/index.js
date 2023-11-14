import { Navigate, Route, Routes, useParams, useLocation, Link } from 'react-router-dom';
import CourseNavigation from './CourseNavigation';
import Modules from './Modules';
import Home from './Home';
import Assignments from './Assignments';
import AssignmentEditor from './Assignments/AssignmentEditor';
import Grades from './Grades';
import "./index.css";
import { PiListDashesBold } from "react-icons/pi";

function Courses({ courses }) {
    const { courseId } = useParams();
    const course = courses.find((course) => course._id === courseId);
    const location = useLocation();

    const pathSegments = location.pathname.split('/').filter((segment) => segment !== '');

    // Remove the initial segments that you want to exclude
    const segmentsToDisplay = pathSegments.slice(3);

    const breadcrumb = segmentsToDisplay.map((segment, index) => {
        const to = '/' + segmentsToDisplay.slice(0, index + 1).join('/');
        const label = segment.charAt(0).toUpperCase() + segment.slice(1); // Capitalize the first letter
        return (
            <li key={to} className="breadcrumb-item">
                {index === segmentsToDisplay.length - 1 ? (
                    label
                ) : (
                    <Link to={to}>{label}</Link>
                )}
            </li>
        );
    });

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to={`/Puppyup/Courses/${courseId}/Home`}>
                            <PiListDashesBold /> Course {course.name}
                        </Link>
                    </li>
                    {breadcrumb}
                </ol>
            </nav>

            <CourseNavigation />
            <div>
                <div
                    className="overflow-y-scroll position-fixed bottom-0 end-0"
                    style={{
                        left: '320px',
                        top: '50px',
                    }}
                >
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route
                            path="Assignments/:assignmentId"
                            element={<AssignmentEditor />}
                        />
                        <Route path="Grades" element={<Grades />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default Courses;
