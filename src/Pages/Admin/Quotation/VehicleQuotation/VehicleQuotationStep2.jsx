// QuotationForm.jsx
import React from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  MenuItem,
  Paper,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const VehicleQuotationStep2 = () => {
  const formik = useFormik({
    initialValues: {
      marginPercent: "",
      marginAmount: "",
      discount: "",
      gstOption: "",
      taxPercent: "",
      contactDetails: "",
    },
    validationSchema: Yup.object({
      marginPercent: Yup.number().typeError("Must be a number").required("Required"),
      marginAmount: Yup.number().typeError("Must be a number").required("Required"),
      discount: Yup.number().typeError("Must be a number"),
      gstOption: Yup.string().required("Required"),
      taxPercent: Yup.string().required("Required"),
      contactDetails: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log("Form Values:", values);
      alert("Form Submitted!");
    },
  });

  return (
    <Paper sx={{ p: 3, maxWidth: 700, mx: "auto" }} elevation={3}>
      <Typography variant="h6" gutterBottom>
        Quotation : Margin & Taxes
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        {/* Company Margin */}
        <Box sx={{ mb: 3, border: "1px solid #ccc", p: 2, borderRadius: 1 }}>
          <Typography variant="subtitle1" gutterBottom>
            Company Margin
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{xs:6}}>
              <TextField
                fullWidth
                label="Margin %"
                name="marginPercent"
                value={formik.values.marginPercent}
                onChange={formik.handleChange}
                error={formik.touched.marginPercent && Boolean(formik.errors.marginPercent)}
                helperText={formik.touched.marginPercent && formik.errors.marginPercent}
              />
            </Grid>
            <Grid size={{xs:6}}>
              <TextField
                fullWidth
                label="Margin ₹"
                name="marginAmount"
                value={formik.values.marginAmount}
                onChange={formik.handleChange}
                error={formik.touched.marginAmount && Boolean(formik.errors.marginAmount)}
                helperText={formik.touched.marginAmount && formik.errors.marginAmount}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Discount */}
        <Box sx={{ mb: 3, border: "1px solid #ccc", p: 2, borderRadius: 1 }}>
          <Typography variant="subtitle1" gutterBottom>
            Discount
          </Typography>
          <TextField
            fullWidth
            label="Discount in ₹"
            name="discount"
            value={formik.values.discount}
            onChange={formik.handleChange}
            error={formik.touched.discount && Boolean(formik.errors.discount)}
            helperText={formik.touched.discount && formik.errors.discount}
          />
        </Box>

        {/* Taxes */}
        <Box sx={{ mb: 3, border: "1px solid #ccc", p: 2, borderRadius: 1 }}>
          <Typography variant="subtitle1" gutterBottom>
            Taxes
          </Typography>
          <FormControl component="fieldset" sx={{ mb: 2 }}>
            <FormLabel component="legend">GST ON</FormLabel>
            <RadioGroup
              row
              name="gstOption"
              value={formik.values.gstOption}
              onChange={formik.handleChange}
            >
              <FormControlLabel value="Full" control={<Radio />} label="Full" />
              <FormControlLabel value="Margin" control={<Radio />} label="Margin" />
              <FormControlLabel value="None" control={<Radio />} label="None" />
            </RadioGroup>
            {formik.touched.gstOption && formik.errors.gstOption && (
              <Typography variant="caption" color="error">
                {formik.errors.gstOption}
              </Typography>
            )}
          </FormControl>

          <TextField
            select
            fullWidth
            label="Apply GST (Tax %)"
            name="taxPercent"
            value={formik.values.taxPercent}
            onChange={formik.handleChange}
            error={formik.touched.taxPercent && Boolean(formik.errors.taxPercent)}
            helperText={formik.touched.taxPercent && formik.errors.taxPercent}
          >
            <MenuItem value="5%">5%</MenuItem>
            <MenuItem value="12%">12%</MenuItem>
            <MenuItem value="18%">18%</MenuItem>
            <MenuItem value="28%">28%</MenuItem>
          </TextField>
        </Box>

        {/* Signature Details */}
        <Box sx={{ mb: 3, border: "1px solid #ccc", p: 2, borderRadius: 1 }}>
          <Typography variant="subtitle1" gutterBottom>
            Signature Details
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Contact Details"
            name="contactDetails"
            value={formik.values.contactDetails}
            onChange={formik.handleChange}
            error={formik.touched.contactDetails && Boolean(formik.errors.contactDetails)}
            helperText={formik.touched.contactDetails && formik.errors.contactDetails}
          />
        </Box>

        <Button fullWidth type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default VehicleQuotationStep2;
