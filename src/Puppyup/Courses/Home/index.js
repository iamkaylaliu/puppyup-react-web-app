import ModuleList from "../Modules/ModuleList";
import ModuleButtons from "../Modules/ModuleButtons";
import Status from "./Status";
import "./index.css";

function Home() {
    return (
        <div className="row">
            <div className="col-9">
                <h2>Home</h2>
                <ModuleButtons />
                <ModuleList />
            </div>
            <div className="col-3">
                <Status />
            </div>
        </div>
    );
}
export default Home;