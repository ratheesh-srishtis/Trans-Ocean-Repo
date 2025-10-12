import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import {
  Person,
  Work,
  FlightTakeoff,
  Description,
  Assignment,
  CardMembership,
  LocalHospital,
  Add,
  Delete,
  Visibility,
  CloudUpload,
} from "@mui/icons-material";

const EditProfile = ({
  formData,
  setFormData,
  desiginationlist,
  handleInputChange,
  handleFileChange,
  handleView,
  handleUpdate,
  handleAddCertificate,
  handleAddMedical,
  handleDeleteCertificate,
  handleDeleteMedical,
}) => {
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getSectionIcon = (type) => {
    const iconMap = {
      personal: <Person />,
      official: <Work />,
      passport: <FlightTakeoff />,
      contract: <Description />,
      visa: <Assignment />,
      license: <CardMembership />,
      certificate: <CardMembership />,
      medical: <LocalHospital />,
    };
    return iconMap[type] || <Description />;
  };

  const TabPanel = ({ children, value, index, ...other }) => (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );

  const DocumentUpload = ({ document, onFileChange, onView }) => (
    <Box>
      <Button
        variant="outlined"
        component="label"
        startIcon={<CloudUpload />}
        sx={{ mb: 1 }}
      >
        Upload Document
        <input type="file" hidden onChange={onFileChange} />
      </Button>
      {document?.url && (
        <Paper
          sx={{
            p: 1,
            mt: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "grey.50",
            border: "1px solid",
            borderColor: "grey.200",
          }}
        >
          <Typography variant="body2" sx={{ flexGrow: 1 }}>
            {document.originalName}
          </Typography>
          <IconButton
            size="small"
            color="primary"
            onClick={() => onView(document.url)}
            title="View Document"
          >
            <Visibility />
          </IconButton>
        </Paper>
      )}
    </Box>
  );

  const handlePersonalInfoUpdate = async () => {
    setIsLoading(true);
    try {
      await handleUpdate();
    } finally {
      setIsLoading(false);
    }
  };

  const handleOfficialInfoUpdate = async () => {
    setIsLoading(true);
    try {
      await handleUpdate();
    } finally {
      setIsLoading(false);
    }
  };

  const handlePassportUpdate = async () => {
    setIsLoading(true);
    try {
      await handleUpdate();
    } finally {
      setIsLoading(false);
    }
  };

  const handleContractUpdate = async () => {
    setIsLoading(true);
    try {
      await handleUpdate();
    } finally {
      setIsLoading(false);
    }
  };

  const handleVisaUpdate = async () => {
    setIsLoading(true);
    try {
      await handleUpdate();
    } finally {
      setIsLoading(false);
    }
  };

  const handleLicenseUpdate = async () => {
    setIsLoading(true);
    try {
      await handleUpdate();
    } finally {
      setIsLoading(false);
    }
  };

  const handleCertificateUpdate = async () => {
    setIsLoading(true);
    try {
      await handleUpdate();
    } finally {
      setIsLoading(false);
    }
  };

  const handleMedicalUpdate = async () => {
    setIsLoading(true);
    try {
      await handleUpdate();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="profile edit tabs"
        >
          <Tab
            label="Personal Info"
            icon={getSectionIcon("personal")}
            iconPosition="start"
          />
          <Tab
            label="Official Info"
            icon={getSectionIcon("official")}
            iconPosition="start"
          />
          <Tab
            label="Passport"
            icon={getSectionIcon("passport")}
            iconPosition="start"
          />
          <Tab
            label="Contract"
            icon={getSectionIcon("contract")}
            iconPosition="start"
          />
          <Tab
            label="Visa"
            icon={getSectionIcon("visa")}
            iconPosition="start"
          />
          <Tab
            label="License"
            icon={getSectionIcon("license")}
            iconPosition="start"
          />
          <Tab
            label="Certificates"
            icon={getSectionIcon("certificate")}
            iconPosition="start"
          />
          <Tab
            label="Medical"
            icon={getSectionIcon("medical")}
            iconPosition="start"
          />
        </Tabs>
      </Box>

      {/* Personal Information Tab */}
      <TabPanel value={tabValue} index={0}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="employeeName"
                  value={formData.employeeName || ""}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="employeeLastName"
                  value={formData.employeeLastName || ""}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  type="date"
                  name="dob"
                  value={formData.dob || ""}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  multiline
                  rows={3}
                  value={formData.address || ""}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={formData.city || ""}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  value={formData.state || ""}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Post Code"
                  name="postcode"
                  value={formData.postcode || ""}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nationality"
                  name="nationality"
                  value={formData.nationality || ""}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Contact Number"
                  name="contactNumber"
                  value={formData.contactNumber || ""}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email ID"
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Passport Number"
                  name="passportNumber"
                  value={formData.passportNumber || ""}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Civil ID"
                  name="iqamaNumber"
                  value={formData.iqamaNumber || ""}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Button
                variant="contained"
                size="large"
                onClick={handlePersonalInfoUpdate}
                disabled={isLoading}
              >
                Update Personal Information
              </Button>
            </Box>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Official Information Tab */}
      <TabPanel value={tabValue} index={1}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Official Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Date of Joining"
                  type="date"
                  name="dateOfJoining"
                  value={formData.dateOfJoining || ""}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Designation</InputLabel>
                  <Select
                    value={formData.designation || ""}
                    label="Designation"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        designation: e.target.value,
                      })
                    }
                  >
                    {desiginationlist.map((desg) => (
                      <MenuItem key={desg._id} value={desg._id}>
                        {desg.designationName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Official Email ID"
                  type="email"
                  name="officialEmail"
                  value={formData.officialEmail || ""}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Profession Title"
                  name="profession"
                  value={formData.profession || ""}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleOfficialInfoUpdate}
                disabled={isLoading}
              >
                Update Official Information
              </Button>
            </Box>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Passport Details Tab */}
      <TabPanel value={tabValue} index={2}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Passport Details
            </Typography>
            {formData.passportDetails?.length > 0 &&
              formData.passportDetails.map((item, idx) => (
                <Box key={idx} sx={{ mb: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Passport Number"
                        value={item.passportNumber || ""}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "passportDetails",
                            idx,
                            "passportNumber"
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Date of Expiry"
                        type="date"
                        value={item.dateOfExpiry || ""}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "passportDetails",
                            idx,
                            "dateOfExpiry"
                          )
                        }
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <DocumentUpload
                        document={item.document}
                        onFileChange={(e) =>
                          handleFileChange(e, "passportDetails", idx)
                        }
                        onView={handleView}
                      />
                    </Grid>
                  </Grid>
                  {idx < formData.passportDetails.length - 1 && (
                    <Divider sx={{ mt: 2 }} />
                  )}
                </Box>
              ))}
            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Button
                variant="contained"
                size="large"
                onClick={handlePassportUpdate}
                disabled={isLoading}
              >
                Update Passport Details
              </Button>
            </Box>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Contract Details Tab */}
      <TabPanel value={tabValue} index={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Contract Details
            </Typography>
            {formData.contractDetails?.length > 0 &&
              formData.contractDetails.map((item, idx) => (
                <Box key={idx} sx={{ mb: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Contract Name"
                        value={item.contractName || ""}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "contractDetails",
                            idx,
                            "contractName"
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Date of Expiry"
                        type="date"
                        value={item.dateOfExpiry || ""}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "contractDetails",
                            idx,
                            "dateOfExpiry"
                          )
                        }
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <DocumentUpload
                        document={item.document}
                        onFileChange={(e) =>
                          handleFileChange(e, "contractDetails", idx)
                        }
                        onView={handleView}
                      />
                    </Grid>
                  </Grid>
                  {idx < formData.contractDetails.length - 1 && (
                    <Divider sx={{ mt: 2 }} />
                  )}
                </Box>
              ))}
            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleContractUpdate}
                disabled={isLoading}
              >
                Update Contract Details
              </Button>
            </Box>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Visa Details Tab */}
      <TabPanel value={tabValue} index={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Visa Details
            </Typography>
            {formData.visaDetails?.length > 0 &&
              formData.visaDetails.map((item, idx) => (
                <Box key={idx} sx={{ mb: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Visa Number"
                        value={item.visaNumber || ""}
                        onChange={(e) =>
                          handleInputChange(e, "visaDetails", idx, "visaNumber")
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Date of Expiry"
                        type="date"
                        value={item.dateOfExpiry || ""}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "visaDetails",
                            idx,
                            "dateOfExpiry"
                          )
                        }
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <DocumentUpload
                        document={item.document}
                        onFileChange={(e) =>
                          handleFileChange(e, "visaDetails", idx)
                        }
                        onView={handleView}
                      />
                    </Grid>
                  </Grid>
                  {idx < formData.visaDetails.length - 1 && (
                    <Divider sx={{ mt: 2 }} />
                  )}
                </Box>
              ))}
            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleVisaUpdate}
                disabled={isLoading}
              >
                Update Visa Details
              </Button>
            </Box>
          </CardContent>
        </Card>
      </TabPanel>

      {/* License Details Tab */}
      <TabPanel value={tabValue} index={5}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              License Details
            </Typography>
            {formData.licenseDetails?.length > 0 &&
              formData.licenseDetails.map((item, idx) => (
                <Box key={idx} sx={{ mb: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="License Number"
                        value={item.licenseNumber || ""}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "licenseDetails",
                            idx,
                            "licenseNumber"
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Date of Expiry"
                        type="date"
                        value={item.dateOfExpiry || ""}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "licenseDetails",
                            idx,
                            "dateOfExpiry"
                          )
                        }
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <DocumentUpload
                        document={item.document}
                        onFileChange={(e) =>
                          handleFileChange(e, "licenseDetails", idx)
                        }
                        onView={handleView}
                      />
                    </Grid>
                  </Grid>
                  {idx < formData.licenseDetails.length - 1 && (
                    <Divider sx={{ mt: 2 }} />
                  )}
                </Box>
              ))}
            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleLicenseUpdate}
                disabled={isLoading}
              >
                Update License Details
              </Button>
            </Box>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Certificate Details Tab */}
      <TabPanel value={tabValue} index={6}>
        <Card>
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6">Certificate Details</Typography>
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={handleAddCertificate}
              >
                Add Certificate
              </Button>
            </Box>
            {formData.certificationDetails?.length > 0 &&
              formData.certificationDetails.map((item, idx) => (
                <Box
                  key={idx}
                  sx={{
                    mb: 3,
                    p: 2,
                    border: "1px solid #e0e0e0",
                    borderRadius: 1,
                  }}
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                  >
                    <Typography variant="subtitle1">
                      Certificate #{idx + 1}
                    </Typography>
                    {formData.certificationDetails.length > 1 && (
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteCertificate(idx)}
                        size="small"
                      >
                        <Delete />
                      </IconButton>
                    )}
                  </Box>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Certificate Name"
                        value={item.certification || ""}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "certificationDetails",
                            idx,
                            "certification"
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Certificate Description"
                        value={item.certificateDescription || ""}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "certificationDetails",
                            idx,
                            "certificateDescription"
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <DocumentUpload
                        document={item.document}
                        onFileChange={(e) =>
                          handleFileChange(e, "certificationDetails", idx)
                        }
                        onView={handleView}
                      />
                    </Grid>
                  </Grid>
                </Box>
              ))}
            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleCertificateUpdate}
                disabled={isLoading}
              >
                Update Certificate Details
              </Button>
            </Box>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Medical Details Tab */}
      <TabPanel value={tabValue} index={7}>
        <Card>
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6">Medical Details</Typography>
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={handleAddMedical}
              >
                Add Medical Record
              </Button>
            </Box>
            {formData.medicalRecordDetails?.length > 0 &&
              formData.medicalRecordDetails.map((item, idx) => (
                <Box
                  key={idx}
                  sx={{
                    mb: 3,
                    p: 2,
                    border: "1px solid #e0e0e0",
                    borderRadius: 1,
                  }}
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                  >
                    <Typography variant="subtitle1">
                      Medical Record #{idx + 1}
                    </Typography>
                    {formData.medicalRecordDetails.length > 1 && (
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteMedical(idx)}
                        size="small"
                      >
                        <Delete />
                      </IconButton>
                    )}
                  </Box>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Description"
                        value={item.description || ""}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "medicalRecordDetails",
                            idx,
                            "description"
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Relationship"
                        value={item.relationship || ""}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "medicalRecordDetails",
                            idx,
                            "relationship"
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <DocumentUpload
                        document={item.document}
                        onFileChange={(e) =>
                          handleFileChange(e, "medicalRecordDetails", idx)
                        }
                        onView={handleView}
                      />
                    </Grid>
                  </Grid>
                </Box>
              ))}
            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleMedicalUpdate}
                disabled={isLoading}
              >
                Update Medical Details
              </Button>
            </Box>
          </CardContent>
        </Card>
      </TabPanel>
    </Box>
  );
};

export default EditProfile;
