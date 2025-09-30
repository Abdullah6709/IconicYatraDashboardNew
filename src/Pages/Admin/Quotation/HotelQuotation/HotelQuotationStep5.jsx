import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  standardMargin: Yup.number().required("Required"),
  deluxeMargin: Yup.number().required("Required"),
  superiorMargin: Yup.number().required("Required"),
  gstOption: Yup.string().required("Required"),
  gstRate: Yup.string().required("Required"),
});

const QuotationForm = () => {
  return (
    <Formik
      initialValues={{
        standardMargin: "",
        standardMarginRs: "",
        deluxeMargin: "",
        deluxeMarginRs: "",
        superiorMargin: "",
        superiorMarginRs: "",
        standardDiscount: "",
        deluxeDiscount: "",
        superiorDiscount: "",
        gstOption: "Full",
        gstRate: "",
        contactDetails: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Form Values:", values);
      }}
    >
      {({ values, errors, touched, handleChange }) => (
        <Form>
          <Box sx={{ p: 2 }}>
            {/* Company Margin */}
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Company Margin
                </Typography>
                {["Standard", "Deluxe", "Superior"].map((type, idx) => (
                  <Grid container spacing={2} alignItems="center" sx={{ mb: 1 }} key={type}>
                    <Grid size={{xs:3}}>
                      <Typography>{type}</Typography>
                    </Grid>
                    <Grid size={{xs:3}}>
                      <TextField
                        fullWidth
                        name={`${type.toLowerCase()}Margin`}
                        label="Margin %"
                        value={values[`${type.toLowerCase()}Margin`]}
                        onChange={handleChange}
                        error={touched[`${type.toLowerCase()}Margin`] && Boolean(errors[`${type.toLowerCase()}Margin`])}
                        helperText={touched[`${type.toLowerCase()}Margin`] && errors[`${type.toLowerCase()}Margin`]}
                      />
                    </Grid>
                    <Grid size={{xs:3}}>
                      <TextField
                        fullWidth
                        name={`${type.toLowerCase()}MarginRs`}
                        label="Margin ₹"
                        value={values[`${type.toLowerCase()}MarginRs`]}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                ))}
              </CardContent>
            </Card>

            {/* Discount */}
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Discount
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{xs:4}}>
                    <TextField
                      fullWidth
                      name="standardDiscount"
                      label="Standard Discount in ₹"
                      value={values.standardDiscount}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{xs:4}}>
                    <TextField
                      fullWidth
                      name="deluxeDiscount"
                      label="Deluxe Discount in ₹"
                      value={values.deluxeDiscount}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{xs:4}}>
                    <TextField
                      fullWidth
                      name="superiorDiscount"
                      label="Superior Discount in ₹"
                      value={values.superiorDiscount}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Taxes */}
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Taxes
                </Typography>
                <FormControl component="fieldset" sx={{ mb: 2 }}>
                  <FormLabel>GST</FormLabel>
                  <RadioGroup
                    row
                    name="gstOption"
                    value={values.gstOption}
                    onChange={handleChange}
                  >
                    <FormControlLabel value="Full" control={<Radio />} label="Full" />
                    <FormControlLabel value="Margin" control={<Radio />} label="Margin" />
                    <FormControlLabel value="None" control={<Radio />} label="None" />
                  </RadioGroup>
                  {touched.gstOption && errors.gstOption && (
                    <Typography color="error" variant="caption">
                      {errors.gstOption}
                    </Typography>
                  )}
                </FormControl>

                <TextField
                  select
                  fullWidth
                  name="gstRate"
                  label="Apply GST"
                  value={values.gstRate}
                  onChange={handleChange}
                  error={touched.gstRate && Boolean(errors.gstRate)}
                  helperText={touched.gstRate && errors.gstRate}
                >
                  <MenuItem value="5%">5%</MenuItem>
                  <MenuItem value="12%">12%</MenuItem>
                  <MenuItem value="18%">18%</MenuItem>
                  <MenuItem value="28%">28%</MenuItem>
                </TextField>
              </CardContent>
            </Card>

            {/* Signature */}
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Signature Details
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  name="contactDetails"
                  value={values.contactDetails}
                  onChange={handleChange}
                />
              </CardContent>
            </Card>

            {/* Submit */}
            <Box textAlign="center">
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default QuotationForm;
