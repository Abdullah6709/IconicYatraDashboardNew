import React, { useState } from "react";
import {
  Box, Grid, Typography, Button, Card, CardContent, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper, List, ListItem,
  ListItemText, Chip, useTheme, useMediaQuery, Accordion,
  AccordionSummary, AccordionDetails, Dialog, DialogTitle,
  DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem,
  Checkbox, FormControlLabel
} from "@mui/material";
import {
  DirectionsCar, Payment, Phone, AlternateEmail, CreditCard, Description,
  Person, LocationOn, CalendarToday, AccessTime, Group, Route, CheckCircle,
  Cancel, Warning, Business, Language, ExpandMore
} from "@mui/icons-material";

const VehicleQuotationPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [activeInfo, setActiveInfo] = useState(null);

  // dialog states
  const [openFinalize, setOpenFinalize] = useState(false);
  const [vendor, setVendor] = useState("");
  const [showAll, setShowAll] = useState(false);

  const handleFinalizeOpen = () => setOpenFinalize(true);
  const handleFinalizeClose = () => setOpenFinalize(false);

  const handleConfirm = () => {
    console.log("Vendor:", vendor, "Show All:", showAll);
    setOpenFinalize(false);
  };

  const q = {
    actions: ["Finalize", "Vehicle Details", "Add Service", "Email Quotation", "Preview PDF", "Make Payment"],
    customer: { name: "Amit Jaiswal", location: "Andhra Pradesh" },
    date: "27/08/2025", reference: "41",
    pickup: {
      arrival: "Arrival: Betul (22/08/2025) at Airport, 3:35PM",
      departure: "Departure: Agra (06/09/2025) from Local Address, 6:36PM",
    },
    guests: "6 Adults",
    itineraryNote: "This is only tentative schedule for sightseeing and travel...",
    vehicles: [
      { name: "ERTIGA", pickup: { date: "22/08/2025", time: "3:35PM" }, drop: { date: "06/09/2025", time: "6:36PM" }, cost: "₹ 2,000" }
    ],
    discount: "₹ 200", gst: "₹ 140", total: "₹ 3,340",
    inclusions: [
      "All transfers tours in a Private AC cab.",
      "Parking, Toll charges, Fuel and Driver expenses.",
      "Hotel Taxes.",
      "Car AC off during hill stations."
    ],
    exclusions: "1. Any Cost change... (rest of exclusions)",
    paymentPolicy: "50% amount to pay at confirmation, balance before 10 days.",
    cancellationPolicy: "1. Before 15 days: 50%. 2. Within 7 days: 100%.",
    terms: "1. This is only a Quote. Availability is checked only on confirmation...",
    footer: {
      contact: "Amit Jaiswal | +91 7053900957 (Noida)",
      phone: "+91 7053900957", email: "amit.jaiswal@example.com",
      received: "₹ 1,500", balance: "₹ 1,840", company: "Iconic Yatra",
      address: "Office No 15, Bhawani Market Sec 27, Noida, Uttar Pradesh – 201301",
      website: "https://www.iconicyatra.com",
    },
  };

  const infoMap = {
    call: `📞 ${q.footer.phone}`,
    email: `✉️ ${q.footer.email}`,
    payment: `Received: ${q.footer.received}\nBalance: ${q.footer.balance}`,
    quotation: `Total Quotation Cost: ${q.total}`,
    guest: `No. of Guests: ${q.guests}`,
  };

  const Accordions = [
    { title: "Vehicle Details" }, { title: "Company Margin" }, { title: "Agent Margin" },
  ];

  const Policies = [
    { title: "Inclusion Policy", icon: <CheckCircle sx={{ mr: .5, color: "success.main" }} />, content: <List dense>{q.inclusions.map((i, k) => <ListItem key={k}><ListItemText primary={i} /></ListItem>)}</List> },
    { title: "Exclusion Policy", icon: <Cancel sx={{ mr: .5, color: "error.main" }} />, content: q.exclusions },
    { title: "Payment Policy", icon: <Payment sx={{ mr: .5, color: "primary.main" }} />, content: q.paymentPolicy },
    { title: "Cancellation & Refund", icon: <Warning sx={{ mr: .5, color: "warning.main" }} />, content: q.cancellationPolicy },
  ];

  return (
    <Box>
      {/* Action Buttons */}
      <Box display="flex" justifyContent="flex-end" gap={1} mb={2} flexWrap="wrap">
        {q.actions.map((a, i) => (
          <Button
            key={i}
            variant="contained"
            onClick={a === "Finalize" ? handleFinalizeOpen : undefined}
          >
            {a}
          </Button>
        ))}
      </Box>

      <Grid container spacing={2}>
        {/* Sidebar */}
        <Grid size={{xs:12, md:3}}>
          <Box sx={{ position: "sticky", top: 0 }}>
            <Card><CardContent>
              <Box display="flex" alignItems="center" mb={1}><Person color="primary" sx={{ mr: 1 }} /><Typography variant="h6">{q.customer.name}</Typography></Box>
              <Box display="flex" alignItems="center" mb={2}><LocationOn sx={{ fontSize: 18, mr: .5, color: "text.secondary" }} /><Typography variant="body2" color="text.secondary">{q.customer.location}</Typography></Box>
              <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
                {[
                  { k: "call", icon: <Phone /> }, { k: "email", icon: <AlternateEmail /> },
                  { k: "payment", icon: <CreditCard /> }, { k: "quotation", icon: <Description /> },
                  { k: "guest", icon: <Person /> },
                ].map(({ k, icon }) => (
                  <Chip key={k} icon={icon} label={k} size="small" variant="outlined" onClick={() => setActiveInfo(k)} />
                ))}
              </Box>
              {activeInfo && <Typography variant="body2" whiteSpace="pre-line">{infoMap[activeInfo]}</Typography>}
              <Typography variant="subtitle1" fontWeight="bold" color="warning.main" mt={2} textAlign="center">Margin & Taxes (B2C)</Typography>
              {Accordions.map((a, i) => (
                <Accordion key={i}><AccordionSummary expandIcon={<ExpandMore />}><Typography color="primary" fontWeight="bold">{a.title}</Typography></AccordionSummary><AccordionDetails><Typography variant="body2">Details go here.</Typography></AccordionDetails></Accordion>
              ))}
            </CardContent></Card>
          </Box>
        </Grid>

        {/* Main */}
        <Grid size={{xs:12, md:9}}>
          <Card><CardContent>
            <Box display="flex" justifyContent="space-between" flexDirection={isMobile ? "column" : "row"}>
              <Box display="flex" alignItems="center"><CalendarToday sx={{ fontSize: 18, mr: .5 }} /><Typography variant="body2" fontWeight="bold">Date: {q.date}</Typography></Box>
            </Box>
            <Typography variant="body2" fontWeight="bold" mt={1} display="flex" alignItems="center"><Description sx={{ fontSize: 18, mr: .5 }} />Ref: {q.reference}</Typography>
            <Typography variant="subtitle1" fontWeight="bold" mt={2} display="flex" alignItems="center"><Person sx={{ fontSize: 18, mr: .5 }} />Kind Attention: {q.customer.name}</Typography>

            {/* Pickup/Drop */}
            <Box mt={2} p={2} sx={{ backgroundColor: "grey.50", borderRadius: 1 }}>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom display="flex" alignItems="center"><Route sx={{ mr: .5 }} />Pickup/Drop Details</Typography>
              {[{ icon: <CheckCircle sx={{ fontSize: 16, mr: .5, color: "success.main" }} />, text: q.pickup.arrival },
                { icon: <Cancel sx={{ fontSize: 16, mr: .5, color: "error.main" }} />, text: q.pickup.departure },
                { icon: <Group sx={{ fontSize: 16, mr: .5 }} />, text: `No of Guest: ${q.guests}` }]
                .map((i, k) => <Box key={k} display="flex" alignItems="center" mb={.5}><>{i.icon}</>{i.text}</Box>)}
            </Box>

            {/* Vehicle Quotation */}
            <Box mt={3}>
              <Typography variant="h6" fontWeight="bold" color="warning.main" display="flex" alignItems="center"><DirectionsCar sx={{ mr: 1 }} />Vehicle Quotation For {q.customer.name}</Typography>
              <Typography variant="subtitle2" mt={1} display="flex" alignItems="center"><Route sx={{ mr: .5 }} />Itinerary Route Plan</Typography>
              <Box display="flex" mt={1}><Warning sx={{ mr: 1, color: "warning.main", mt: .2 }} /><Typography variant="body2">{q.itineraryNote}</Typography></Box>
            </Box>

            {/* Vehicle Table */}
            <Box mt={3}>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead sx={{ backgroundColor: "primary.light" }}>
                    {["Vehicle Name", "Pickup", "Drop", "Cost"].map(h => <TableCell key={h} sx={{ color: "white", fontWeight: "bold" }}>{h}</TableCell>)}
                  </TableHead>
                  <TableBody>
                    {q.vehicles.map((v, i) => (
                      <TableRow key={i}>
                        <TableCell><DirectionsCar sx={{ mr: 1, color: "primary.main" }} />{v.name}</TableCell>
                        <TableCell><CalendarToday sx={{ fontSize: 16, mr: .5 }} />{v.pickup.date}<br /><AccessTime sx={{ fontSize: 16, mr: .5 }} />{v.pickup.time}</TableCell>
                        <TableCell><CalendarToday sx={{ fontSize: 16, mr: .5 }} />{v.drop.date}<br /><AccessTime sx={{ fontSize: 16, mr: .5 }} />{v.drop.time}</TableCell>
                        <TableCell>{v.cost}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow sx={{ backgroundColor: "grey.50" }}><TableCell>Discount</TableCell><TableCell colSpan={2} /><TableCell>-{q.discount}</TableCell></TableRow>
                    <TableRow><TableCell>GST</TableCell><TableCell colSpan={2} /><TableCell>{q.gst}</TableCell></TableRow>
                    <TableRow sx={{ backgroundColor: "primary.main" }}>
                      <TableCell colSpan={3} align="right" sx={{ color: "white", fontWeight: "bold" }}>Total Quotation Cost</TableCell>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>{q.total}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* Policies */}
            <Grid container spacing={2} mt={1}>
              {Policies.map((p, i) => (
                <Grid size={{xs:12}} key={i}>
                  <Card variant="outlined"><CardContent>
                    <Typography variant="subtitle2" gutterBottom display="flex" alignItems="center">{p.icon}{p.title}</Typography>
                    <Typography variant="body2">{p.content}</Typography>
                  </CardContent></Card>
                </Grid>
              ))}
            </Grid>

            {/* Terms */}
            <Box mt={2}><Card variant="outlined"><CardContent>
              <Typography variant="subtitle2" gutterBottom display="flex" alignItems="center"><Description sx={{ mr: .5 }} />Terms & Condition</Typography>
              <Typography variant="body2">{q.terms}</Typography>
            </CardContent></Card></Box>

            {/* Footer */}
            <Box mt={4} p={2} sx={{ backgroundColor: "primary.light", borderRadius: 1, color: "white" }}>
              <Typography variant="body2">Thanks & Regards,<br /><Person sx={{ mr: .5, fontSize: 18 }} />{q.footer.contact}</Typography>
              <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: "bold" }}>{q.footer.company}</Typography>
              <Box display="flex" alignItems="center" mt={.5}><Business sx={{ mr: .5, fontSize: 18 }} />{q.footer.address}</Box>
              <Box display="flex" alignItems="center" mt={.5}><Language sx={{ mr: .5, fontSize: 18 }} /><a href={q.footer.website} target="_blank" rel="noreferrer" style={{ color: "white", textDecoration: "underline" }}>{q.footer.website}</a>
                <Typography variant="subtitle1" sx={{ ml: 2 }}>GST : 09EYCPK8832C1ZC</Typography></Box>
            </Box>
          </CardContent></Card>
        </Grid>
      </Grid>

      {/* Finalize Dialog */}
      <Dialog open={openFinalize} onClose={handleFinalizeClose} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ color: "primary.main" }}>Vehicle Vendor</DialogTitle>
        <DialogContent>
          <FormControlLabel
            control={<Checkbox checked={showAll} onChange={(e) => setShowAll(e.target.checked)} />}
            label="Show All"
            sx={{ float: "right", mt: -1 }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel required>Vehicle Vendor</InputLabel>
               <Select value={vendor} onChange={(e) => setVendor(e.target.value)} displayEmpty>
              <MenuItem value="Default Vehicle Vendor">Default Vehicle Vendor</MenuItem>
              <MenuItem value="Sukhbir Lepcha">Sukhbir Lepcha</MenuItem>
               <MenuItem value="Ketan Bhikhu">Ketan Bhikhu</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm} variant="contained" disabled={!vendor} sx={{ bgcolor: "skyblue", "&:hover": { bgcolor: "deepskyblue" } }}>
            Confirm
          </Button>
          <Button onClick={handleFinalizeClose} variant="contained" sx={{ bgcolor: "darkorange", "&:hover": { bgcolor: "orange" } }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VehicleQuotationPage;
