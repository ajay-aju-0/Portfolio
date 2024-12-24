const router = require("express").Router();

const {
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
} = require("../controllers/portfolioControllers");

const multer = require('multer');
const fs = require('fs');
const path = require('path');


// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, "..",'uploads');

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
      }

       // Check if any PDFs exist and remove them
      fs.readdir(uploadPath, (err, files) => {
          if (err) {
          console.error('Error reading directory:', err);
          return cb(err);
        }

      // Filter only PDFs and delete them
      files.filter(f => f.endsWith('.pdf')).forEach(f => {
          const filePath = path.join(uploadPath, f);
          fs.unlinkSync(filePath); // Remove the file
        //   console.log('Deleted existing file:', filePath);
      });
      });

      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
const upload = multer({ storage });

router.get("/get-portfolio-data", getPortfolioData);

router.post("/update-intro", updateIntro);

router.post("/update-about", updateAbout);

router.post("/add-experience", addExperience);

router.post("/update-experience", updateExperience);

router.post("/delete-experience", deleteExperience);

router.post("/add-project",addProject);

router.post("/update-project",updateProject);

router.post("/delete-Project",deleteProject);

router.post("/add-certificate",addCertificate);

router.post("/update-certificate",updateCertificate);

router.post("/delete-certificate",deleteCertificate);

router.post("/update-contact",updateContact);

router.post("/admin-login",adminLogin);

router.post('/upload', upload.single('file'), uploadFile);

router.get('/download', downloadFile);


module.exports = router;
