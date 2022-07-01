import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../utils/reduxStore";

const Main = () => {
const user = useSelector((state: RootState) => state.token);

  return (
    <div>
      <div>Logged in as: </div>
      <span>{user.userId}</span>
    </div>
  );
};

export default Main;
