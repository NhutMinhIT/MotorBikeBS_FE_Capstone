import React from "react";
import { Box, Typography } from "@mui/material";
import Footer from "../../../common-components/footer-component/Footer";
import "./style/style.scss";
import MenuComponent from "../../../common-components/menu-component/MenuComponent";

const CustomerHome = () => {
  return (
    <Box display="flex" flexDirection="column" height="100vh" width="100%">
      <MenuComponent />

      <Box flexGrow={2}>
        <Typography>Đây là Slide nè</Typography>
      </Box>
      <Box flexGrow={9} sx={{ background: "yellow" }}>
        <Typography variant="h5">Admin Home</Typography>
      </Box>

      <Box flexGrow={1} className="footer-style">
        <Footer />
      </Box>
    </Box>
  );
};

export default CustomerHome;