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
import {  useSelector } from "react-redux";
import { Link, Link as RouterLink, useNavigate } from "react-router-dom";
import { changeToken } from "../features/tokenSlice";
import { RootState } from "../utils/reduxStore";
import Settings from "./Settings";
const Navbar = () => {
  const pages = ["Main","Events", "Counter"];
  const userData = useSelector((state: RootState) => state.token);
  const navigate = useNavigate();

  if (userData.userId === "") pages.splice(1, 0, "Auth");
  if (userData.userId !== "") pages.splice(3, 0, "Bookings");


  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );


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
            <Settings anchorElUser={anchorElUser} setAnchorElUser={setAnchorElUser} setAnchorElNav={setAnchorElNav}/>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
