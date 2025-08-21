// HotelFormStep2.jsx
import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
  Typography,
  InputLabel,
  Select,
  FormControl,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useFormik } from "formik";
import * as Yup from "yup";
import DeleteIcon from "@mui/icons-material/Delete";

const seasons = ["High Seasons", "Normal Seasons", "Low Seasons"];

const validationSchema = Yup.object().shape({
  season: Yup.string().required("Required"),
  validFrom: Yup.date().required("Required"),
  validTill: Yup.date().required("Required"),
  roomDetails: Yup.array().of(
    Yup.object().shape({
      roomType: Yup.string().required("Required"),
      ep: Yup.string().required("Required"),
      cp: Yup.string().required("Required"),
      map: Yup.string().required("Required"),
      ap: Yup.string().required("Required"),
    })
  ),

});

const HotelFormStep2 = ({ onNext, onBack }) => {
  const [roomTypes, setRoomTypes] = useState(["Standard", "Deluxe", "Suite"]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newRoomType, setNewRoomType] = useState("");

  const formik = useFormik({
    initialValues: {
      season: "",
      validFrom: null,
      validTill: null,
      roomDetails: [
        { roomType: "", ep: "", cp: "", map: "", ap: "" }, // default first room
      ],
      roomImages: null,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Step 2 values:", values);
      onNext();
    },
  });

  const handleAddRoomType = () => {
    if (newRoomType.trim()) {
      setRoomTypes([...roomTypes, newRoomType.trim()]);
      setNewRoomType("");
      setOpenDialog(false);
    }
  };

  const handleAddRoom = () => {
    formik.setFieldValue("roomDetails", [
      ...formik.values.roomDetails,
      { roomType: "", ep: "", cp: "", map: "", ap: "" },
    ]);
  };

  const handleRemoveRoom = (index) => {
    const updatedRooms = formik.values.roomDetails.filter((_, i) => i !== index);
    formik.setFieldValue("roomDetails", updatedRooms);
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} p={2}>
      <Typography variant="h6" gutterBottom>
        Hotel Room Details
      </Typography>

      {/* Room Details */}
      <Box border={1} borderRadius={1} p={2} mb={3}>
        <Typography variant="subtitle1">Room Details</Typography>
        <Grid container spacing={2} mt={1}>
          <Grid size={{xs:12, sm:4}}>
            <FormControl fullWidth size="small" required>
              <InputLabel>Season Type</InputLabel>
              <Select
                name="season"
                value={formik.values.season}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.season && Boolean(formik.errors.season)}
              >
                {seasons.map((season) => (
                  <MenuItem key={season} value={season}>
                    {season}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.season && formik.errors.season && (
                <FormHelperText error>{formik.errors.season}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid size={{xs:12, sm:4}}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Valid From"
                value={formik.values.validFrom}
                onChange={(val) => formik.setFieldValue("validFrom", val)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                    error:
                      formik.touched.validFrom &&
                      Boolean(formik.errors.validFrom),
                    helperText:
                      formik.touched.validFrom && formik.errors.validFrom,
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid size={{xs:12, sm:4}}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Valid Till"
                value={formik.values.validTill}
                onChange={(val) => formik.setFieldValue("validTill", val)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                    error:
                      formik.touched.validTill &&
                      Boolean(formik.errors.validTill),
                    helperText:
                      formik.touched.validTill && formik.errors.validTill,
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Box>

      {/* Dynamic Room Sections */}
      {formik.values.roomDetails.map((room, index) => (
        <Box
          key={index}
          border={1}
          borderRadius={1}
          p={2}
          mb={3}
          position="relative"
        >
          <Typography variant="subtitle1">Room {index + 1}</Typography>

          {index > 0 && (
            <IconButton
              size="small"
              color="error"
              onClick={() => handleRemoveRoom(index)}
              style={{ position: "absolute", top: 8, right: 8 }}
            >
              <DeleteIcon />
            </IconButton>
          )}

          <Grid container spacing={2} mt={1}>
            <Grid size={{xs:12, sm:2.4}}>
              <FormControl fullWidth size="small" required>
                <InputLabel>Room Type</InputLabel>
                <Select
                  name={`roomDetails[${index}].roomType`}
                  value={room.roomType}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.roomDetails?.[index]?.roomType &&
                    Boolean(formik.errors.roomDetails?.[index]?.roomType)
                  }
                >
                  {roomTypes.map((roomType) => (
                    <MenuItem key={roomType} value={roomType}>
                      {roomType}
                    </MenuItem>
                  ))}
                  <MenuItem disabled>
                    <em>────────────</em>
                  </MenuItem>
                  <MenuItem onClick={() => setOpenDialog(true)}>
                    ➕ Add New Room Type
                  </MenuItem>
                </Select>
                {formik.touched.roomDetails?.[index]?.roomType &&
                  formik.errors.roomDetails?.[index]?.roomType && (
                    <FormHelperText error>
                      {formik.errors.roomDetails[index].roomType}
                    </FormHelperText>
                  )}
              </FormControl>
            </Grid>

            {/* Meal Plan Fields */}
            {["ep", "cp", "map", "ap"].map((meal) => (
              <Grid size={{xs:6, sm:2.4}} key={meal}>
                <TextField
                  fullWidth
                  size="small"
                  label={
                    meal === "ep"
                      ? "Room Only (EP)"
                      : meal === "cp"
                      ? "Breakfast (CP)"
                      : meal === "map"
                      ? "Breakfast + Dinner (MAP)"
                      : "Breakfast + Lunch (AP)"
                  }
                  name={`roomDetails[${index}].${meal}`}
                  value={room[meal]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.roomDetails?.[index]?.[meal] &&
                    Boolean(formik.errors.roomDetails?.[index]?.[meal])
                  }
                  helperText={
                    formik.touched.roomDetails?.[index]?.[meal] &&
                    formik.errors.roomDetails?.[index]?.[meal]
                  }
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}

      <Button
        variant="outlined"
        color="secondary"
        onClick={handleAddRoom}
        sx={{ mb: 2 }}
      >
        ➕ Add Room
      </Button>

      {/* Add Images */}
      <Box border={1} borderRadius={1} p={2} mb={3}>
        <Typography variant="subtitle1">Add Images</Typography>
        <Button variant="outlined" component="label" fullWidth>
          Choose Files
          <input
            type="file"
            accept="image/*"
            hidden
            multiple
            onChange={(event) =>
              formik.setFieldValue("roomImages", event.currentTarget.files)
            }
          />
        </Button>
        {formik.errors.roomImages && (
          <FormHelperText error>{formik.errors.roomImages}</FormHelperText>
        )}
      </Box>

      {/* Actions */}
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Save & Continue
        </Button>
      </Box>

      {/* Dialog for adding new room type */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Add New</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Room Type Name"
            fullWidth
            value={newRoomType}
            onChange={(e) => setNewRoomType(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddRoomType} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HotelFormStep2;
