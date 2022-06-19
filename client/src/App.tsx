import React from "react";
import Button from "@mui/material/Button";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Navigate,
  Routes,
} from "react-router-dom";

import Auth from "./pages/Auth";
import Main from "./pages/Main";
import Events from "./pages/Events";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/events" element={(<Events />) as any}></Route>
        <Route path="/auth" element={(<Auth />) as any}></Route>
        <Route path="/" element={(<Main />) as any}></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
