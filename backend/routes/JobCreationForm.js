const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const router = express.Router();
app.use(cors());
app.use(bodyParser.json());


// Create a job
router.post('/jobs', (req, res) => {
  const {
    jobTitle, jobDescription, department, jobLocation, employmentType,
    salaryMin, salaryMax, applicationDeadline, requiredQualifications,
    preferredQualifications, responsibilities, status
  } = req.body;

  const sql = `INSERT INTO jobs 
  (job_title, job_description, department, job_location, employment_type, salary_min, salary_max, application_deadline, 
  required_qualifications, preferred_qualifications, responsibilities, status) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [
    jobTitle, jobDescription, department, jobLocation, employmentType, 
    salaryMin, salaryMax, applicationDeadline, requiredQualifications, 
    preferredQualifications, responsibilities, status
  ], (err, result) => {
    if (err) {
      res.status(500).send('Error saving the job');
    } else {
      res.send({ message: 'Job saved successfully!' });
    }
  });
});

module.exports = router;