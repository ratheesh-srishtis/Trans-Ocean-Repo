import React, { useState, useEffect } from "react";
import "../css/mediasettings.css";
import { uploadCompanyMedia } from "../services/apiService";
import { getCompanyMedias } from "../services/apiService";
import Loader from "../pages/Loader";
import PopUp from "../pages/PopUp";
import { useMedia } from "../context/MediaContext";
const MediaSettings = () => {
  const currentLogo = require("../assets/images/LOGO.png");
  const pdfHeaderImage = require("../assets/images/transocean_new_header.jpg");
  const pdfFooterImage = require("../assets/images/transoceanfooter-1.jpg");
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const {
    logoPreview,
    headerPreview,
    footerPreview,
    mediaId,
    getMediaFiles,
    adminDepartmentLogo,
    financeDepartmentLogo,
    operationsDepartmentLogo,
    hrDepartmentLogo,
  } = useMedia();

  // Handlers for each image
  const handleFileChange = async (event, type) => {
    if (event.target.files && event.target.files.length > 0) {
      const formData = new FormData();
      // Append all selected files to FormData
      Array.from(event.target.files).forEach((file) => {
        console.log(file, "file");
        formData.append("file", file); // "files" is the expected key for your API
        formData.append("mediaId", mediaId);
        formData.append("mediaType", type);
      });
      try {
        const response = await uploadCompanyMedia(formData);
        console.log(response, "response_handleLogoChange");
        if (response?.status == true) {
          setMessage("Successfully uploaded image");
          setOpenPopUp(true);
          // after API upload success
          await getMediaFiles(); // 👈 refresh context immediately
        }
      } catch (error) {
        console.error("File upload error:", error);
      }
    }
  };

  return (
    <>
      <div className="container media-settings-container">
        <div className="row mb-4">
          <div className="col-12 text-center">
            <h6>Media Settings</h6>
          </div>
        </div>
        {/* Logo Upload Section */}
        <div className="row justify-content-center mb-4">
          <div className="col-md-4 col-lg-4 col-xl-4 col-12 d-flex justify-content-center">
            <div className="media-logo-preview">
              <h6>Logo Upload</h6>
              <img
                src={logoPreview}
                alt="Current Logo"
                className="media-logo-img mediathumbnail"
              />
              <label htmlFor="logo-upload" className="media-logo-edit">
                <i className="bi bi-pencil-square"></i>
              </label>
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(event) => {
                  handleFileChange(event, "logo");
                }}
              />
            </div>
          </div>
          <div className="col-md-4 col-lg-4 col-xl-4  col-12 d-flex justify-content-center">
            <div className="media-logo-preview">
              <h6>PDF Header Image Upload</h6>
              <img
                src={headerPreview}
                alt="PDF Header"
                className="media-logo-img"
              />
              <label htmlFor="header-upload" className="media-logo-edit">
                <i className="bi bi-pencil-square"></i>
              </label>
              <input
                id="header-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(event) => {
                  handleFileChange(event, "pdfHeader");
                }}
              />
            </div>
          </div>
          <div className="col-md-4 col-lg-4 col-xl-4  col-12 d-flex justify-content-center">
            <div className="media-logo-preview">
              <h6>PDF Footer Image Upload</h6>
              <img
                src={footerPreview}
                alt="PDF Footer"
                className="media-logo-img"
              />
              <label htmlFor="footer-upload" className="media-logo-edit">
                <i className="bi bi-pencil-square"></i>
              </label>
              <input
                id="footer-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(event) => {
                  handleFileChange(event, "pdfFooter");
                }}
              />
            </div>
          </div>
        </div>

        <div className="row justify-content-center my-4">
          <div className="col-md-4 col-lg-4 col-xl-4  col-12 d-flex justify-content-center">
            <div className="media-logo-preview">
              <h6>Admin Logo</h6>
              <img
                src={adminDepartmentLogo}
                alt="PDF Footer"
                className="media-logo-img"
              />
              <label htmlFor="admin-upload" className="media-logo-edit">
                <i className="bi bi-pencil-square"></i>
              </label>
              <input
                id="admin-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(event) => {
                  handleFileChange(event, "adminDepartmentLogo");
                }}
              />
            </div>
          </div>
          <div className="col-md-4 col-lg-4 col-xl-4  col-12 d-flex justify-content-center">
            <div className="media-logo-preview">
              <h6>Finance Logo</h6>
              <img
                src={financeDepartmentLogo}
                alt="PDF Footer"
                className="media-logo-img"
              />
              <label htmlFor="finance-upload" className="media-logo-edit">
                <i className="bi bi-pencil-square"></i>
              </label>
              <input
                id="finance-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(event) => {
                  handleFileChange(event, "financeDepartmentLogo");
                }}
              />
            </div>
          </div>
          <div className="col-md-4 col-lg-4 col-xl-4  col-12 d-flex justify-content-center">
            <div className="media-logo-preview">
              <h6>Operation Logo</h6>
              <img
                src={operationsDepartmentLogo}
                alt="PDF Footer"
                className="media-logo-img"
              />
              <label htmlFor="ops-upload" className="media-logo-edit">
                <i className="bi bi-pencil-square"></i>
              </label>
              <input
                id="ops-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(event) => {
                  handleFileChange(event, "operationsDepartmentLogo");
                }}
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-center mb-4">
          <div className="col-md-4 col-lg-4 col-xl-4  col-12 d-flex justify-content-center">
            <div className="media-logo-preview">
              <h6>HR Logo</h6>
              <img
                src={hrDepartmentLogo}
                alt="PDF Footer"
                className="media-logo-img"
              />
              <label htmlFor="hr-upload" className="media-logo-edit">
                <i className="bi bi-pencil-square"></i>
              </label>
              <input
                id="hr-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(event) => {
                  handleFileChange(event, "hrDepartmentLogo");
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <Loader isLoading={isLoading} />
      {openPopUp && (
        <PopUp message={message} closePopup={() => setOpenPopUp(false)} />
      )}{" "}
    </>
  );
};

export default MediaSettings;
