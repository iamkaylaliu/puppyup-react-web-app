import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { addAssignment, updateAssignment } from "../assignmentsReducer"; // Update your import
import AssignmentEditorButtons from "./AssignmentEditorButtons";

function AssignmentEditor() {
    const { assignmentId, courseId } = useParams();
    const dispatch = useDispatch();
    const assignments = useSelector((state) => state.assignmentsReducer.assignments);

    // Find the assignment by ID
    const assignment = assignments.find((assignment) => assignment._id === assignmentId);

    // Initialize state for assignment fields
    const [assignmentData, setAssignmentData] = useState({
        name: assignment ? assignment.title : "",
        description: assignment ? assignment.description : "",
        dueDate: assignment ? assignment.dueDate : "",
        availableFromDate: assignment ? assignment.availableFromDate : "",
        availableUntilDate: assignment ? assignment.availableUntilDate : "",
    });

    // Get the navigate function
    const navigate = useNavigate();

    // Handle changes in assignment fields
    const handleFieldChange = (field, value) => {
        setAssignmentData({
            ...assignmentData,
            [field]: value,
        });
    };


    const handleSave = () => {
        if (assignmentId) {
            // If assignmentId is present, it's an existing assignment, so update it
            dispatch(updateAssignment({ _id: assignmentId, ...assignmentData }));
        } else {
            // If assignmentId is not present, it's a new assignment, so add it
            const newAssignment = {
                ...assignmentData,
                _id: new Date().getTime().toString(), // Generate a unique ID
            };
            dispatch(addAssignment(courseId, newAssignment));
        }

        // Redirect back to the Assignments page
        navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    };


    return (
        <div>
            <AssignmentEditorButtons />
            <h2>Assignment Name</h2>
            <input
                value={assignmentData.name}
                className="form-control mb-2"
                onChange={(e) => handleFieldChange("name", e.target.value)}
            />
            {/* Add input fields and handlers for other assignment fields (description, dueDate, etc.) */}
            <Link to={`/Kanbas/Courses/${courseId}/Assignments`} className="btn btn-danger">
                Cancel
            </Link>
            <button onClick={handleSave} className="btn btn-success me-2">
                Save
            </button>
        </div>
    );
}

export default AssignmentEditor;
