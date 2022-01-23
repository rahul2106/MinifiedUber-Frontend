import logo from './logo.svg';
import './App.css';
import { Grid, InputLabel } from '@mui/material';
import User from './components/User';
import { useState } from 'react';
import Trip from './components/Trip';
import DriverDashboard from './components/DriverDashboard';

function App() {

  const [loggedIn , setLoggedIn] = useState(false); 
  const [isDriver,setIsDriver ] = useState(false);
  const [driverDetail, setDriverDetail] = useState();

  const updateLoggedIn = (flag,params) => {
    setLoggedIn(flag);
    console.log(params);
    updateDriverDetails(params);
  };

  const updateDriverDetails = (params) => {
    setDriverDetail(params);
    setIsDriver(params.isDriver);
    console.log(params);
  };

  return (
    <div className="App">
      {loggedIn?
      (!isDriver ? <Trip/>: <DriverDashboard driverDetail={driverDetail}/>)
      :
      (<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <InputLabel>Register as Driver</InputLabel>
        <User updateLoggedIn ={updateLoggedIn} updateIsDriver={true}/>
        </Grid>
        <Grid item xs={6}>
        <InputLabel>Register as Customer</InputLabel>
        <User updateLoggedIn ={updateLoggedIn} updateIsDriver={false}/>
        </Grid>
      </Grid>)
      }
    </div> 
  );
}

export default App;
