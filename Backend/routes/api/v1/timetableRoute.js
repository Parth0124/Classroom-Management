const express = require('express');
const router = express.Router();
const timetableController = require('../../../controllers/timetableController');
const { authMiddleware } = require('../../../middlewares/middlewares');

router.use(authMiddleware);

router.post('/create', timetableController.createTimetable);
router.get('/:classroomId', timetableController.getTimetables);

module.exports = router;
