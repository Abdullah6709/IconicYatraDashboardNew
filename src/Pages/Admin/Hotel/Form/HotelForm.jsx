// HotelForm.jsx
import React, { useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Grid,
  TextField,
  MenuItem,
  Typography,
  InputLabel,
  Select,
  FormControl,
  FormHelperText,
  Checkbox,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useFormik } from "formik";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import * as Yup from "yup";
import HotelFormStep2 from "./HotelFormStep2";
import HotelFormStep3 from "./HotelFormStep3";
import HotelFormStep4 from "./HotelFormStep4";

const steps = ["Hotel Details", "Room Details", "Mattress Cost", "Peak Cost"];

const hotelTypes = ["Resort", "Hostel", "Boutique", "Business", "Budget"];

const locationData = {
  India: {
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    Delhi: ["New Delhi"],
    Karnataka: ["Bangalore", "Mysore"],
  },
  USA: {
    California: ["Los Angeles", "San Francisco"],
    Texas: ["Houston", "Dallas"],
  },
  Canada: {
    Ontario: ["Toronto", "Ottawa"],
    Quebec: ["Montreal", "Quebec City"],
  },
  Australia: {
    Victoria: ["Melbourne"],
    NSW: ["Sydney"],
  },
  UK: {
    England: ["London", "Manchester"],
    Scotland: ["Edinburgh", "Glasgow"],
  },
};

const validationSchema = Yup.object().shape({
  hotelName: Yup.string().required("Required"),
  hotelType: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  mobile: Yup.string().required("Required"),
  alternateContact: Yup.string().required("Required"),
  designation: Yup.string().required("Required"),
  contactPerson: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  cancellationPolicy: Yup.string().required("Required"),
  facilities: Yup.array().min(1, "Select at least one facility"),
  mainImage: Yup.mixed().required("Main image is required"),
  country: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  address1: Yup.string().required("Required"),
  address2: Yup.string().required("Required"),
  address3: Yup.string().required("Required"),
  pincode: Yup.string().required("Required"),
  latitude: Yup.string().required("Required"),
  longitude: Yup.string().required("Required"),
   // website: Yup.string().url("Invalid URL").required("Required"),
  // facebook: Yup.string().url("Invalid URL"),
  // twitter: Yup.string().url("Invalid URL"),
  // instagram: Yup.string().url("Invalid URL"),
  // youtube: Yup.string().url("Invalid URL"),
  // tripAdvisor: Yup.string().url("Invalid URL"),
  policy: Yup.string().required("Required"),
});

const HotelForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  // facilities dropdown options
  const [facilityOptions, setFacilityOptions] = useState([
    "24*7 Service",
    "Bathroom",
    "WiFi",
    "Bar",
    "Air Conditioning",
  ]);

  // modal state
  const [openModal, setOpenModal] = useState(false);
  const [newFacility, setNewFacility] = useState("");
  const [tempSelected, setTempSelected] = useState([]);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const formik = useFormik({
    initialValues: {
      hotelName: "",
      hotelType: "",
      email: "",
      mobile: "",
      alternateContact: "",
      designation: "",
      contactPerson: "",
      description: "",
      cancellationPolicy: "",
      facilities: [],
      mainImage: null,
      country: "India",
      state: "",
      city: "",
      address1: "",
      address2: "",
      address3: "",
      pincode: "",
      latitude: "",
      longitude: "",
      website: "",
      facebook: "",
      twitter: "",
      instagram: "",
      youtube: "",
      tripAdvisor: "",
      policy: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Step 1 values:", values);
      handleNext();
    },
  });

  const handleAddFacility = () => {
    if (newFacility.trim() && !facilityOptions.includes(newFacility)) {
      const updatedOptions = [...facilityOptions, newFacility];
      setFacilityOptions(updatedOptions);
      formik.setFieldValue("facilities", [...tempSelected, newFacility]);
    } else {
      formik.setFieldValue("facilities", tempSelected);
    }
    setNewFacility("");
    setOpenModal(false);
  };

  const renderField = (name, label, multiline = false, rows = 1) => (
    <TextField
      label={label}
      name={name}
      fullWidth
      size="small"
      required
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
      multiline={multiline}
      rows={rows}
    />
  );

  return (
    <Box p={2}>
      {/* Stepper */}
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step Screens */}
      {activeStep === 0 && (
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Hotel Entry Form
          </Typography>

          {/* Hotel Details */}
          <Box border={1} borderRadius={1} p={2} mb={3}>
            <Typography variant="subtitle1">Hotel Details</Typography>
            <Grid container spacing={2} mt={1}>
              <Grid size={{xs:12, sm:6}}>
                {renderField("hotelName", "Hotel Name")}
              </Grid>
              <Grid size={{xs:12, sm:6}}>
                <FormControl fullWidth size="small" required>
                  <InputLabel>Hotel Type</InputLabel>
                  <Select
                    name="hotelType"
                    value={formik.values.hotelType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.hotelType && Boolean(formik.errors.hotelType)
                    }
                  >
                    {hotelTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.hotelType && formik.errors.hotelType && (
                    <FormHelperText error>
                      {formik.errors.hotelType}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid size={{xs:12}}>{renderField("email", "Email")}</Grid>
              <Grid size={{xs:12, sm:6}}>
                {renderField("mobile", "Mobile")}
              </Grid>
              <Grid size={{xs:12, sm:6}}>
                {renderField("alternateContact", "Alternate Contact")}
              </Grid>
              <Grid size={{xs:12, sm:6}}>
                {renderField("designation", "Designation")}
              </Grid>
              <Grid size={{xs:12, sm:6}}>
                {renderField("contactPerson", "Contact Person")}
              </Grid>
              <Grid size={{xs:12}}>
                {renderField("description", "Hotel Description", true, 2)}
              </Grid>
              <Grid size={{xs:12}}>
                {renderField("cancellationPolicy", "Cancellation Policy", true, 2)}
              </Grid>

              {/* Facilities - Multi Select */}
              <Grid size={{xs:12}}>
                <FormControl fullWidth size="small" required>
                  <InputLabel>Facilities</InputLabel>
                  <Select
                    multiple
                    name="facilities"
                    value={formik.values.facilities}
                    onChange={(event) => {
                      const value = event.target.value;
                      if (value.includes("__add_new__")) {
                        const filtered = value.filter((v) => v !== "__add_new__");
                        setTempSelected(filtered);
                        setOpenModal(true);
                      } else {
                        formik.setFieldValue("facilities", value);
                      }
                    }}
                    renderValue={(selected) => selected.join(", ")}
                    error={
                      formik.touched.facilities &&
                      Boolean(formik.errors.facilities)
                    }
                  >
                    {facilityOptions.map((facility) => (
                      <MenuItem key={facility} value={facility}>
                        <Checkbox
                          checked={formik.values.facilities.includes(facility)}
                        />
                        <ListItemText primary={facility} />
                      </MenuItem>
                    ))}
                    <MenuItem value="__add_new__">
                      <em>+ Add New</em>
                    </MenuItem>
                  </Select>
                  {formik.touched.facilities && formik.errors.facilities && (
                    <FormHelperText error>
                      {formik.errors.facilities}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              {/* Main Image Upload */}
              <Grid size={{xs:12}}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Main Image (1300px X 400px recommended)
                </Typography>
                <Button variant="outlined" component="label" fullWidth>
                  Choose File
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    name="mainImage"
                    onChange={(event) => {
                      formik.setFieldValue(
                        "mainImage",
                        event.currentTarget.files[0]
                      );
                    }}
                    onBlur={formik.handleBlur}
                  />
                </Button>
                {formik.values.mainImage && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {formik.values.mainImage.name}
                  </Typography>
                )}
                {formik.touched.mainImage && formik.errors.mainImage && (
                  <Typography variant="caption" color="error">
                    {formik.errors.mainImage}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Box>
       {/* Hotel Location */}
          <Box border={1} borderRadius={1} p={2} mb={3}>
            <Typography variant="subtitle1">Hotel Location</Typography>
            <Grid container spacing={2} mt={1}>
              {/* Country */}
              <Grid size={{xs:12, sm:4}}>
                <FormControl fullWidth size="small" required>
                  <InputLabel>Country</InputLabel>
                  <Select
                    name="country"
                    value={formik.values.country}
                    onChange={(e) => {
                      formik.handleChange(e);
                      formik.setFieldValue("state", "");
                      formik.setFieldValue("city", "");
                    }}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.country && Boolean(formik.errors.country)
                    }
                  >
                    {Object.keys(locationData).map((country) => (
                      <MenuItem key={country} value={country}>
                        {country}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.country && formik.errors.country && (
                    <FormHelperText error>{formik.errors.country}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              {/* State */}
              <Grid size={{xs:12, sm:4}}>
                <FormControl fullWidth size="small" required>
                  <InputLabel>State</InputLabel>
                  <Select
                    name="state"
                    value={formik.values.state}
                    onChange={(e) => {
                      formik.handleChange(e);
                      formik.setFieldValue("city", "");
                    }}
                    onBlur={formik.handleBlur}
                    disabled={!formik.values.country}
                    error={formik.touched.state && Boolean(formik.errors.state)}
                  >
                    {formik.values.country &&
                      Object.keys(locationData[formik.values.country] || {}).map(
                        (state) => (
                          <MenuItem key={state} value={state}>
                            {state}
                          </MenuItem>
                        )
                      )}
                  </Select>
                  {formik.touched.state && formik.errors.state && (
                    <FormHelperText error>{formik.errors.state}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              {/* City */}
              <Grid size={{xs:12, sm:4}}>
                <FormControl fullWidth size="small" required>
                  <InputLabel>City</InputLabel>
                  <Select
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={!formik.values.state}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                  >
                    {formik.values.country &&
                      formik.values.state &&
                      (
                        locationData[formik.values.country][
                          formik.values.state
                        ] || []
                      ).map((city) => (
                        <MenuItem key={city} value={city}>
                          {city}
                        </MenuItem>
                      ))}
                  </Select>
                  {formik.touched.city && formik.errors.city && (
                    <FormHelperText error>{formik.errors.city}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              {/* Address and other fields */}
              <Grid size={{xs:12, sm:4}}>
                {renderField("address1", "Address 1")}
              </Grid>
              <Grid size={{xs:12, sm:4}}>
                {renderField("address2", "Address 2")}
              </Grid>
              <Grid size={{xs:12, sm:4}}>
                {renderField("address3", "Address 3")}
              </Grid>
              <Grid size={{xs:12, sm:4}}>
                {renderField("pincode", "Pincode")}
              </Grid>
              <Grid size={{xs:12, sm:4}}>
                {renderField("latitude", "Latitude")}
              </Grid>
              <Grid size={{xs:12, sm:4}}>
                {renderField("longitude", "Longitude")}
              </Grid>
            </Grid>
          </Box>

          {/* Social Media */}
          <Box border={1} borderRadius={1} p={2} mb={3}>
            <Typography variant="subtitle1">Social Media</Typography>
            <Grid container spacing={2} mt={1}>
              <Grid size={{xs:12, sm:6}}>
                {renderField("website", "Website")}
              </Grid>
              <Grid size={{xs:12, sm:6}}>
                {renderField("twitter", "Twitter")}
              </Grid>
              <Grid size={{xs:12, sm:6}}>
                {renderField("facebook", "Facebook")}
              </Grid>
              <Grid size={{xs:12, sm:6}}>
                {renderField("instagram", "Instagram")}
              </Grid>
              <Grid size={{xs:12, sm:6}}>
                {renderField("youtube", "YouTube")}
              </Grid>
              <Grid size={{xs:12, sm:6}}>
                {renderField("tripAdvisor", "TripAdvisor")}
              </Grid>
            </Grid>
          </Box>

          {/* Hotel Policy */}
          <Box border={1} borderRadius={1} p={2} mb={3}>
            <Typography variant="subtitle1">Hotel Policy</Typography>
            {renderField("policy", "Hotel Policy", true, 4)}
          </Box>
          <Box textAlign="center">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Save & Continue
            </Button>
          </Box>
        </Box>
      )}

      {activeStep === 1 && (
        <HotelFormStep2 onNext={handleNext} onBack={handleBack} />
      )}
      {activeStep === 2 && (
        <HotelFormStep3 onNext={handleNext} onBack={handleBack} />
      )}
      {activeStep === 3 && <HotelFormStep4 onBack={handleBack} />}

      {/* Add Facility Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Add New Facility</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Facility Name"
            fullWidth
            size="small"
            value={newFacility}
            onChange={(e) => setNewFacility(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button onClick={handleAddFacility} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HotelForm;
