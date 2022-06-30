import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { Box } from "@mui/material";
import Bookings from "./pages/Bookings";
import Events from "./pages/Events";
import Main from "./pages/Main";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import { client } from "./utils/apolloClient";

function App() {
  

  return (
    <ApolloProvider client={client}>
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
            <Route path="/" element={(<Main />) as any}></Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
      </Router>
    </ApolloProvider>
  );
}

export default App;
