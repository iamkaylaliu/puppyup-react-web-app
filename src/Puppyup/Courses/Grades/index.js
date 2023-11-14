import db from "../../Database";
import { useParams } from "react-router-dom";
import GradesButtons from "./GradesButtons";
import "./index.css";

function Grades() {
    const { courseId } = useParams();
    const assignments = db.assignments.filter((assignment) => assignment.course === courseId);
    const enrollments = db.enrollments.filter((enrollment) => enrollment.course === courseId);

    return (
        <div>
            <h1>Grades</h1>
            <GradesButtons />
            <div className="table-responsive">
                <table className="table table-striped" border="1" width="100%">
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            {assignments.map((assignment) => (
                                <th>{assignment.title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {enrollments.map((enrollment) => {
                            const user = db.users.find((user) => user._id === enrollment.user);
                            return (
                                <tr>
                                    <td style={{ color: "red" }}>
                                        {user.firstName} {user.lastName}
                                    </td>
                                    {assignments.map((assignment) => {
                                        const grade = db.grades.find(
                                            (grade) =>
                                                grade.student === enrollment.user && grade.assignment === assignment._id
                                        );
                                        return <td contenteditable="true">{grade?.grade || "88%"}</td>;
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Grades;
