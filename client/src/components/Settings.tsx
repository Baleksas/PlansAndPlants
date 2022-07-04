import { Box, Tooltip, IconButton, Avatar, Menu, MenuItem, Button } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { changeToken } from '../features/tokenSlice';

const Settings = ({anchorElUser, setAnchorElUser,setAnchorElNav}:any) => {
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
    
      const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
      };
    
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };
      
  return (
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
  )
}

export default Settings