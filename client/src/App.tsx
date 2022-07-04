import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useNavigate
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

function App() {
  const {token} = useSelector((state: RootState) => state.token);
 
  return (
        <Router>
          <Navbar />
          <Box>
            <Routes>

              {token!=="" && <Route path="/profile" element={(<div />) as any}></Route>}
              {token!=="" && <Route path="/account" element={(<div />) as any}></Route>}
              {token!=="" && <Route path="/dashboard" element={(<div />) as any}></Route>}
              {token!=="" && <Route path="/logout" element={(<div />) as any}></Route>}
              {token!=="" && <Route path="/events" element={(<Events />) as any}></Route>}
              {token!=="" && <Route path="/bookings" element={(<Bookings />) as any}></Route>}
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
