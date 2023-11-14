import React from "react";
import { IoBan, IoCheckmarkCircle, IoCloudUploadOutline, IoShareSocial, IoHome, IoMegaphone, IoAnalytics, IoNotifications } from "react-icons/io5";
import "./index.css"

function Status() {
    const iconMap = {
        "unpublish": <IoBan style={{ color: "black" }} />,
        "published": <IoCheckmarkCircle style={{ color: "white" }} />,
        "import-existing": <IoCloudUploadOutline style={{ color: "black" }} />,
        "import-commons": <IoShareSocial style={{ color: "black" }} />,
        "choose-home": <IoHome style={{ color: "black" }} />,
        "view-stream": <IoAnalytics style={{ color: "black" }} />, // Replaced with IoAnalytics
        "new-announcement": <IoMegaphone style={{ color: "black" }} />,
        "new-analytics": <IoAnalytics style={{ color: "black" }} />,
        "view-notifications": <IoNotifications style={{ color: "black" }} />,
    };

    return (
        <div style={{ marginLeft: "20px" }}>
            <div className="container">
                <h4>Course Status</h4><br />
                <div className="course-buttons">
                    <button className="btn btn-primary">
                        {iconMap["unpublish"]} Unpublish
                    </button>

                    <button className="btn btn-third">
                        {iconMap["published"]} Published
                    </button>
                </div>

                {/* 7 long buttons */}
                <div className="course-buttons">
                    <button className="btn btn-primary-long">
                        {iconMap["import-existing"]} Import Existing Content
                    </button>

                    <button className="btn btn-primary-long">
                        {iconMap["import-commons"]} Import from Commons
                    </button>

                    <button className="btn btn-primary-long">
                        {iconMap["choose-home"]} Choose Home Page
                    </button>

                    <button className="btn btn-primary-long">
                        {iconMap["view-stream"]} View Course Stream
                    </button>

                    <button className="btn btn-primary-long">
                        {iconMap["new-announcement"]} New Announcement
                    </button>

                    <button className="btn btn-primary-long">
                        {iconMap["new-analytics"]} New Analytics
                    </button>

                    <button className="btn btn-primary-long">
                        {iconMap["view-notifications"]} View Course Notifications
                    </button>
                </div><br />

                <strong>To Do</strong>
                <hr />
                <div className="d-flex align-items-center">
                    <i className="fas fa-tasks red-icon"></i>
                    <div className="learning-objectives">
                        <div className="line a1-text">Grade A1 - ENV + HTML</div>
                        <div className="line due-text">100 points Sep 18 at 11:59pm</div>
                    </div>
                </div><br />

                <div className="d-flex align-items-center">
                    <i className="fas fa-tasks red-icon"></i>
                    <div className="learning-objectives">
                        <div className="line a1-text">Grade A1 - ENV + HTML</div>
                        <div className="line due-text">100 points Sep 18 at 11:59pm</div>
                    </div>
                </div><br />

                <strong>Coming Up</strong>
                <hr />
                <div className="d-flex align-items-center">
                    <i className="fas fa-calendar-day gray-icon"></i>
                    <div className="learning-objectives">
                        <div className="line a1-text">Lecture</div>
                        <div className="line due-text">CS4550.12361.202410</div>
                        <div className="line due-text">Sep 11 at 11:45am</div>
                    </div>
                </div><br />

                <div className="d-flex align-items-center">
                    <i className="fas fa-calendar-day gray-icon"></i>
                    <div className="learning-objectives">
                        <div className="line a1-text">Lecture</div>
                        <div className="line due-text">CS4550.12361.202410</div>
                        <div className="line due-text">Sep 11 at 11:45am</div>
                    </div>
                </div><br />

                <div className="d-flex align-items-center">
                    <i className="fas fa-calendar-day gray-icon"></i>
                    <div className="learning-objectives">
                        <div className="line a1-text">Lecture</div>
                        <div className="line due-text">CS4550.12361.202410</div>
                        <div className="line due-text">Sep 11 at 11:45am</div>
                    </div>
                </div><br />

            </div>
        </div>
    );
}

export default Status;
