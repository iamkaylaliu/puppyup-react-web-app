import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

function Dashboard(
    { courses, course, setCourse, addNewCourse,
        deleteCourse, updateCourse }
) {

    return (
        <div style={{ marginLeft: "20px" }}>
            <h2>Dashboard</h2>
            <hr />
            <h3>Published Courses ({courses.length})</h3>
            <hr />
            <div className="course-inputs">
                <div>
                    <input
                        value={course.name}
                        className="form-control"
                        onChange={(e) => setCourse({ ...course, name: e.target.value })}
                        placeholder="Course Name"
                    />
                </div>
                <div>
                    <input
                        value={course.number}
                        className="form-control"
                        onChange={(e) => setCourse({ ...course, number: e.target.value })}
                        placeholder="Course Number"
                    />
                </div>
                <div>
                    <input
                        value={course.startDate}
                        className="form-control"
                        type="date"
                        onChange={(e) => setCourse({ ...course, startDate: e.target.value })}
                        placeholder="Start Date"
                    />
                </div>
                <div>
                    <input
                        value={course.endDate}
                        className="form-control"
                        type="date"
                        onChange={(e) => setCourse({ ...course, endDate: e.target.value })}
                        placeholder="End Date"
                    />
                </div>
                <button className="btn btn-success" onClick={addNewCourse}>
                    Add
                </button>
                <button className="btn btn-primary" onClick={updateCourse}>
                    Update
                </button>
            </div>
            <div className="list-group">
                {courses.map((c) => (
                    <Link key={c._id} to={`/Puppyup/Courses/${c._id}`} className="list-group-item">
                        <div className="course-item">
                            <span>{c.name}</span>
                            <div className="course-buttons">
                                <button className="btn btn-warning"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCourse(c);
                                    }}
                                >
                                    Edit
                                </button>
                                <button className="btn btn-danger"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        deleteCourse(c._id);
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
