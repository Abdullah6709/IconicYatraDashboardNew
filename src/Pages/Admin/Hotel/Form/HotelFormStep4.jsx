// HotelFormStep4.jsx
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const HotelFormStep4 = ({ onBack, onClose }) => {
  const [peakCosts, setPeakCosts] = useState([]);

  const formik = useFormik({
    initialValues: {
      title: "",
      weekendSurcharge: false,
      validFrom: null,
      validTill: null,
      surcharge: "",
      note: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      validFrom: Yup.date().nullable(),
      validTill: Yup.date()
        .nullable()
        .min(Yup.ref("validFrom"), "Valid Till must be after Valid From"),
      surcharge: Yup.number()
        .typeError("Surcharge must be a number")
        .required("Surcharge is required"),
      note: Yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      setPeakCosts([...peakCosts, values]); // Add to list
      resetForm(); // Clear form for next entry
    },
  });

  // Handle checkbox change (auto-fill title when checked)
  const handleWeekendChange = (event) => {
    const checked = event.target.checked;
    formik.setFieldValue("weekendSurcharge", checked);
    if (checked) {
      formik.setFieldValue("title", "Saturday-Sunday-Special");
      formik.setFieldValue("validFrom", null);
      formik.setFieldValue("validTill", null);
    } else {
      formik.setFieldValue("title", "");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Weekend / Seasonal Surcharge
      </Typography>

      {/* Form */}
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          {/* Title + Checkbox */}
          <Grid size={{xs:12}}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.weekendSurcharge}
                  onChange={handleWeekendChange}
                  name="weekendSurcharge"
                />
              }
              label={
                <Typography variant="body2" color="orange">
                  Sat–Sun (Tick the checkbox for weekend surcharge)
                </Typography>
              }  
            />
          </Grid>

          {/* Valid From / Valid Till */}
          {!formik.values.weekendSurcharge && (
            <>
              <Grid size={{xs:6}}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Valid From"
                    value={formik.values.validFrom}
                    onChange={(date) =>
                      formik.setFieldValue("validFrom", date)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={
                          formik.touched.validFrom &&
                          Boolean(formik.errors.validFrom)
                        }
                        helperText={
                          formik.touched.validFrom && formik.errors.validFrom
                        }
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid size={{xs:6}}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Valid Till"
                    value={formik.values.validTill}
                    onChange={(date) =>
                      formik.setFieldValue("validTill", date)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={
                          formik.touched.validTill &&
                          Boolean(formik.errors.validTill)
                        }
                        helperText={
                          formik.touched.validTill && formik.errors.validTill
                        }
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </>
          )}

          {/* Surcharge */}
          <Grid size={{xs:12}}>
            <TextField
              fullWidth
              label="Surcharge"
              name="surcharge"
              value={formik.values.surcharge}
              onChange={formik.handleChange}
              error={
                formik.touched.surcharge && Boolean(formik.errors.surcharge)
              }
              helperText={formik.touched.surcharge && formik.errors.surcharge}
            />
          </Grid>

          {/* Note */}
          <Grid size={{xs:12}}>
            <TextField
              fullWidth
              label="Note"
              name="note"
              value={formik.values.note}
              onChange={formik.handleChange}
              error={formik.touched.note && Boolean(formik.errors.note)}
              helperText={formik.touched.note && formik.errors.note}
            />
          </Grid>

          {/* Action Buttons */}
          <Grid size={{xs:12}} display="flex" gap={2}>
            <Button type="submit" variant="contained" color="primary">
              Add Peak Cost
            </Button>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              onClick={onBack}
            >
              Back
            </Button>
            <Button
              type="button"
              variant="contained"
              color="error"
              onClick={onClose}
            >
              Close
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Peak Costs List */}
      {peakCosts.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">Added Peak Cost Details</Typography>
          {peakCosts.map((cost, index) => (
            <Paper key={index} sx={{ p: 2, mt: 2 }}>
              <Typography><b>Title:</b> {cost.title}</Typography>
              {cost.validFrom && cost.validTill && (
                <Typography>
                  <b>Valid:</b>{" "}
                  {new Date(cost.validFrom).toLocaleDateString()} -{" "}
                  {new Date(cost.validTill).toLocaleDateString()}
                </Typography>
              )}
              <Typography><b>Surcharge:</b> {cost.surcharge}</Typography>
              {cost.note && <Typography><b>Note:</b> {cost.note}</Typography>}
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default HotelFormStep4;
