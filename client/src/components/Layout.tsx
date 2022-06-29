import React from "react";
import { Wrapper, WrapperVariant } from "./Wrapper";

interface LayoutProps {
  children: React.ReactNode;
  variant?: WrapperVariant;
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <>
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};

export default Layout;
