import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Chip,
  Divider,
  Paper,
  IconButton,
  Button,
} from "@mui/material";
import {
  Person,
  Work,
  FlightTakeoff,
  Description,
  Assignment,
  CardMembership,
  LocalHospital,
  Visibility,
  ContactMail,
  Phone,
  LocationOn,
  Download,
} from "@mui/icons-material";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ViewProfile = ({ formData, desiginationlist, handleView, BASE_URL }) => {
  /**
   * Excel export function - Exports all profile information to an Excel file
   * Features:
   * - Comprehensive data export including all sections
   * - Professional formatting with proper column widths
   * - Styled headers and sections
   * - No text wrapping for clean display
   * - Descriptive filename with employee name and date
   */
  const handleExportToExcel = () => {
    try {
      // Create workbook
      const workbook = XLSX.utils.book_new();

      // Personal Information Sheet
      const personalData = [
        ["Personal Information", ""],
        ["First Name", formData.employeeName || ""],
        ["Last Name", formData.employeeLastName || ""],
        ["Date of Birth", formData.dob || ""],
        ["Address", formData.address || ""],
        ["City", formData.city || ""],
        ["State", formData.state || ""],
        ["Post Code", formData.postcode || ""],
        ["Nationality", formData.nationality || ""],
        ["Contact Number", formData.contactNumber || ""],
        ["Email ID", formData.email || ""],
        ["Passport Number", formData.passportNumber || ""],
        ["Civil ID", formData.iqamaNumber || ""],
        ["", ""],
        ["Official Information", ""],
        ["Date of Joining", formData.dateOfJoining || ""],
        [
          "Designation",
          desiginationlist.find((d) => d._id === formData.designation)
            ?.designationName || "",
        ],
        ["Official Email ID", formData.officialEmail || ""],
        ["Profession Title", formData.profession || ""],
      ];

      // Passport Details
      if (formData.passportDetails?.length > 0) {
        personalData.push(["", ""]);
        personalData.push(["Passport Details", ""]);
        formData.passportDetails.forEach((item, idx) => {
          personalData.push([
            `Passport ${idx + 1} - Number`,
            item.passportNumber || "",
          ]);
          personalData.push([
            `Passport ${idx + 1} - Expiry Date`,
            item.dateOfExpiry || "",
          ]);
          personalData.push([
            `Passport ${idx + 1} - Document`,
            item.document?.originalName || "No document",
          ]);
        });
      }

      // Contract Details
      if (formData.contractDetails?.length > 0) {
        personalData.push(["", ""]);
        personalData.push(["Contract Details", ""]);
        formData.contractDetails.forEach((item, idx) => {
          personalData.push([
            `Contract ${idx + 1} - Name`,
            item.contractName || "",
          ]);
          personalData.push([
            `Contract ${idx + 1} - Expiry Date`,
            item.dateOfExpiry || "",
          ]);
          personalData.push([
            `Contract ${idx + 1} - Document`,
            item.document?.originalName || "No document",
          ]);
        });
      }

      // Visa Details
      if (formData.visaDetails?.length > 0) {
        personalData.push(["", ""]);
        personalData.push(["Visa Details", ""]);
        formData.visaDetails.forEach((item, idx) => {
          personalData.push([
            `Visa ${idx + 1} - Number`,
            item.visaNumber || "",
          ]);
          personalData.push([
            `Visa ${idx + 1} - Expiry Date`,
            item.dateOfExpiry || "",
          ]);
          personalData.push([
            `Visa ${idx + 1} - Document`,
            item.document?.originalName || "No document",
          ]);
        });
      }

      // License Details
      if (formData.licenseDetails?.length > 0) {
        personalData.push(["", ""]);
        personalData.push(["License Details", ""]);
        formData.licenseDetails.forEach((item, idx) => {
          personalData.push([
            `License ${idx + 1} - Number`,
            item.licenseNumber || "",
          ]);
          personalData.push([
            `License ${idx + 1} - Expiry Date`,
            item.dateOfExpiry || "",
          ]);
          personalData.push([
            `License ${idx + 1} - Document`,
            item.document?.originalName || "No document",
          ]);
        });
      }

      // Certificate Details
      if (formData.certificationDetails?.length > 0) {
        personalData.push(["", ""]);
        personalData.push(["Certificate Details", ""]);
        formData.certificationDetails.forEach((item, idx) => {
          personalData.push([
            `Certificate ${idx + 1} - Name`,
            item.certification || "",
          ]);
          personalData.push([
            `Certificate ${idx + 1} - Description`,
            item.certificateDescription || "",
          ]);
          personalData.push([
            `Certificate ${idx + 1} - Document`,
            item.document?.originalName || "No document",
          ]);
        });
      }

      // Medical Details
      if (formData.medicalRecordDetails?.length > 0) {
        personalData.push(["", ""]);
        personalData.push(["Medical Details", ""]);
        formData.medicalRecordDetails.forEach((item, idx) => {
          personalData.push([
            `Medical Record ${idx + 1} - Description`,
            item.description || "",
          ]);
          personalData.push([
            `Medical Record ${idx + 1} - Relationship`,
            item.relationship || "",
          ]);
          personalData.push([
            `Medical Record ${idx + 1} - Document`,
            item.document?.originalName || "No document",
          ]);
        });
      }

      // Create worksheet
      const worksheet = XLSX.utils.aoa_to_sheet(personalData);

      // Set column widths for better formatting - no wrapping
      const columnWidths = [
        { wch: 35 }, // Column A - Labels (wider for longer labels)
        { wch: 50 }, // Column B - Values (wider to prevent wrapping)
      ];
      worksheet["!cols"] = columnWidths;

      // Style the headers (section titles) and make cells not wrap
      const headerStyle = {
        font: { bold: true, size: 14, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "4F81BD" } },
        alignment: { horizontal: "left", vertical: "center", wrapText: false },
      };

      const labelStyle = {
        font: { bold: true, size: 11 },
        fill: { fgColor: { rgb: "E7E6E6" } },
        alignment: { horizontal: "left", vertical: "center", wrapText: false },
      };

      const valueStyle = {
        font: { size: 11 },
        alignment: { horizontal: "left", vertical: "center", wrapText: false },
      };

      // Apply styles to all cells
      personalData.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          const cellRef = XLSX.utils.encode_cell({ r: rowIndex, c: colIndex });
          if (!worksheet[cellRef]) worksheet[cellRef] = {};

          // Apply different styles based on content
          if (
            colIndex === 0 &&
            cell &&
            (cell.includes("Information") ||
              cell.includes("Details") ||
              cell === "Personal Information" ||
              cell === "Official Information")
          ) {
            worksheet[cellRef].s = headerStyle;
          } else if (colIndex === 0 && cell && cell !== "") {
            worksheet[cellRef].s = labelStyle;
          } else {
            worksheet[cellRef].s = valueStyle;
          }
        });
      });

      // Set row heights to prevent text cutting
      const rowHeights = personalData.map(() => ({ hpt: 20 }));
      worksheet["!rows"] = rowHeights;

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Profile Information");

      // Generate Excel file
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
        cellStyles: true,
      });

      // Create blob and download
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const currentDate = new Date().toISOString().split("T")[0];
      const employeeName = (formData.employeeName || "Employee").replace(
        /[^a-zA-Z0-9]/g,
        "_"
      );
      const fileName = `${employeeName}_Complete_Profile_${currentDate}.xlsx`;

      saveAs(blob, fileName);

      // Show success message (you can customize this based on your notification system)
      console.log(`Excel file exported successfully: ${fileName}`);
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      alert("Error exporting to Excel. Please try again.");
    }
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

  const InfoCard = ({ title, icon, children }) => (
    <Card sx={{ mb: 3, boxShadow: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          {icon}
          <Typography variant="h6" sx={{ ml: 1, fontWeight: "bold" }}>
            {title}
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        {children}
      </CardContent>
    </Card>
  );

  const InfoRow = ({ label, value, xs = 6 }) => (
    <Grid item xs={12} sm={xs}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {label}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {value || "Not provided"}
        </Typography>
      </Box>
    </Grid>
  );

  const DocumentDisplay = ({ document }) => {
    if (!document?.url)
      return <Typography variant="body2">No file uploaded</Typography>;

    return (
      <Paper
        sx={{
          p: 1,
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
          onClick={() => handleView(document.url)}
          title="View Document"
        >
          <Visibility />
        </IconButton>
      </Paper>
    );
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Download Excel Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<Download />}
          onClick={handleExportToExcel}
          sx={{
            bgcolor: "#2e7d32",
            "&:hover": {
              bgcolor: "#1b5e20",
            },
            px: 3,
            py: 1,
            borderRadius: 2,
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 600,
          }}
        >
          Download Excel
        </Button>
      </Box>

      {/* Personal Information */}
      <InfoCard title="Personal Information" icon={getSectionIcon("personal")}>
        <Grid container spacing={2}>
          <InfoRow label="First Name" value={formData.employeeName} />
          <InfoRow label="Last Name" value={formData.employeeLastName} />
          <InfoRow label="Date of Birth" value={formData.dob} />
          <InfoRow label="Address" value={formData.address} xs={12} />
          <InfoRow label="City" value={formData.city} />
          <InfoRow label="State" value={formData.state} />
          <InfoRow label="Post Code" value={formData.postcode} />
          <InfoRow label="Nationality" value={formData.nationality} />
          <InfoRow label="Contact Number" value={formData.contactNumber} />
          <InfoRow label="Email ID" value={formData.email} />
          <InfoRow label="Passport Number" value={formData.passportNumber} />
          <InfoRow label="Civil ID" value={formData.iqamaNumber} />
        </Grid>
      </InfoCard>

      {/* Official Information */}
      <InfoCard title="Official Information" icon={getSectionIcon("official")}>
        <Grid container spacing={2}>
          <InfoRow label="Date of Joining" value={formData.dateOfJoining} />
          <InfoRow
            label="Designation"
            value={
              desiginationlist.find((d) => d._id === formData.designation)
                ?.designationName || ""
            }
          />
          <InfoRow label="Official Email ID" value={formData.officialEmail} />
          <InfoRow label="Profession Title" value={formData.profession} />
        </Grid>
      </InfoCard>

      {/* Passport Details */}
      {formData.passportDetails?.length > 0 &&
        formData.passportDetails.map((item, idx) => (
          <InfoCard
            key={`passport-${idx}`}
            title={`Passport Details ${
              formData.passportDetails.length > 1 ? `#${idx + 1}` : ""
            }`}
            icon={getSectionIcon("passport")}
          >
            <Grid container spacing={2}>
              <InfoRow label="Passport Number" value={item.passportNumber} />
              <InfoRow label="Date of Expiry" value={item.dateOfExpiry} />
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Uploaded Document
                </Typography>
                <DocumentDisplay document={item.document} />
              </Grid>
            </Grid>
          </InfoCard>
        ))}

      {/* Contract Details */}
      {formData.contractDetails?.length > 0 &&
        formData.contractDetails.map((item, idx) => (
          <InfoCard
            key={`contract-${idx}`}
            title={`Contract Details ${
              formData.contractDetails.length > 1 ? `#${idx + 1}` : ""
            }`}
            icon={getSectionIcon("contract")}
          >
            <Grid container spacing={2}>
              <InfoRow label="Contract Name" value={item.contractName} />
              <InfoRow label="Date of Expiry" value={item.dateOfExpiry} />
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Uploaded Document
                </Typography>
                <DocumentDisplay document={item.document} />
              </Grid>
            </Grid>
          </InfoCard>
        ))}

      {/* Visa Details */}
      {formData.visaDetails?.length > 0 &&
        formData.visaDetails.map((item, idx) => (
          <InfoCard
            key={`visa-${idx}`}
            title={`Visa Details ${
              formData.visaDetails.length > 1 ? `#${idx + 1}` : ""
            }`}
            icon={getSectionIcon("visa")}
          >
            <Grid container spacing={2}>
              <InfoRow label="Visa Number" value={item.visaNumber} />
              <InfoRow label="Date of Expiry" value={item.dateOfExpiry} />
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Uploaded Document
                </Typography>
                <DocumentDisplay document={item.document} />
              </Grid>
            </Grid>
          </InfoCard>
        ))}

      {/* License Details */}
      {formData.licenseDetails?.length > 0 &&
        formData.licenseDetails.map((item, idx) => (
          <InfoCard
            key={`license-${idx}`}
            title={`License Details ${
              formData.licenseDetails.length > 1 ? `#${idx + 1}` : ""
            }`}
            icon={getSectionIcon("license")}
          >
            <Grid container spacing={2}>
              <InfoRow label="License Number" value={item.licenseNumber} />
              <InfoRow label="Date of Expiry" value={item.dateOfExpiry} />
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Uploaded Document
                </Typography>
                <DocumentDisplay document={item.document} />
              </Grid>
            </Grid>
          </InfoCard>
        ))}

      {/* Certificate Details */}
      {formData.certificationDetails?.length > 0 && (
        <InfoCard
          title="Certificate Details"
          icon={getSectionIcon("certificate")}
        >
          {formData.certificationDetails.map((item, idx) => (
            <Box
              key={`cert-${idx}`}
              sx={{
                mb: idx < formData.certificationDetails.length - 1 ? 3 : 0,
              }}
            >
              {idx > 0 && <Divider sx={{ mb: 2 }} />}
              <Grid container spacing={2}>
                <InfoRow label="Certificate Name" value={item.certification} />
                <InfoRow
                  label="Certificate Description"
                  value={item.certificateDescription}
                />
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Uploaded Document
                  </Typography>
                  <DocumentDisplay document={item.document} />
                </Grid>
              </Grid>
            </Box>
          ))}
        </InfoCard>
      )}

      {/* Medical Details */}
      {formData.medicalRecordDetails?.length > 0 && (
        <InfoCard title="Medical Details" icon={getSectionIcon("medical")}>
          {formData.medicalRecordDetails.map((item, idx) => (
            <Box
              key={`medical-${idx}`}
              sx={{
                mb: idx < formData.medicalRecordDetails.length - 1 ? 3 : 0,
              }}
            >
              {idx > 0 && <Divider sx={{ mb: 2 }} />}
              <Grid container spacing={2}>
                <InfoRow label="Description" value={item.description} />
                <InfoRow label="Relationship" value={item.relationship} />
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Uploaded Document
                  </Typography>
                  <DocumentDisplay document={item.document} />
                </Grid>
              </Grid>
            </Box>
          ))}
        </InfoCard>
      )}
    </Box>
  );
};

export default ViewProfile;
