import React, { useState, useEffect } from "react";
import "../css/profile.css";
import "../css/profile-enhanced.css";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Card,
  CardContent,
} from "@mui/material";
import {
  getProfileDetails,
  editEmployeeProfile,
} from "../services/apiSettings";
import PopUp from "../pages/PopUp";
import Loader from "../pages/Loader";
import { useAuth } from "../context/AuthContext";
import {
  getAllDesignations,
  deleteCertificationDocument,
} from "../services/apiEmployee";
import ViewProfile from "./ViewProfile";
import EditProfile from "./EditProfile";
const Profile = () => {
  const { loginResponse } = useAuth();
  console.log(loginResponse, "loginResponse_profile");

  const [isLoading, setIsLoading] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [employeeData, setEmployeeData] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  // Delete handlers for certificate/medical
  const handleDeleteCertificate = async (idx) => {
    try {
      // Get the certificate to delete
      const certificateToDelete = formData.certificationDetails[idx];

      if (certificateToDelete && certificateToDelete._id) {
        const deletePayload = {
          employeeId: loginResponse?.data?._id,
          documentId: certificateToDelete._id,
        };
        await deleteCertificationDocument(deletePayload);
      }

      // Update local state after successful backend deletion
      const updated = formData.certificationDetails.filter((_, i) => i !== idx);
      setFormData({ ...formData, certificationDetails: updated });

      // Optionally refresh the profile data
      await fetchProfileDetails();
    } catch (error) {
      console.error("Error deleting certificate:", error);
      // You can add a popup or notification here
      setMessage("Failed to delete certificate. Please try again.");
      setOpenPopUp(true);
    }
  };

  const handleDeleteMedical = (idx) => {
    // Note: Medical record deletion is currently local-only
    // TODO: Implement backend API call when deleteMedicalDocument API is available
    const updated = formData.medicalRecordDetails.filter((_, i) => i !== idx);
    setFormData({ ...formData, medicalRecordDetails: updated });
  };

  useEffect(() => {
    setEmployeeId(loginResponse?.data?._id);
  }, [loginResponse]);

  const fetchProfileDetails = async () => {
    let payload = {
      userId: "",
      employeeId: loginResponse?.data?._id,
    };
    try {
      setIsLoading(true);
      const response = await getProfileDetails(payload);
      console.log("fetchProfileDetails:", response);
      setEmployeeData(response?.employeeDetails[0]);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch customers", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileDetails();
  }, []);
  // State for all editable fields
  const [formData, setFormData] = useState({
    passportDetails: [],
    contractDetails: [],
    visaDetails: [],
    licenseDetails: [],
    medicalRecordDetails: [],
    certificationDetails: [],
  });
  useEffect(() => {
    if (!employeeData) return;
    console.log(employeeData, "employeeData");
    const {
      passportDetails = [],
      contractDetails = [],
      visaDetails = [],
      licenseDetails = [],
      medicalRecordDetails = [],
      certificationDetails = [],
      ...rest
    } = employeeData;

    setFormData({
      ...rest,
      passportDetails,
      contractDetails,
      visaDetails,
      licenseDetails,
      medicalRecordDetails,
      certificationDetails,
    });
  }, [employeeData]);
  const [desiginationlist, setDesiginations] = useState([]);

  const fetchAllDesignations = async () => {
    let listdesiginations = await getAllDesignations();
    setDesiginations(listdesiginations?.designations || []);
  };
  useEffect(() => {
    fetchAllDesignations();
  }, []);

  useEffect(() => {
    console.log(formData, "formData");
  }, [formData]);

  // File upload states for each section
  const [passportFile, setPassportFile] = useState(null);
  const [contractFile, setContractFile] = useState(null);
  const [visaFile, setVisaFile] = useState(null);
  const [licenseFile, setLicenseFile] = useState(null);

  // Add more for certificate/medical
  const handleAddCertificate = () => {
    setFormData({
      ...formData,
      certificationDetails: [
        ...formData.certificationDetails,
        {
          document: { url: "", originalName: "" },
          certification: "",
          certificateDescription: "",
        },
      ],
    });
  };
  const handleAddMedical = () => {
    setFormData({
      ...formData,
      medicalRecordDetails: [
        ...formData.medicalRecordDetails,
        {
          document: { url: "", originalName: "" },
          description: "",
          relationship: "",
        },
      ],
    });
  };

  // Generic input change handler
  const handleInputChange = (e, section, idx, field) => {
    const { name, value } = e.target;
    if (section) {
      const updatedSection = [...formData[section]];
      updatedSection[idx][field || name] = value;
      setFormData({ ...formData, [section]: updatedSection });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // File upload handler
  const handleFileChange = (e, section, idx) => {
    const file = e.target.files[0];
    if (section) {
      const updatedSection = [...formData[section]];
      updatedSection[idx].document = {
        url: URL.createObjectURL(file),
        originalName: file.name,
      };
      setFormData({ ...formData, [section]: updatedSection });
    } else {
      // For single file sections
      if (section === "passportDetails") setPassportFile(file);
      if (section === "contractDetails") setContractFile(file);
      if (section === "visaDetails") setVisaFile(file);
      if (section === "licenseDetails") setLicenseFile(file);
    }
  };

  // Update button handler
  const handleUpdate = async () => {
    console.log("Payload:", formData);
    let payload = { ...formData, employeeId: loginResponse?.data?._id };

    const response = await editEmployeeProfile(payload);
    console.log("Update Response:", response);
    if (response?.status == true) {
      setIsLoading(false);
      setMessage("Profile details updated successfully!");
      setOpenPopUp(true);
      fetchProfileDetails();
    } else {
      setIsLoading(false);
      setMessage("Failed to update Profile details. Please try again.");
      setOpenPopUp(true);
      fetchProfileDetails();
    }
  };

  const handleToggle = () => setIsEditMode((prev) => !prev);
  const BASE_URL = `${process.env.REACT_APP_ASSET_URL}`;

  const handleView = (url) => {
    console.log("Viewing file at URL:", `${BASE_URL}${url}`);
    window.open(`${BASE_URL}${url}`, "_blank");
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ borderRadius: 2 }}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              {/* Header */}
              <Box sx={{ mb: 4, textAlign: "center" }}>
                <Typography
                  variant="h4"
                  component="h1"
                  gutterBottom
                  sx={{ fontWeight: 600 }}
                >
                  My Profile
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {isEditMode
                    ? "Edit your profile information"
                    : "View your profile details"}
                </Typography>
              </Box>

              {/* Toggle Button */}
              <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
                <Button
                  variant={isEditMode ? "outlined" : "contained"}
                  size="large"
                  onClick={handleToggle}
                  sx={{ px: 4 }}
                >
                  {isEditMode ? "Cancel Edit" : "Edit Profile"}
                </Button>
              </Box>

              {/* Content */}
              {!isEditMode ? (
                <ViewProfile
                  formData={formData}
                  desiginationlist={desiginationlist}
                  handleView={handleView}
                  BASE_URL={BASE_URL}
                />
              ) : (
                <EditProfile
                  formData={formData}
                  setFormData={setFormData}
                  desiginationlist={desiginationlist}
                  handleInputChange={handleInputChange}
                  handleFileChange={handleFileChange}
                  handleView={handleView}
                  handleUpdate={handleUpdate}
                  handleAddCertificate={handleAddCertificate}
                  handleAddMedical={handleAddMedical}
                  handleDeleteCertificate={handleDeleteCertificate}
                  handleDeleteMedical={handleDeleteMedical}
                />
              )}
            </CardContent>
          </Card>
        </Paper>
      </Box>

      {/* PopUp and Loader */}
      {openPopUp && (
        <PopUp message={message} closePopup={() => setOpenPopUp(false)} />
      )}
      <Loader isLoading={isLoading} />
    </Container>
  );
};

export default Profile;
