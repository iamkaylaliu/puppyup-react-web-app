import React from "react";
import { BsCheckCircle } from "react-icons/bs";
import { IoEllipsisVerticalSharp } from "react-icons/io5";

function ModuleButtons() {
    return (
        <><div className="d-flex justify-content-end mb-3 course-buttons">
            <div className="ml-2">
                <button className="btn btn-primary btn-equal-height">Collapse All</button>
            </div>
            <div className="ml-2">
                <button className="btn btn-primary btn-equal-height">View Progress</button>
            </div>
            <div className="ml-2 dropdown">
                <button
                    className="btn btn-primary btn-equal-height dropdown-toggle custom-button"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <BsCheckCircle style={{ color: 'green' }} /> Publish All
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className="dropdown-item" href="#">Action 1</a>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className="dropdown-item" href="#">Action 2</a>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className="dropdown-item" href="#">Action 3</a>
                </div>
            </div>
            {/* <div className="ml-2">
                <button className="btn btn-danger btn-equal-height">+ Module</button>
            </div> */}
            <div className="ml-2">
                <button className="btn btn-primary btn-lg btn-equal-height">
                    <IoEllipsisVerticalSharp style={{ color: 'black' }} />
                </button>
            </div>
        </div><hr /></>
    );
}

export default ModuleButtons;
