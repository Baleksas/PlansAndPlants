import { Box } from "@mui/material";
import React from "react";

export type WrapperVariant = "small" | "regular";

interface WrapperProps {
  variant?: WrapperVariant;
  children: React.ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <Box
      sx={{
        maxwidth: `${variant === "regular" ? "800px" : "400px"}`,
        width: "100%",
        margin: "5px",
      }}
    >
      {children}
    </Box>
  );
};
