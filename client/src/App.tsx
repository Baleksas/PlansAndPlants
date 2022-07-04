import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
} from "react-router-dom";


import { Box, Button } from "@mui/material";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import Bookings from "./pages/Bookings";
import Events from "./pages/Events";
import Main from "./pages/Main";

import Counter from "./components/Counter";
import { useSelector } from "react-redux";
import { RootState } from "./utils/reduxStore";
import { useDispatch } from "react-redux";

import { changeToken } from "./features/tokenSlice";
function App() {

 
  return (
        <Router>
          <Navbar />
          <Box>
            <Routes>
              <Route path="/profile" element={(<div />) as any}></Route>
              <Route path="/account" element={(<div />) as any}></Route>
              <Route path="/dashboard" element={(<div />) as any}></Route>
              <Route path="/logout" element={(<div />) as any}></Route>
              <Route path="/events" element={(<Events />) as any}></Route>
              <Route path="/bookings" element={(<Bookings />) as any}></Route>
              <Route path="/auth" element={(<Auth />) as any}></Route>
              <Route path="/counter" element={(<Counter />) as any}></Route>
              <Route path="/" element={(<Main />) as any}></Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Box>
        </Router>
  );
}

export default App;
