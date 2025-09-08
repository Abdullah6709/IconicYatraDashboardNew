import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Paper,
  Chip,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Flight,
  Person,
  LocationOn,
  Event,
  Schedule,
  ConfirmationNumber,
  Group,
  AttachMoney,
  Download,
  CheckCircle,
  Flag,
  FlightClass,
  AirplaneTicket,
} from "@mui/icons-material";
import jsPDF from "jspdf";

const FlightFinalize = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [bookingStatus, setBookingStatus] = useState("Pending");

  const quotation = {
    refNo: 33,
    date: "25/08/2025",
    customer: "Mr Anuj Kumar",
    country: "India",
    flight: {
      from: "Bhuj (BHJ)",
      to: "Bhubaneswar (BJB)",
      airline: "Air Arabia",
      date: "30 August 2025",
      time: "4:48 PM",
      flightNo: "G9 415",
      pnr: "K5TQF7R",
      passengers: "Adults (2), Children (1)",
      price: "₹ 25,000",
      baggage: "20kg",
      class: "Economy",
      type: "One Way",
    },
  };

  const handleConfirmFinalize = () => {
    setBookingStatus("Confirmed");
    setOpenDialog(false);
    setOpenSnackbar(true);
  };

  

const handleDownloadPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("FLIGHT QUOTATION", 20, 20);
  doc.setFontSize(12);

  doc.text(`Reference No: ${quotation.refNo}`, 20, 30);
  doc.text(`Date: ${quotation.date}`, 20, 40);
  doc.text(`Customer: ${quotation.customer}`, 20, 50);
  doc.text(`Country: ${quotation.country}`, 20, 60);

  doc.text(`From: ${quotation.flight.from}`, 20, 70);
  doc.text(`To: ${quotation.flight.to}`, 20, 80);
  doc.text(`Airline: ${quotation.flight.airline}`, 20, 90);
  doc.text(`Date: ${quotation.flight.date}`, 20, 100);
  doc.text(`Time: ${quotation.flight.time}`, 20, 110);
  doc.text(`Flight No: ${quotation.flight.flightNo}`, 20, 120);
  doc.text(`PNR: ${quotation.flight.pnr}`, 20, 130);
  doc.text(`Passengers: ${quotation.flight.passengers}`, 20, 140);
  doc.text(`Class: ${quotation.flight.class}`, 20, 150);
  doc.text(`Baggage: ${quotation.flight.baggage}`, 20, 160);
  doc.text(`Price: ${quotation.flight.price}`, 20, 170);
  doc.text(`Status: ${bookingStatus}`, 20, 180);

  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 190);

  doc.save(`Flight_Quotation_${quotation.refNo}.pdf`);
};


  return (
    <>
      <Grid container>
        {/* Sidebar */}
        <Grid
          size={{ xs: 12, md: 3 }}
          sx={{
            borderRight: { md: "1px solid #ddd" },
            p: 3,
            minHeight: "100vh",
            bgcolor: "#f8f9fa",
            textAlign: "center",
          }}
        >
          <Chip
            icon={<Flight />}
            label="Flight Quotation"
            color="primary"
            variant="outlined"
            sx={{ mb: 3 }}
          />
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              bgcolor: "#1976d2",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              m: "16px auto",
              color: "white",
              fontSize: 32,
              boxShadow: 2,
            }}
          >
            <Person sx={{ fontSize: 60 }} />
          </Box>
          <Typography variant="h6" fontWeight="bold">
            {quotation.customer}
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Flag sx={{ fontSize: 16, mr: 0.5, color: "text.secondary" }} />
            <Typography variant="body2">{quotation.country}</Typography>
          </Box>
          <Paper variant="outlined" sx={{ p: 2, mt: 4 }}>
            <Typography variant="subtitle2">Booking Summary</Typography>
            <Divider sx={{ my: 1 }} />
            {[
              ["Reference No:", `#${quotation.refNo}`],
              ["Date:", quotation.date],
            ].map(([k, v]) => (
              <Box key={k} display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2">{k}</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {v}
                </Typography>
              </Box>
            ))}
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2">Status:</Typography>
              <Chip
                label={bookingStatus}
                color={bookingStatus === "Confirmed" ? "success" : "default"}
                size="small"
              />
            </Box>
          </Paper>
        </Grid>

        {/* Content */}
        <Grid size={{ xs: 12, md: 9 }} sx={{ p: 3 }}>
          <Box display="flex" gap={2} mb={3}>
            <Button
              variant="contained"
              startIcon={<CheckCircle />}
              onClick={() => setOpenDialog(true)}
              disabled={bookingStatus === "Confirmed"}
            >
              {bookingStatus === "Confirmed"
                ? "Booking Confirmed"
                : "Finalize Booking"}
            </Button>
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={handleDownloadPDF}
            >
              Download PDF
            </Button>
          </Box>

          <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: "#f8f9fa" }}>
            <Typography variant="subtitle2" gutterBottom>
              <Person sx={{ fontSize: 16, mr: 1 }} />
              Kind Attention
            </Typography>
            <Typography variant="h6">{quotation.customer}</Typography>
            <Box display="flex" alignItems="center">
              <LocationOn
                sx={{ fontSize: 16, mr: 0.5, color: "text.secondary" }}
              />
              <Typography variant="body2">{quotation.country}</Typography>
            </Box>
          </Paper>

          <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <Flight sx={{ color: "orange", mr: 1 }} />
              <Typography variant="h6" sx={{ color: "orange" }}>
                <b>Flight Booking Details ({quotation.flight.type})</b>
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {[
                [<LocationOn />, "From", quotation.flight.from],
                [<LocationOn />, "To", quotation.flight.to],
                [<Event />, "Date", quotation.flight.date],
                [<Schedule />, "Departure Time", quotation.flight.time],
                [<Flight />, "Airline", quotation.flight.airline],
                [<FlightClass />, "Class", quotation.flight.class],
                [
                  <AirplaneTicket />,
                  "Flight Number",
                  quotation.flight.flightNo,
                ],
                [<ConfirmationNumber />, "PNR", quotation.flight.pnr],
                [<Group />, "Passengers", quotation.flight.passengers],
                [<AttachMoney />, "Total Price", quotation.flight.price, true],
              ].map(([Icon, label, value, highlight], i) => (
                <Grid size={{ xs: 12, md: 6 }} key={i}>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Box color="primary.main" mr={1}>
                      {Icon}
                    </Box>
                    <Typography variant="body2" fontWeight="bold">
                      {label}
                    </Typography>
                  </Box>
                  <Typography
                    variant={highlight ? "h6" : "body1"}
                    sx={{ ml: 4, color: highlight ? "orange" : "inherit" }}
                  >
                    {value}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Paper>
          <Box mt={3} textAlign="center">
            <Typography variant="body2" color="textSecondary">
              For any changes or queries, please contact our support team
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Flight Booking Finalization</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to finalize this flight booking? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>No, Cancel</Button>
          <Button onClick={handleConfirmFinalize} variant="contained" autoFocus>
            Yes, Finalize
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Flight booking has been successfully confirmed!
        </Alert>
      </Snackbar>
    </>
  );
};

export default FlightFinalize;
