import React from "react";
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";

function AssignmentEditorButtons() {
    return (
        <div>
            <div className="d-flex justify-content-end mb-3 course-buttons">
                <div className="ml-2">
                    <button className="btn btn-fourth">
                        <FaCheckCircle className="icon-margin" style={{ color: "green" }} /> <span style={{ color: "green" }}>Published</span>
                    </button>
                </div>
                <div className="ml-2">
                    <button className="btn btn-primary btn-lg">
                        <FaEllipsisV style={{ color: "black" }} />
                    </button>
                </div>
            </div>
            <hr />
        </div>
    );
}

export default AssignmentEditorButtons;
