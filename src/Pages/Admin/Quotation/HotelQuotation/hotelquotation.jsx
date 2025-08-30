import React from "react";
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
  Typography,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useFormik } from "formik";
import * as Yup from "yup";


const clients = ["Client A", "Client B", "Client C"];
const sectors = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Manipur",
];
const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "France",
  "Germany",
  "Japan",
  "Singapore",
  "Thailand",
  "UAE",
];

const cities = ["Delhi", "Mumbai", "Chennai"];
const locations = ["Airport", "Railway Station", "Hotel"];

const validationSchema = Yup.object({
  clientName: Yup.string().required("Required"),
  sector: Yup.string().required("Required"),
  arrivalDate: Yup.date().required("Required"),
  departureDate: Yup.date().required("Required"),
  quotationTitle: Yup.string().required("Required"),
});

const QuotationForm = () => {
  const formik = useFormik({
    initialValues: {
      clientName: "",
      tourType: "Domestic",
      sector: "",
      showCostPerAdult: false,
      arrivalDate: null,
      arrivalCity: "",
      arrivalLocation: "",
      departureDate: null,
      departureCity: "",
      departureLocation: "",
      nights: "",
      validFrom: null,
      validTill: null,
      createBy: "New Quotation",
      quotationTitle: "",
      initialNotes:
        "This is only tentative schedule for sightseeing and travel. Actual sightseeing may get affected due to weather, road conditions, local authority notices, shortage of timing, or off days.",
      banner: null,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Data:", values);
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={formik.handleSubmit}>
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">Client Details</Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 6 }}>
              <TextField
                select
                fullWidth
                name="clientName"
                label="Client Name"
                value={formik.values.clientName}
                onChange={formik.handleChange}
                error={
                  formik.touched.clientName && Boolean(formik.errors.clientName)
                }
                helperText={
                  formik.touched.clientName && formik.errors.clientName
                }
              >
                {clients.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Tour Type
              </Typography>
              <RadioGroup
                row
                name="tourType"
                value={formik.values.tourType}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value="Domestic"
                  control={<Radio />}
                  label="Domestic"
                />
                <FormControlLabel
                  value="International"
                  control={<Radio />}
                  label="International"
                />
              </RadioGroup>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <TextField
                select
                fullWidth
                name="sector"
                label={
                  formik.values.tourType === "Domestic" ? "Sector" : "Sector"
                }
                value={formik.values.sector}
                onChange={formik.handleChange}
                error={formik.touched.sector && Boolean(formik.errors.sector)}
                helperText={formik.touched.sector && formik.errors.sector}
              >
                {(formik.values.tourType === "Domestic"
                  ? sectors
                  : countries
                ).map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 6 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="showCostPerAdult"
                    checked={formik.values.showCostPerAdult}
                    onChange={formik.handleChange}
                  />
                }
                label="Show Cost Per Adult"
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">Pickup/Drop</Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 4 }}>
              <DatePicker
                label="Arrival Date"
                value={formik.values.arrivalDate}
                onChange={(val) => formik.setFieldValue("arrivalDate", val)}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    error={
                      formik.touched.arrivalDate &&
                      Boolean(formik.errors.arrivalDate)
                    }
                    helperText={
                      formik.touched.arrivalDate && formik.errors.arrivalDate
                    }
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 4 }}>
              <TextField
                select
                fullWidth
                name="arrivalCity"
                label="Arrival City"
                value={formik.values.arrivalCity}
                onChange={formik.handleChange}
              >
                {cities.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 4 }}>
              <TextField
                select
                fullWidth
                name="arrivalLocation"
                label="Arrival Location"
                value={formik.values.arrivalLocation}
                onChange={formik.handleChange}
              >
                {locations.map((l) => (
                  <MenuItem key={l} value={l}>
                    {l}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 4 }}>
              <DatePicker
                label="Departure Date"
                value={formik.values.departureDate}
                onChange={(val) => formik.setFieldValue("departureDate", val)}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    error={
                      formik.touched.departureDate &&
                      Boolean(formik.errors.departureDate)
                    }
                    helperText={
                      formik.touched.departureDate &&
                      formik.errors.departureDate
                    }
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 4 }}>
              <TextField
                select
                fullWidth
                name="departureCity"
                label="Departure City"
                value={formik.values.departureCity}
                onChange={formik.handleChange}
              >
                {cities.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 4 }}>
              <TextField
                select
                fullWidth
                name="departureLocation"
                label="Departure Location"
                value={formik.values.departureLocation}
                onChange={formik.handleChange}
              >
                {locations.map((l) => (
                  <MenuItem key={l} value={l}>
                    {l}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 4 }}>
              <TextField
                fullWidth
                name="nights"
                label="Nights"
                type="number"
                value={formik.values.nights}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">Quotation Validity</Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 6 }}>
              <DatePicker
                label="Valid From"
                value={formik.values.validFrom}
                onChange={(val) => formik.setFieldValue("validFrom", val)}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <DatePicker
                label="Valid Till"
                value={formik.values.validTill}
                onChange={(val) => formik.setFieldValue("validTill", val)}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">Quotation</Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {/* Create By Field */}
            <Grid size={{ xs: 4 }}>
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Create By
                </Typography>
                <RadioGroup
                  row
                  name="createBy"
                  value={formik.values.createBy || "New Quotation"}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel
                    value="New Quotation"
                    control={<Radio />}
                    label="New Quotation"
                  />
                  {/* If you want to add more later, just add more FormControlLabels here */}
                </RadioGroup>
              </Box>
            </Grid>

            {/* Quotation Title */}
            <Grid size={{ xs: 8 }}>
              <TextField
                fullWidth
                name="quotationTitle"
                label="Quotation Title"
                value={formik.values.quotationTitle}
                onChange={formik.handleChange}
                error={
                  formik.touched.quotationTitle &&
                  Boolean(formik.errors.quotationTitle)
                }
                helperText={
                  formik.touched.quotationTitle && formik.errors.quotationTitle
                }
              />
            </Grid>

            {/* Initial Notes */}
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                name="initialNotes"
                label="Initial Notes"
                multiline
                rows={4}
                value={formik.values.initialNotes}
                onChange={formik.handleChange}
              />
              <Typography variant="caption" color="green">
                {formik.values.initialNotes.length}/200 characters
              </Typography>
            </Grid>

            {/* Banner Upload */}
            <Grid size={{ xs: 12 }}>
              <Button variant="outlined" component="label">
                Choose File
                <input
                  type="file"
                  hidden
                  onChange={(event) =>
                    formik.setFieldValue("banner", event.currentTarget.files[0])
                  }
                />
              </Button>
              {formik.values.banner && (
                <Typography variant="body2" sx={{ ml: 2 }}>
                  {formik.values.banner.name}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Paper>

        <Box textAlign="center" sx={{ mt: 2 }}>
          <Button type="submit" variant="contained">
            Save & Continue
          </Button>
        </Box>
      </form>
    </LocalizationProvider>
  );
};

export default QuotationForm;
