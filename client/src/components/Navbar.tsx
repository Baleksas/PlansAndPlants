import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Link as RouterLink } from "react-router-dom";
import { changeToken } from "../features/tokenSlice";
import { RootState } from "../utils/reduxStore";
const Navbar = () => {
  const pages = ["Main", "Counter"];
  const settings = ["Profile", "Account", "Dashboard", "Logout"];
  const userData = useSelector((state: RootState) => state.token);

  if (userData.userId === "") pages.splice(1, 0, "Auth");
  if (userData.userId !== "") pages.splice(2, 0, "Events");
  if (userData.userId !== "") pages.splice(3, 0, "Bookings");

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const dispatch = useDispatch();

  const logout = () => {
    handleCloseUserMenu();
    // Set to initial state
    dispatch(
      changeToken({
        token: "",
        userId: "",
        expiresIn: 0,
      })
    );
  };

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
    <AppBar position="static">
      <Container sx={{ width: 1 }}>
        <Toolbar disableGutters>
          <Box sx={{ display: "flex", flexGrow: 1 }}>
            {pages.map((page) => (
              <React.Fragment key={page}>
                <Box m={1}>
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
          {userData.userId !== "" && (
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
                <MenuItem onClick={handleCloseUserMenu}>
                  <Button component={Link} to="/about" color="primary">
                    Profile
                  </Button>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Button component={Link} to="/about" color="primary">
                    Settings
                  </Button>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Button component={Link} to="/about" color="primary">
                    Dashboard
                  </Button>
                </MenuItem>
                <MenuItem onClick={() => logout()}>
                  <Button>Logout</Button>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
