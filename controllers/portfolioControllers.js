import {
  Intro,
  About,
  Experience,
  Project,
  Certificate,
  Contact,
  Resume,
} from "../models/portfolioModel.js";

import User from "../models/userModel.js";

import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "projects" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};


const getPortfolioData = async (req, res) => {
  try {
    const intros = await Intro.find();
    const about = await About.find();
    const experience = await Experience.find();
    const project = await Project.find();
    const certificate = await Certificate.find();
    const contact = await Contact.find();

    res.status(200).send({
      intro: intros[0],
      about: about[0],
      experience: experience,
      project: project,
      certificate: certificate,
      contact: contact,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateIntro = async (req, res) => {
  try {
    const intro = await Intro.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: intro,
      success: true,
      message: "Intro Updated Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateAbout = async (req, res) => {
  try {
    const about = await About.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: about,
      success: true,
      message: "About Updated Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const addExperience = async (req, res) => {
  try {
    const experience = new Experience(req.body);
    await experience.save();
    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience Added Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience Updated Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findOneAndDelete({ _id: req.body._id });

    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience Deleted successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const addProject = async (req, res) => {
  try {
    let thumbnailImg = req.file;
    let thumbnail = "";

    if (thumbnailImg) {
      const result = await uploadToCloudinary(req.file.buffer);
      thumbnail = result.secure_url;
    }

    const project = new Project({
      ...req.body,
      thumbnail: thumbnail,
    });

    // const project = new Project(req.body);
    await project.save();
    res.status(200).send({
      data: project,
      success: true,
      message: "Project Added Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateProject = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
    };

    const projectId = req.body._id;

    let pro = await Project.findById(projectId);

    let thumbnail = "";

    if (req.file) {
        if (pro.thumbnail) {
            // Delete the existing image from Cloudinary
            const publicId = pro.thumbnail.split('/').pop().split('.')[0]; // Extract public ID from URL
            await cloudinary.uploader.destroy(publicId);
        }
         const uploadedResponse = await uploadToCloudinary(req.file.buffer);
        thumbnail = uploadedResponse.secure_url;
        updateData.thumbnail = thumbnail;
    }

    const project = await Project.findOneAndUpdate(
      { _id: req.body._id },
      updateData,
      { new: true }
    );
    res.status(200).send({
      data: project,
      success: true,
      message: "Project Updated Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.body._id });

    res.status(200).send({
      data: project,
      success: true,
      message: "Project Deleted successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const addCertificate = async (req, res) => {
  try {
    let thumbnailImg = req.file;
    let thumbnail = "";

    if (thumbnailImg) {
      const result = await uploadToCloudinary(req.file.buffer);
      thumbnail = result.secure_url;
    }

    const certificate = new Certificate({
      title: req.body.title,
      organisation: req.body.organisation,
      description: req.body.description,
      link: req.body.link,
    });

    await certificate.save();

    res.status(200).send({
      data: certificate,
      success: true,
      message: "Certificate Added Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateCertificate = async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      organisation: req.body.organisation,
      description: req.body.description,
      link: req.body.link,
    };

    const certificateId = req.body._id;

    let pro = await Project.findById(certificateId);

    let thumbnail = "";

    if (req.file) {
        if (pro.thumbnail) {
            // Delete the existing image from Cloudinary
            const publicId = pro.thumbnail.split('/').pop().split('.')[0]; // Extract public ID from URL
            await cloudinary.uploader.destroy(publicId);
        }
         const uploadedResponse = await uploadToCloudinary(req.file.buffer);
        thumbnail = uploadedResponse.secure_url;
        updateData.thumbnail = thumbnail;
    }

    const certificate = await Certificate.findOneAndUpdate(
      { _id: req.body._id },
      updateData,
      { new: true }
    );

    res.status(200).send({
      data: certificate,
      success: true,
      message: "Certificate Updated Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findOneAndDelete({
      _id: req.body._id,
    });

    res.status(200).send({
      data: certificate,
      success: true,
      message: "Certificate Deleted successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );

    res.status(200).send({
      data: contact,
      success: true,
      message: "Contact Updated Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const adminLogin = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (user) user.password = "";

    if (user) {
      res.status(200).send({
        data: user,
        success: true,
        message: "Login Successfull",
      });
    } else {
      res.status(200).send({
        data: user,
        success: false,
        message: "Invalid username or password",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const uploadFile = async (req, res) => {
  try {
    const newPDF = await Resume.findByIdAndUpdate(
      {
        _id: "6767fa57fe149e39ab9bb3b1",
      },
      {
        filename: req.file.filename,
        path: req.file.path,
      },
      {
        new: true,
      }
    );

    await newPDF.save();

    res.status(200).json({
      data: newPDF,
      success: true,
      message: "PDF uploaded successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const downloadFile = async (req, res) => {
  try {
    const file = await Resume.findById("6767fa57fe149e39ab9bb3b1");
    // console.log(file.filename)
    const filePath = path.resolve(__dirname, "..", "uploads", file.filename);
    // console.log(filePath)
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).send("File not found");
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${file.filename}`
    );
    res.download(filePath, file.filename, (err) => {
      if (err) {
        console.error("Error downloading file:", err);
        res.status(200).send({
          success: false,
          message: "File not found.",
        });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export {
  getPortfolioData,
  updateIntro,
  updateAbout,
  addExperience,
  updateExperience,
  deleteExperience,
  addProject,
  updateProject,
  deleteProject,
  addCertificate,
  updateCertificate,
  deleteCertificate,
  updateContact,
  adminLogin,
  uploadFile,
  downloadFile,
};
