const Timetable = require('../models/Timetable');
const Classroom = require('../models/Classroom');
const User = require('../models/User');

// Create a new timetable
exports.createTimetable = async (req, res) => {
    const { classroomId, subject, day, startTime, endTime, teacherId } = req.body;

    try {
        const timetable = new Timetable({
            classroomId,
            subject,
            day,
            startTime,
            endTime,
            teacherId,
        });

        await timetable.save();
        res.status(201).json(timetable);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create timetable', error });
    }
};

// Get timetables for a classroom
exports.getTimetables = async (req, res) => {
    const { classroomId } = req.params;

    try {
        const timetables = await Timetable.find({ classroomId }).populate('teacherId', 'email');
        res.status(200).json(timetables);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve timetables', error });
    }
};
