import React, { useState } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  Person as PersonIcon,
  DirectionsCar as CarIcon,
  TripOrigin as TripIcon,
  Event as DateIcon,
  AttachMoney as MoneyIcon,
  LocationOn as LocationIcon,
  Percent as PercentIcon,
  Discount as DiscountIcon,
  Receipt as TaxIcon,
  Contacts as ContactIcon,
  LocalOffer as OfferIcon,
  Business as BusinessIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Place as PlaceIcon,
  Receipt as  ReceiptIcon,
} from "@mui/icons-material";

const VehicleQuotationStep2 = ({ step1Data, onBack }) => {
  const [openPreview, setOpenPreview] = useState(false);
  const navigate = useNavigate();

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
      marginPercent: Yup.number()
        .typeError("Must be a number")
        .required("Required"),
      marginAmount: Yup.number()
        .typeError("Must be a number")
        .required("Required"),
      discount: Yup.number().typeError("Must be a number"),
      gstOption: Yup.string().required("Required"),
      taxPercent: Yup.string().required("Required"),
      contactDetails: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log("Step 1 Data:", step1Data);
      console.log("Step 2 Data:", values);
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
            <Grid size={{ xs: 6}}>
              <TextField
                fullWidth
                label="Margin %"
                name="marginPercent"
                value={formik.values.marginPercent}
                onChange={formik.handleChange}
                error={
                  formik.touched.marginPercent &&
                  Boolean(formik.errors.marginPercent)
                }
                helperText={
                  formik.touched.marginPercent && formik.errors.marginPercent
                }
              />
            </Grid>
            <Grid size={{ xs: 6}}>
              <TextField
                fullWidth
                label="Margin ₹"
                name="marginAmount"
                value={formik.values.marginAmount}
                onChange={formik.handleChange}
                error={
                  formik.touched.marginAmount &&
                  Boolean(formik.errors.marginAmount)
                }
                helperText={
                  formik.touched.marginAmount && formik.errors.marginAmount
                }
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
              <FormControlLabel
                value="Margin"
                control={<Radio />}
                label="Margin"
              />
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
            error={
              formik.touched.taxPercent && Boolean(formik.errors.taxPercent)
            }
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
            error={
              formik.touched.contactDetails &&
              Boolean(formik.errors.contactDetails)
            }
            helperText={
              formik.touched.contactDetails && formik.errors.contactDetails
            }
          />
        </Box>

        {/* Buttons */}
        <Box display="flex" gap={2}>
          <Button
            fullWidth
            type="button"
            variant="outlined"
            color="secondary"
             onClick={() => onBack()}
          >
            Back
          </Button>

          <Button fullWidth type="submit" variant="contained" color="primary">
            Submit
          </Button>

          <Button
            fullWidth
            type="button"
            variant="outlined"
            onClick={() => setOpenPreview(true)}
          >
            Preview
          </Button>
        </Box>
      </form>

      {/* Preview Dialog */}
      <Dialog
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: 24,
          }
        }}
      >
        {/* Header */}
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 24,
            bgcolor: "primary.main",
            color: "white",
            py: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1
          }}
        >
          <OfferIcon sx={{ fontSize: 30 }} />
          Iconic Yatra - Vehicle Quotation Preview
        </DialogTitle>

        {/* Body */}
        <DialogContent dividers sx={{ bgcolor: "#fafafa", p: 3 }}>
          {/* Company Info */} 
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
              <BusinessIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" color="primary.main">
                Iconic Yatra Travel Services
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
                <PlaceIcon sx={{ fontSize: 16, mr: 0.5 }} />
                123 Travel Street, Tourism City
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
                <PhoneIcon sx={{ fontSize: 16, mr: 0.5 }} />
                +91 98765 43210
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
                <EmailIcon sx={{ fontSize: 16, mr: 0.5 }} />
                info@iconicyatra.com
              </Typography>
            </Box>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          {/* Step 1 Data */}
          <Card sx={{ mb: 3, boxShadow: 2 }}>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: "primary.main",
                  pb: 1,
                  mb: 2,
                  borderBottom: "2px solid",
                  borderColor: "primary.light",
                  display: "flex",
                  alignItems: "center",
                  gap: 1
                }}
              >
                <TripIcon />
                Vehicle & Trip Details
              </Typography>

              <Grid container spacing={3}>
                <Grid size={{ xs: 6}}>
                  <Box sx={{ mb: 2, display: "flex", alignItems: "flex-start" }}>
                    <PersonIcon color="primary" sx={{ mr: 1, mt: 0.5 }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Client Name
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {step1Data.clientName || "Not specified"}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2, display: "flex", alignItems: "flex-start" }}>
                    <CarIcon color="primary" sx={{ mr: 1, mt: 0.5 }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Vehicle Type
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {step1Data.vehicleType || "Not specified"}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2, display: "flex", alignItems: "flex-start" }}>
                    <TripIcon color="primary" sx={{ mr: 1, mt: 0.5 }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Trip Type
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {step1Data.tripType || "Not specified"}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2, display: "flex", alignItems: "flex-start" }}>
                    <DateIcon color="primary" sx={{ mr: 1, mt: 0.5 }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        No of Days
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {step1Data.noOfDays || "Not specified"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid size={{ xs: 6}}>
                  <Box sx={{ mb: 2, display: "flex", alignItems: "flex-start" }}>
                    <MoneyIcon color="primary" sx={{ mr: 1, mt: 0.5 }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Total Cost
                      </Typography>
                      <Typography variant="body1" fontWeight="medium" color="primary.main">
                        ₹{step1Data.totalCost || "0"}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2, display: "flex", alignItems: "flex-start" }}>
                    <LocationIcon color="primary" sx={{ mr: 1, mt: 0.5 }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Pickup
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {step1Data.pickupDate?.toLocaleDateString() || "Not specified"}{" "}
                        {step1Data.pickupTime?.toLocaleTimeString() || ""}
                      </Typography>
                      <Typography variant="body2">
                        {step1Data.pickupLocation || "Not specified"}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2, display: "flex", alignItems: "flex-start" }}>
                    <LocationIcon color="primary" sx={{ mr: 1, mt: 0.5 }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Drop
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {step1Data.dropDate?.toLocaleDateString() || "Not specified"}{" "}
                        {step1Data.dropTime?.toLocaleTimeString() || ""}
                      </Typography>
                      <Typography variant="body2">
                        {step1Data.dropLocation || "Not specified"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Step 2 Data */}
          <Card sx={{ boxShadow: 2 }}>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: "primary.main",
                  pb: 1,
                  mb: 2,
                  borderBottom: "2px solid",
                  borderColor: "primary.light",
                  display: "flex",
                  alignItems: "center",
                  gap: 1
                }}
              >
                <ReceiptIcon />
                Margin & Taxes
              </Typography>

              <Grid container spacing={3}>
                <Grid size={{ xs: 6}}>
                  <Box sx={{ mb: 2, display: "flex", alignItems: "flex-start" }}>
                    <PercentIcon color="primary" sx={{ mr: 1, mt: 0.5 }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Margin %
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {formik.values.marginPercent || "0"}%
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2, display: "flex", alignItems: "flex-start" }}>
                    <MoneyIcon color="primary" sx={{ mr: 1, mt: 0.5 }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Margin Amount
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        ₹{formik.values.marginAmount || "0"}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2, display: "flex", alignItems: "flex-start" }}>
                    <DiscountIcon color="primary" sx={{ mr: 1, mt: 0.5 }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Discount
                      </Typography>
                      <Typography variant="body1" fontWeight="medium" color="green">
                        ₹{formik.values.discount || "0"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid size={{ xs: 6}}>
                  <Box sx={{ mb: 2, display: "flex", alignItems: "flex-start" }}>
                    <TaxIcon color="primary" sx={{ mr: 1, mt: 0.5 }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        GST On
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {formik.values.gstOption || "Not specified"}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2, display: "flex", alignItems: "flex-start" }}>
                    <PercentIcon color="primary" sx={{ mr: 1, mt: 0.5 }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Tax %
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {formik.values.taxPercent || "Not specified"}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2, display: "flex", alignItems: "flex-start" }}>
                    <ContactIcon color="primary" sx={{ mr: 1, mt: 0.5 }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Contact Details
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {formik.values.contactDetails || "Not specified"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Terms and Conditions */}
          <Box sx={{ mt: 3, p: 2, bgcolor: "grey.100", borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom color="text.secondary">
              Terms & Conditions:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • This quotation is valid for 7 days from the date of issue.<br />
              • Prices are subject to change without prior notice.<br />
              • Any additional services will be charged separately.
            </Typography>
          </Box>
        </DialogContent>

        {/* Footer */}
        <DialogActions sx={{ 
          justifyContent: "center", 
          bgcolor: "grey.100",
          py: 2
        }}>
          <Button
            onClick={() => setOpenPreview(false)}
            variant="contained"
            sx={{ 
              minWidth: 120,
              borderRadius: 2
            }}
          >
            Close
          </Button>
          <Button
            variant="outlined"
            sx={{ 
              minWidth: 120,
              borderRadius: 2
            }}
          >
            Print
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default VehicleQuotationStep2;