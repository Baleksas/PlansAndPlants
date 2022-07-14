import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Title } from "@mui/icons-material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const Overlay = ({ children }: any) => {
  return (
    <Box
      sx={{
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.6)",
        width: "100%",
        height: "100vh",
      }}
    >
      {children}
    </Box>
  );
};

const Modal = (props: any) => {
  return (
    <React.Fragment>
      <Overlay></Overlay>
      <Box
        sx={{
          backgroundColor: "rgba(20, 170, 200, 1)",
          width: 1 / 3,
          position: "fixed",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "10px",
          zIndex: 5,
          color: "white",
        }}
      >
        <Typography variant="h5">{props.title}</Typography>
        <Box sx={{ color: "white", margin: "auto" }}>{props.children}</Box>
        <Box
          sx={{
            width: 1 / 2,
            margin: "auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button color="inherit" onClick={props.reset}>
            <RestartAltIcon />
          </Button>
          {props.canCancel && (
            <Button onClick={props.cancel} color="inherit">
              Cancel
            </Button>
          )}
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Modal;
