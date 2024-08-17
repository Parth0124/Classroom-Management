const express = require('express');
const router = express.Router();
const classroomController = require('../../../controllers/classroomController');
const { authMiddleware } = require('../../../middlewares/middlewares');

router.use(authMiddleware);

router.post('/create', classroomController.createClassroom);
router.get('/', classroomController.getClassrooms);
router.put('/update/:classroomId', classroomController.updateClassroom);
router.delete('/delete/:classroomId', classroomController.deleteClassroom);

module.exports = router;
