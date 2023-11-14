import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { addAssignment, updateAssignment } from "../assignmentsReducer";
import AssignmentEditorButtons from "./AssignmentEditorButtons";

function AssignmentEditor() {
    const { assignmentId, courseId } = useParams();
    const dispatch = useDispatch();
    const assignments = useSelector((state) => state.assignmentsReducer.assignments);

    // Find the assignment by ID
    const assignment = assignments.find((assignment) => assignment._id === assignmentId);

    // Initialize state for assignment fields
    const [assignmentData, setAssignmentData] = useState({
        name: assignment ? assignment.title : "New Assignment",
        description: assignment ? assignment.description : "New Assignment Description",
        points: assignment ? assignment.points : "100",
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
        console.log("Saving assignment with data:", assignmentData);
        console.log("assignmentData:", assignmentData); // Add this line to check the assignmentData
        if (assignmentId) {
            // If assignmentId is present, it's an existing assignment, so update it
            console.log("Updating assignment with ID:", assignmentId);
            dispatch(updateAssignment({ _id: assignmentId, ...assignmentData }));
        } else {
            // If assignmentId is not present, it's a new assignment, so add it
            console.log("Adding a new assignment:", assignmentData);
            const newAssignment = {
                ...assignmentData,
                _id: new Date().getTime().toString(),
            };
            dispatch(addAssignment(courseId, newAssignment));
        }

        // Redirect back to the Assignments page
        navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    };

    // const handleSave = () => {
    //     if (assignmentId) {
    //         // If assignmentId is present, it's an existing assignment, so update it
    //         dispatch(updateAssignment({ _id: assignmentId, ...assignmentData }));
    //     } else {
    //         // If assignmentId is not present, it's a new assignment, so add it
    //         const newAssignment = {
    //             ...assignmentData,
    //             _id: new Date().getTime().toString(), // Generate a unique ID
    //         };
    //         dispatch(addAssignment(courseId, newAssignment));
    //     }

    //     // Redirect back to the Assignments page
    //     navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    // };



    return (
        <div>
            <AssignmentEditorButtons />
            <h2>Assignment Name</h2>
            <input
                value={assignmentData.name}
                className="form-control mb-2"
                onChange={(e) => handleFieldChange("name", e.target.value)}
            />
            <h2>Description</h2>
            <textarea
                value={assignmentData.description}
                className="form-control mb-2"
                onChange={(e) => handleFieldChange("description", e.target.value)}
            />
            <div>
                <h2>Points</h2>
                <input
                    type="number"
                    value={assignmentData.points}
                    className="form-control"
                    onChange={(e) => handleFieldChange("points", e.target.value)}
                />
            </div>

            <div>
                <h2>Assign</h2>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ flex: 1, marginRight: '5px' }}>
                        <label>Due</label>
                        <input
                            type="date"
                            value={assignmentData.dueDate}
                            className="form-control"
                            onChange={(e) => handleFieldChange("dueDate", e.target.value)}
                        />
                    </div>
                    <div style={{ flex: 1, marginRight: '5px' }}>
                        <label>Available from</label>
                        <input
                            type="date"
                            value={assignmentData.availableFromDate}
                            className="form-control"
                            onChange={(e) => handleFieldChange("availableFromDate", e.target.value)}
                        />
                    </div>
                    <div style={{ flex: 1, marginRight: '5px' }}>
                        <label>Until</label>
                        <input
                            type="date"
                            value={assignmentData.availableUntilDate}
                            className="form-control"
                            onChange={(e) => handleFieldChange("availableUntilDate", e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <br />

            <Link to={`/Kanbas/Courses/${courseId}/Assignments`} className="btn btn-danger" style={{ marginRight: '10px' }}>
                Cancel
            </Link>
            <button onClick={handleSave} className="btn btn-success me-2">
                Save
            </button>
        </div>
    );
}

export default AssignmentEditor;
