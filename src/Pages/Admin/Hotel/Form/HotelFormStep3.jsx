// HotelFormStep3.jsx
import React from "react";
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
  IconButton,
} from "@mui/material";
import { useFormik, FieldArray, FormikProvider } from "formik";
import * as Yup from "yup";
import DeleteIcon from "@mui/icons-material/Delete";

const mealPlans = ["Room Only", "Breakfast Only", "Half Board", "Full Board"];

const HotelFormStep3 = ({ onNext, onBack }) => {
  const formik = useFormik({
    initialValues: {
      mealPlan: "",
      adult: "",
      children: "",
      kidWithoutMattress: "",
      mattresses: [], // dynamic mattress list
    },
    validationSchema: Yup.object({
      mealPlan: Yup.string().required("Meal Plan is required"),
      adult: Yup.number()
        .typeError("Must be a number")
        .required("Adult cost is required"),
      children: Yup.number()
        .typeError("Must be a number")
        .required("Children cost is required"),
      kidWithoutMattress: Yup.number()
        .typeError("Must be a number")
        .required("Kid without mattress cost is required"),
      mattresses: Yup.array().of(
        Yup.object({
          mealPlan: Yup.string().required("Meal Plan is required"),
          adult: Yup.number()
            .typeError("Must be a number")
            .required("Adult cost is required"),
          children: Yup.number()
            .typeError("Must be a number")
            .required("Children cost is required"),
          kidWithoutMattress: Yup.number()
            .typeError("Must be a number")
            .required("Kid without mattress cost is required"),
        })
      ),
    }),
    onSubmit: (values) => {
      console.log("Step 3 values:", values);
      onNext();
    },
  });

  return (
    <FormikProvider value={formik}>
      <Box
        border={1}
        borderColor="grey.400"
        borderRadius={1}
        p={2}
        mb={3}
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <Typography variant="h6" gutterBottom>
          Edit Hotel Information
        </Typography>

        {/* First Mattress Block (Main Fields) */}
        <Typography variant="subtitle1" gutterBottom>
          Mattress Cost
        </Typography>
        <Grid container spacing={2}>
          {/* Meal Plan */}
          <Grid size={{xs:12, sm:6, md:3}}>
            <FormControl
              fullWidth
              error={formik.touched.mealPlan && Boolean(formik.errors.mealPlan)}
            >
              <InputLabel>Meal Plan</InputLabel>
              <Select
                name="mealPlan"
                value={formik.values.mealPlan}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {mealPlans.map((plan) => (
                  <MenuItem key={plan} value={plan}>
                    {plan}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {formik.touched.mealPlan && formik.errors.mealPlan}
              </FormHelperText>
            </FormControl>
          </Grid>

          {/* Adult */}
          <Grid size={{xs:12, sm:6, md:3}}>
            <TextField
              fullWidth
              label="Adult"
              name="adult"
              value={formik.values.adult}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.adult && Boolean(formik.errors.adult)}
              helperText={formik.touched.adult && formik.errors.adult}
            />
          </Grid>

          {/* Children */}
          <Grid size={{xs:12, sm:6, md:3}}>
            <TextField
              fullWidth
              label="Children (6-12 yrs)"
              name="children"
              value={formik.values.children}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.children && Boolean(formik.errors.children)}
              helperText={formik.touched.children && formik.errors.children}
            />
          </Grid>

          {/* Kid Without Mattress */}
          <Grid size={{xs:12, sm:6, md:3}}>
            <TextField
              fullWidth
              label="Kid Without Mattress (Below 6 yrs)"
              name="kidWithoutMattress"
              value={formik.values.kidWithoutMattress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.kidWithoutMattress &&
                Boolean(formik.errors.kidWithoutMattress)
              }
              helperText={
                formik.touched.kidWithoutMattress &&
                formik.errors.kidWithoutMattress
              }
            />
          </Grid>
        </Grid>

        {/* Dynamic Mattress Sections */}
        <FieldArray
          name="mattresses"
          render={(arrayHelpers) => (
            <Box mt={3}>
              {formik.values.mattresses.map((mat, index) => (
                <Box
                  key={index}
                  p={2}
                  mb={2}
                  border={1}
                  borderColor="grey.300"
                  borderRadius={1}
                >
                  <Grid container spacing={2} alignItems="center">
                    {/* Meal Plan */}
                    <Grid size={{xs:12, sm:6, md:3}}>
                      <FormControl
                        fullWidth
                        error={
                          formik.touched.mattresses?.[index]?.mealPlan &&
                          Boolean(formik.errors.mattresses?.[index]?.mealPlan)
                        }
                      >
                        <InputLabel>Meal Plan</InputLabel>
                        <Select
                          name={`mattresses[${index}].mealPlan`}
                          value={mat.mealPlan}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          {mealPlans.map((plan) => (
                            <MenuItem key={plan} value={plan}>
                              {plan}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>
                          {
                            formik.touched.mattresses?.[index]?.mealPlan &&
                            formik.errors.mattresses?.[index]?.mealPlan
                          }
                        </FormHelperText>
                      </FormControl>
                    </Grid>

                    {/* Adult */}
                    <Grid size={{xs:12, sm:6, md:2}}>
                      <TextField
                        fullWidth
                        label="Adult"
                        name={`mattresses[${index}].adult`}
                        value={mat.adult}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.mattresses?.[index]?.adult &&
                          Boolean(formik.errors.mattresses?.[index]?.adult)
                        }
                        helperText={
                          formik.touched.mattresses?.[index]?.adult &&
                          formik.errors.mattresses?.[index]?.adult
                        }
                      />
                    </Grid>

                    {/* Children */}
                    <Grid size={{xs:12, sm:6, md:2}}>
                      <TextField
                        fullWidth
                        label="Children"
                        name={`mattresses[${index}].children`}
                        value={mat.children}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.mattresses?.[index]?.children &&
                          Boolean(formik.errors.mattresses?.[index]?.children)
                        }
                        helperText={
                          formik.touched.mattresses?.[index]?.children &&
                          formik.errors.mattresses?.[index]?.children
                        }
                      />
                    </Grid>

                    {/* Kid Without Mattress */}
                    <Grid size={{xs:12, sm:6, md:3}}>
                      <TextField
                        fullWidth
                        label="Kid Without Mattress"
                        name={`mattresses[${index}].kidWithoutMattress`}
                        value={mat.kidWithoutMattress}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.mattresses?.[index]?.kidWithoutMattress &&
                          Boolean(
                            formik.errors.mattresses?.[index]?.kidWithoutMattress
                          )
                        }
                        helperText={
                          formik.touched.mattresses?.[index]?.kidWithoutMattress &&
                          formik.errors.mattresses?.[index]?.kidWithoutMattress
                        }
                      />
                    </Grid>

                    {/* Delete button */}
                    <Grid item xs={12} sm={1}>
                      <IconButton
                        color="error"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              ))}

              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={() =>
                  arrayHelpers.push({
                    mealPlan: "",
                    adult: "",
                    children: "",
                    kidWithoutMattress: "",
                  })
                }
              >
                Add Mattress
              </Button>
            </Box>
          )}
        />

        {/* Navigation Buttons */}
        <Box mt={3} display="flex" gap={2}>
          <Button type="button" variant="contained" color="info" onClick={onBack}>
            Back
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Save & Continue
          </Button>
        </Box>
      </Box>
    </FormikProvider>
  );
};

export default HotelFormStep3;
