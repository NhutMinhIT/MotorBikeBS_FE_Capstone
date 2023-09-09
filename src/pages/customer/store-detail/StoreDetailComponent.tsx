import React from "react";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import "./style/style.scss";
// import MotorbikeComponent from "../Motorbike-components/MotorbikeComponent";

const StoreDetailComponent = () => {
  return (
    <Box className="store-detail-container">
      <Box my={5}>
        <Grid container spacing={2}>
          <Grid xs={4} md={4}>
            <div className="store-info-header">
            <Avatar sx={{ width: 52, height: 52, bgcolor: "orange" }}>
              Hi
            </Avatar>
              <Typography variant="h5">Vũ Phụng Hoàng</Typography>
            </div>
          </Grid>
          <Grid xs={5} md={4}>
            <div className="store-info">
              <Typography className="store-info-txt">
                <strong>Email : </strong>
                vuphuonghoangxe@gmail.com
              </Typography>
            </div>
            <div className="store-info">
              <Typography className="store-info-txt">
                <strong>Điện thoại: </strong>
                0909170111
              </Typography>
            </div>
            <div className="store-info">
              <Typography className="store-info-txt">
                <strong>Địa chỉ:</strong> Quận 8, Thành phố Hồ Chí Minh
              </Typography>
            </div>
          </Grid>
          <Grid xs={3} md={4}>
            <div className="sell-btn-container">
              <Button variant="outlined">Bán xe</Button>
            </div>
          </Grid>
        </Grid>
      </Box>

      <hr />

      <Box>
        {/* <MotorbikeComponent /> */}
      </Box>
    </Box>
  );
};

export default StoreDetailComponent;
