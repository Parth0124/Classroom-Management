// routes/api/v1/principal.js
const express = require('express');
const { authMiddleware, roleMiddleware } = require('../../../middlewares/middlewares');
const { getTeachersStudentsAndClassrooms, createTeacher, createStudent,updateStudent, createClassroom, assignTeacherToClassroom } = require('../../../controllers/principalController');
const {  deleteStudent } = require('../../../controllers/teacherController'); 
const router = express.Router();

router.get('/data', authMiddleware, roleMiddleware('Principal'), getTeachersStudentsAndClassrooms);
router.post('/teacher', authMiddleware, roleMiddleware('Principal'), createTeacher);
router.post('/student', authMiddleware, roleMiddleware('Principal'), createStudent);
router.post('/classroom', authMiddleware, roleMiddleware('Principal'), createClassroom);
router.post('/assign-teacher', authMiddleware, roleMiddleware('Principal'), assignTeacherToClassroom);
router.put('/update-student/:id', authMiddleware, roleMiddleware('Principal'), updateStudent);
router.delete('/delete-student/:studentId', deleteStudent);

module.exports = router;

