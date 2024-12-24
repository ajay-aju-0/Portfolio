import React, { useEffect } from "react";
import { Tabs } from "antd";
import { useSelector } from "react-redux";
import AdminIntro from "./AdminIntro";
import AdminAbout from "./AdminAbout";
import Experiences from "./AdminExperiences";
import AdminProjects from "./AdminProjects";
import AdminCertificates from "./AdminCertificates";
import AdminContact from "./AdminContact";
import { useNavigate } from "react-router-dom";
import AdminUploadResume from "./AdminUploadResume";

const { items } = Tabs;

const Admin = () => {
  const { portfolioData } = useSelector((state) => state.root);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin-login", { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <div>
        <h1 className="text-2xl my-5 bg-primary text-white text-center">
          PORTFOLIO ADMIN
        </h1>
      </div>
      <div className="flex justify-end mr-3">
        <h1
            className="underline text-primary text-xl cursor-pointer"
            onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/admin-login";
            }}
            >
            Logout
        </h1>
      </div>

      {portfolioData && (
        <div className="mt-3 pl-5">
          <Tabs defaultActiveKey="1" onChange={onchange}>
            <items tab="Intro" key="1">
              <AdminIntro></AdminIntro>
            </items>
            <items tab="About" key="2">
              <AdminAbout></AdminAbout>
            </items>
            <items tab="Experience" key="3">
              <Experiences></Experiences>
            </items>
            <items tab="Projects" key="4">
              <AdminProjects></AdminProjects>
            </items>
            <items tab="Certificates" key="5">
              <AdminCertificates></AdminCertificates>
            </items>
            <items tab="Contact" key="6">
              <AdminContact></AdminContact>
            </items>
            <items tab="Resume" key="7">
              <AdminUploadResume></AdminUploadResume>
            </items>
          </Tabs>
        </div>
      )}
    </>
  );
};

export default Admin;
