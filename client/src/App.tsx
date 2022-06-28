import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import {
  BrowserRouter as Router,
  Route,
  Link as RouterLink,
  Navigate,
  Routes,
} from "react-router-dom";

import Auth from "./pages/Auth";
import Main from "./pages/Main";
import Events from "./pages/Events";
import {
  AppBar,
  Toolbar,
  MenuItem,
  Box,
  Container,
  Typography,
  Menu,
  IconButton,
  Avatar,
  Tooltip,
} from "@mui/material";
import Bookings from "./pages/Bookings";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import FormComponent from "../src/components/Auth_Form";

const pages = ["Main", "Auth", "Events", "Bookings"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
function App() {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map((message, location,path) => {
        alert(`Graphql error: ${message}`)
      })
    }
  
  });
  const link = from([
    errorLink,
    new HttpLink({ uri: "http://localhost:8001/graphql" }),
  ]);
  
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
  });
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  
  return (  
    <ApolloProvider client={client}>
    <Router>
      <AppBar position="static">
        <Container sx={{ width: 1 }}>
          <Toolbar disableGutters>
            <Box sx={{ display: "flex", flexGrow: 1 }}>
              {pages.map((page) => (
                <React.Fragment key={page}>
                <Box m={1} >
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to={`${page.toLowerCase()}`}
                  >
                    {page}
                  </Button>
                </Box>
                </React.Fragment>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box>
        <Routes>
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
