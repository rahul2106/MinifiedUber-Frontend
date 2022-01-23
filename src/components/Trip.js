import {
  Button,
  Box,
  Grid,
  Typography,
  InputLabel,
  TextField,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useForm, Controller } from "react-hook-form";
import { threshold } from "../constants";
import DriverDetails from "./DriversDetails";

const Trip = () => {
  const { handleSubmit, control } = useForm();
  const [drivers, setDrivers] = useState([]);
  const [displayDetails, setDisplayDetails] = useState(false);

  const checkNumber = (data) => {
    if (isNaN(data.sx) || isNaN(data.sy) || isNaN(data.dx) || isNaN(data.dy)) {
      alert("Must input numbers");
      return false;
    }
    return true;
  };

  const calculateDistance = (data) => {
    let totalX = Math.pow(data.sx - data.dx, 2);
    let totalY = Math.pow(data.sy - data.dy, 2);

    getDriver();

    return Math.sqrt(totalX + totalY);
  };

  async function getDriver() {
    const response = await fetch("http://localhost:8080/api/driver/true");
    const data = await response.json();
    await setDisplayDetails(true);
    await setDrivers(data.data);
  }

  const onSubmit = (data) => {
    if (checkNumber(data)) {
      let totalDistance = calculateDistance(data);
      if (totalDistance <= threshold) {
        alert("Your trip has started");
      }
    } else {
      console.log("Failed");
    }
  };

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

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="sx"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Source - X"
            variant="outlined"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
        rules={{ required: "Source - X required" }}
      />

      <Controller
        name="sy"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Source - Y"
            variant="outlined"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
        rules={{ required: "Source - Y required" }}
      />

      <Controller
        name="dx"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Destination - X"
            variant="outlined"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
        rules={{ required: "Destination - X required" }}
      />

      <Controller
        name="dy"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Destionation - Y"
            variant="outlined"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
        rules={{ required: "Destionation - Y required" }}
      />
      <Button type="submit" variant="outlined">
        Start Trip
      </Button>

      {drivers.length>0  && <DriverDetails driver={drivers} />}
    </form>
  );
};

export default Trip;
