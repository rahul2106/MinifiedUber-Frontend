import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function DriverDetails(data) {

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
      <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Driver Details
      </Typography>
      <Typography variant="h5" component="div">
        {data.driver[0].name}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {data.driver[0].phone}
      </Typography>
    </CardContent>
      </Card>
    </Box>
  );
}
