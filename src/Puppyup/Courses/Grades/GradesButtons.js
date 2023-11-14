import React from "react";
import { FaDownload, FaUpload, FaCog, FaFilter } from "react-icons/fa";

function GradesButtons() {
    return (
        <>
            <div className="d-flex justify-content-end mb-3 course-buttons">
                <div className="ml-2">
                    <button className="btn btn-primary btn-equal-height">
                        <FaDownload style={{ color: "black" }} /> Import
                    </button>
                </div>
                <div className="ml-2">
                    <button className="btn btn-primary btn-equal-height">
                        <FaUpload style={{ color: "black" }} /> Export
                    </button>
                </div>
                <div className="ml-2">
                    <button className="btn btn-primary btn-lg btn-equal-height">
                        <FaCog style={{ color: "black" }} />
                    </button>
                </div>
            </div>

            <div className="mb-3">
                <div className="row">
                    <div className="col-6">
                        <label htmlFor="title1" className="form-label">Student Names</label>
                    </div>
                    <div className="col-6">
                        <label htmlFor="title2" className="form-label">Assignment Names</label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <select className="form-select" id="title1">
                            <option value="" disabled selected>Search student name</option>
                            <option value="Alice Armstrong">Alice Armstrong</option>
                            <option value="Bob Brown">Bob Brown</option>
                            <option value="Cindy Chaplin">Cindy Chaplin</option>
                        </select>
                    </div>
                    <div className="col-6">
                        <select className="form-select" id="title2">
                            <option value="" disabled selected>Search assignment name</option>
                            <option value="Alice Armstrong">A1</option>
                            <option value="Bob Brown">A2</option>
                            <option value="Cindy Chaplin">A3</option>
                        </select>
                    </div>
                </div>
                <div className="course-buttons">
                    <button className="btn btn-primary">
                        <FaFilter style={{ color: "black" }} /> Apply Filters
                    </button>
                </div>
            </div>
            <hr />
        </>
    )
}

export default GradesButtons;
