// src/components/VehicleQuotation/Dialog/AddFlightDialog.js
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const AddFlightDialog = ({ open, onClose, onSave }) => {
  const [flightDetails, setFlightDetails] = React.useState({
    airline: "",
    flightNumber: "",
    departure: "",
    arrival: "",
    departureDate: "",
    departureTime: "",
    arrivalDate: "",
    arrivalTime: "",
    passengers: "",
    class: "economy",
  });

  const handleChange = (field, value) => {
    setFlightDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onSave(flightDetails);
    onClose();
    // Reset form
    setFlightDetails({
      airline: "",
      flightNumber: "",
      departure: "",
      arrival: "",
      departureDate: "",
      departureTime: "",
      arrivalDate: "",
      arrivalTime: "",
      passengers: "",
      class: "economy",
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Add Flight Details
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Airline"
                value={flightDetails.airline}
                onChange={(e) => handleChange("airline", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Flight Number"
                value={flightDetails.flightNumber}
                onChange={(e) => handleChange("flightNumber", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Departure Airport"
                value={flightDetails.departure}
                onChange={(e) => handleChange("departure", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Arrival Airport"
                value={flightDetails.arrival}
                onChange={(e) => handleChange("arrival", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Departure Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={flightDetails.departureDate}
                onChange={(e) => handleChange("departureDate", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Departure Time"
                type="time"
                InputLabelProps={{ shrink: true }}
                value={flightDetails.departureTime}
                onChange={(e) => handleChange("departureTime", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Arrival Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={flightDetails.arrivalDate}
                onChange={(e) => handleChange("arrivalDate", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Arrival Time"
                type="time"
                InputLabelProps={{ shrink: true }}
                value={flightDetails.arrivalTime}
                onChange={(e) => handleChange("arrivalTime", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Number of Passengers"
                type="number"
                value={flightDetails.passengers}
                onChange={(e) => handleChange("passengers", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Class</InputLabel>
                <Select
                  value={flightDetails.class}
                  label="Class"
                  onChange={(e) => handleChange("class", e.target.value)}
                >
                  <MenuItem value="economy">Economy</MenuItem>
                  <MenuItem value="business">Business</MenuItem>
                  <MenuItem value="first">First Class</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Add Flight
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFlightDialog;