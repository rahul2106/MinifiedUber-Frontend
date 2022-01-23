import React from "react";
import { Box, InputLabel } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";

const DriverDashboard = (driverDetails) => {
  const [checked, setChecked] = React.useState(true);
    console.log(driverDetails);
  const handleChange = (event) => {
    setChecked(event.target.checked);
    console.log(!checked);
    async function dispatchCreateUsers (params) {
        const user = {
          isAvailable: !checked
        };
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user)
      };
      const response = await fetch('http://localhost:8080/api/users/', requestOptions);
      const data = await response.json();
      console.log(data);
      //updateLoggedIn({data:data,flag:true});
      };
  };
  return (
    
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Driver Details
          </Typography>
          <Typography variant="h5" component="div">
            {driverDetails.driverDetail.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {driverDetails.driverDetail.phone}
          </Typography>
        </CardContent>
      </Card>
      <InputLabel>
      Availability</InputLabel>
      <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
        
      />
    </Box>
  );
};

export default DriverDashboard;
