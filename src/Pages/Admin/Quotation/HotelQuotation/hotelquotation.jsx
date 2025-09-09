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
  Autocomplete,
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
  "Delhi",
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
const services = [
  "Air Ticket",
  "Bus Ticket",
  "Covid Pass",
  "Cruise",
  "Hotel",
  "Vehicle",
  "Visa",
];

const validationSchema = Yup.object({
  clientName: Yup.string().required("Required"),
  sector: Yup.string().required("Required"),
  arrivalDate: Yup.date().required("Required"),
  departureDate: Yup.date().required("Required"),
  quotationTitle: Yup.string().required("Required"),
  services: Yup.array()
    .min(1, "At least one service is required")
    .required("Required"),
});

const Section = ({ title, children }) => (
  <Paper
    sx={{
      p: 3,
      mb: 3,
      borderRadius: 2,
      backgroundColor: "#fafafa",
      boxShadow: 2,
    }}
  >
    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
      {title}
    </Typography>
    <Grid container spacing={2} sx={{ mt: 1 }}>
      {children}
    </Grid>
  </Paper>
);

const QuotationForm = () => {
  const formik = useFormik({
    initialValues: {
      clientName: "",
      tourType: "Domestic",
      sector: "",
      showCostPerAdult: false,
      services: [],
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
        "This is only tentative schedule for sightseeing and travel...",
      banner: null,
    },
    validationSchema,
    onSubmit: (values) => console.log("Form Data:", values),
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={formik.handleSubmit}>
        <Section title="Client Details">
          <Grid size={{xs:6}}>
            <TextField
              select
              fullWidth
              name="clientName"
              label="Client Name"
              value={formik.values.clientName}
              onChange={formik.handleChange}
              error={formik.touched.clientName && !!formik.errors.clientName}
              helperText={formik.touched.clientName && formik.errors.clientName}
            >
              {clients.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Tour Type
            </Typography>
            <RadioGroup
              row
              name="tourType"
              value={formik.values.tourType}
              onChange={formik.handleChange}
            >
              {["Domestic", "International"].map((t) => (
                <FormControlLabel
                  key={t}
                  value={t}
                  control={<Radio />}
                  label={t}
                />
              ))}
            </RadioGroup>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              select
              fullWidth
              name="sector"
              label="Sector"
              value={formik.values.sector}
              onChange={formik.handleChange}
              error={formik.touched.sector && !!formik.errors.sector}
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
          <Grid size={{ xs: 12 }}>
            <Autocomplete
              multiple
              options={services}
              value={formik.values.services}
              onChange={(_, val) => formik.setFieldValue("services", val)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Services Required"
                  error={formik.touched.services && !!formik.errors.services}
                  helperText={formik.touched.services && formik.errors.services}
                />
              )}
            />
          </Grid>
        </Section>

        <Section title="Pickup / Drop">
          {[
            { name: "arrivalDate", label: "Arrival Date", type: "date" },
            { name: "arrivalCity", label: "Arrival City", options: cities },
            {
              name: "arrivalLocation",
              label: "Arrival Location",
              options: locations,
            },
            { name: "departureDate", label: "Departure Date", type: "date" },
            { name: "departureCity", label: "Departure City", options: cities },
            {
              name: "departureLocation",
              label: "Departure Location",
              options: locations,
            },
          ].map((f, i) => (
            <Grid key={f.name} size={{xs:4}}>
              {f.type === "date" ? (
                <DatePicker
                  label={f.label}
                  value={formik.values[f.name]}
                  onChange={(v) => formik.setFieldValue(f.name, v)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: formik.touched[f.name] && !!formik.errors[f.name],
                      helperText:
                        formik.touched[f.name] && formik.errors[f.name],
                    },
                  }}
                />
              ) : (
                <TextField
                  select
                  fullWidth
                  name={f.name}
                  label={f.label}
                  value={formik.values[f.name]}
                  onChange={formik.handleChange}
                >
                  {f.options.map((o) => (
                    <MenuItem key={o} value={o}>
                      {o}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </Grid>
          ))}
          <Grid size={{xs:4}}>
            <TextField
              fullWidth
              name="nights"
              label="Nights"
              type="number"
              value={formik.values.nights}
              onChange={formik.handleChange}
            />
          </Grid>
        </Section>

        <Section title="Quotation Validity">
          {["validFrom", "validTill"].map((f) => (
            <Grid key={f} Size={{xs:6}}>
              <DatePicker
                label={f === "validFrom" ? "Valid From" : "Valid Till"}
                value={formik.values[f]}
                onChange={(v) => formik.setFieldValue(f, v)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>
          ))}
        </Section>

        <Section title="Quotation">
          <Grid size={{xs:4}}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Create By
            </Typography>
            <RadioGroup
              row
              name="createBy"
              value={formik.values.createBy}
              onChange={formik.handleChange}
            >
              <FormControlLabel
                value="New Quotation"
                control={<Radio />}
                label="New Quotation"
              />
            </RadioGroup>
          </Grid>
          <Grid size={{xs:8}}>
            <TextField
              fullWidth
              name="quotationTitle"
              label="Quotation Title"
              value={formik.values.quotationTitle}
              onChange={formik.handleChange}
              error={
                formik.touched.quotationTitle && !!formik.errors.quotationTitle
              }
              helperText={
                formik.touched.quotationTitle && formik.errors.quotationTitle
              }
            />
          </Grid>
          <Grid size={{xs:12}}>
            <TextField
              fullWidth
              multiline
              rows={4}
              name="initialNotes"
              label="Initial Notes"
              value={formik.values.initialNotes}
              onChange={formik.handleChange}
              InputProps={{ sx: { color: "#555" } }}
            />
            <Typography variant="caption" color="green">
              {formik.values.initialNotes.length}/200 characters
            </Typography>
          </Grid>
          <Grid size={{xs:12}}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Select Banner Image (860px X 400px)
            </Typography>
            <Button
              variant="outlined"
              component="label"
              sx={{ textTransform: "none", borderRadius: 2, px: 3, py: 1 }}
            >
              Upload Banner
              <input
                type="file"
                hidden
                onChange={(e) =>
                  formik.setFieldValue("banner", e.currentTarget.files[0])
                }
              />
            </Button>
            {formik.values.banner && (
              <Typography variant="body2" sx={{ ml: 2, mt: 1 }}>
                {formik.values.banner.name}
              </Typography>
            )}
          </Grid>
        </Section>

        <Box textAlign="center" sx={{ mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ px: 4, py: 1.5, borderRadius: 2 }}
          >
            Save & Continue
          </Button>
        </Box>
      </form>
    </LocalizationProvider>
  );
};

export default QuotationForm;
