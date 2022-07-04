import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../utils/reduxStore";

const Main = () => {
  const { token, userId } = useSelector((state: RootState) => state.token);

  return (
    <React.Fragment>  
      {token === ""? (
        <div>
          <span>In order to get access to events and bookings, login!</span>
          <Button component={Link} to="/auth">
            Login
          </Button>
        </div>
      ):
      <div>Welcome, user: {userId}</div>
    }
    </React.Fragment>
  );
};

export default Main;
