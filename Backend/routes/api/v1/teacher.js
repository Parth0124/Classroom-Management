const express = require('express');
const router = express.Router();
const { authMiddleware, roleMiddleware } = require('../../../middlewares/middlewares');
const { getAssignedClassroom, getAllStudents, updateStudent, deleteStudent,createStudent } = require('../../../controllers/teacherController');

router.get('/assigned-classroom', authMiddleware, roleMiddleware('Teacher'), getAssignedClassroom);
router.get('/all-students', authMiddleware, roleMiddleware('Teacher'), getAllStudents);
router.put('/update-student', authMiddleware, roleMiddleware('Teacher'), updateStudent);
router.delete('/delete-student/:studentId', authMiddleware, roleMiddleware('Teacher'), deleteStudent);
router.post('/create-student', authMiddleware, roleMiddleware('Teacher'), createStudent);

module.exports = router;
