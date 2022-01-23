import React, { useEffect, useState, useReducer } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Box,
  TextField,
  Button,
  Form,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useForm, Controller } from "react-hook-form";
import getUser from "../modules/userManagement/actionCreators/getUsers";
import createUser from "../modules/userManagement/actionCreators/createUsers";

const User = ({updateLoggedIn,updateIsDriver}) => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [isDriver, setIsDriver] = useState(false);
  const [usertype, setUserType ] = useState();
  const createNewUser = bindActionCreators(createUser, dispatch);


  const { handleSubmit, control } = useForm();

  const checkDriver = (params) =>params!==undefined;

  async function dispatchCreateUsers (params) {
    const user = {
      name: params.name,
      email: params.email,
      phone: params.phone,
      vehicle: params.vehicle,
      isDriver: checkDriver(params.vehicle),
      isAvailable: isDriver || true
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
  };
  const response = await fetch('http://localhost:8080/api/users/', requestOptions);
  const data = await response.json();
  console.log(data);
  await updateLoggedIn(true,user);
  };

  const onSubmitData = (data) => {
    dispatchCreateUsers(data);
  };

  useEffect(() => {
    setIsDriver(updateIsDriver);
  });

  const options = [
    {
      value: "driver",
      key: "Driver",
    },
    {
      value: "customer",
      key: "Customer",
    },
  ];

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: 10,

      "& .MuiTextField-root": {
        margin: 10,
        width: "300px",
      },
      "& .MuiButtonBase-root": {
        margin: 10,
      },
      "& .MuiInputBase-root": {
        
        width: "300px",
      },
    },
  }));

  const classes = useStyles();
  const handleIsDriverChange = (evt) => {
    const {
      target: { value },
    } = evt;
    setIsDriver(
      // On autofill we get a stringified value.
      value === "driver" 
    );
    setUserType(value);
    
    console.log(options);
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmitData)}>

      { (
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="Name"
              variant="outlined"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
          rules={{ required: "First name required" }}
        />
      )}
      <Controller
        name="phone"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Phone"
            variant="outlined"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            type="phone"
          />
        )}
        rules={{ required: "Phone required" }}
      />
      {isDriver && <Controller
        name="vehicle"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Vehicle"
            variant="outlined"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            type="text"
          />
        )}
        rules={{ required: "Vehicle required" }}
      />}
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Email"
            variant="outlined"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            type="email"
          />
        )}
        rules={{ required: "Email required" }}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Password"
            variant="outlined"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            type="password"
          />
        )}
        rules={{ required: "Password required" }}
      />
      <Controller
        name="confirmpassword"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Confirm Password"
            variant="outlined"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            type="password"
          />
        )}
        rules={{ required: "Confirm Password required" }}
      />
      <div>
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </div>
    </form>
  );
};

export default User;
