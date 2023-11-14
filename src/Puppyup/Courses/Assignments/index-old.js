import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment } from "./assignmentsReducer"; // Update your import
import "./index.css";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { FaPlus } from "react-icons/fa";
import AssignmentButtons from "./AssignmentButtons";

function Assignments() {
    const { courseId } = useParams();
    const assignments = useSelector((state) => state.assignmentsReducer.assignments);
    const dispatch = useDispatch();
    const courseAssignments = assignments.filter((assignment) => assignment.course === courseId);
    const [assignmentToDelete, setAssignmentToDelete] = useState(null);
    const handleDeleteAssignment = (assignment) => {
        // Display a confirmation dialog
        const confirmDelete = window.confirm("Are you sure you want to remove this assignment?");

        if (confirmDelete) {
            // Delete the assignment and update the state
            dispatch(deleteAssignment(assignment._id));
            setAssignmentToDelete(null); // Clear the assignment to be deleted
        }
    };


    return (
        <div>
            <h2>Assignments</h2>
            <AssignmentButtons />
            <ul className="list-group course-modules">
                <li className="list-group-item">
                    <Link to={`/Kanbas/Courses/${courseId}/Assignments/AssignmentEditor`}>
                        <button className="btn btn-danger btn-equal-height ml-2">
                            <FaPlus style={{ color: "white" }} />
                            Assignment
                        </button>
                    </Link>
                </li>

                <li className="list-group-item-title">
                    <div className="module-header" style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                            <PiDotsSixVerticalBold />
                            <h3>
                                Assignments for course {courseId}
                            </h3>
                        </div>
                        <div className="icons">
                            <BsFillCheckCircleFill className="check-icon" />
                            <IoEllipsisVerticalSharp className="dots-icon" />
                        </div>
                    </div>
                </li>
                <div className="list-group">
                    {courseAssignments.map((assignment) => (
                        <li key={assignment._id} className="list-group-item">
                            <div className="assignment-header" style={{ display: "flex", justifyContent: "space-between" }}>
                                <div>
                                    <Link to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}>
                                        <PiDotsSixVerticalBold />
                                        <h3>{assignment.title}</h3>
                                    </Link>
                                </div>

                                <div className="icons">
                                    <button className="btn btn-danger" style={{ marginRight: '10px' }}
                                        onClick={() => handleDeleteAssignment(assignment)}
                                    >
                                        Delete
                                    </button>
                                    <BsFillCheckCircleFill className="check-icon" />
                                    <IoEllipsisVerticalSharp className="dots-icon" />
                                </div>
                            </div>
                        </li>
                    ))}
                </div>
            </ul>
        </div>
    );
}

export default Assignments;
