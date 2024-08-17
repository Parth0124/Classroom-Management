const express = require('express');
const router = express.Router();
const studentController = require('../../../controllers/studentController'); 

router.get('/allstudents', studentController.getAllStudents);
router.get('/allclassrooms', studentController.getAllClassrooms);

module.exports = router;
