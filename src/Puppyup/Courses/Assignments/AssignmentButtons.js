import React from "react";
import { FaPlus, FaEllipsisV } from "react-icons/fa";

function AssignmentButtons() {
    return (
        <>
            <div className="d-flex justify-content-between mb-3 course-buttons">
                <input
                    type="text"
                    placeholder="Search for assignments"
                    className="form-control"
                    style={{ width: "260px" }}
                />
                <div>
                    <button className="btn btn-primary btn-equal-height ml-2">
                        <FaPlus style={{ color: "black" }} /> Group
                    </button>
                    {/* <button className="btn btn-danger btn-equal-height ml-2">
                        <FaPlus style={{ color: "white" }} /> Assignments
                    </button> */}
                    <button className="btn btn-primary btn-lg btn-equal-height ml-2">
                        <FaEllipsisV style={{ color: "black" }} />
                    </button>
                </div>
            </div>
            <hr />
        </>
    );
}

export default AssignmentButtons;
