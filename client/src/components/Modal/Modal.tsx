import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Title } from "@mui/icons-material";
const Modal = (props: any) => {
  return (
    <Box sx={{
        backgroundColor: "rgba(50, 120, 200, 0.6)",
        width: 1/3,
        position: "fixed",
        top: "20%",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "10px",
    }}>
      <Typography variant="h5">{props.title}</Typography>
      <Box>{props.children}</Box>
      <Box>
        {props.canCancel && <Button>Cancel</Button>}
        {props.canConfirm && <Button>Confirm</Button>}
        <Button onClick={props.reset}>Reset</Button>

      </Box>
    </Box>
  );
};

export default Modal;
