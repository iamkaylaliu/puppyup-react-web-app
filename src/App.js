import Puppyup from "./Puppyup";
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/Puppyup" />} />
          <Route path="/Puppyup/*" element={<Puppyup />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
export default App;
