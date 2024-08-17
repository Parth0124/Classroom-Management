const Classroom = require('../models/Classroom');
const User = require('../models/User');

exports.createClassroom = async (req, res) => {
    const { name, startTime, endTime, days } = req.body;

    try {
        const classroom = new Classroom({ name, startTime, endTime, days });
        await classroom.save();
        res.status(201).json(classroom);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create classroom', error });
    }
};

exports.getClassrooms = async (req, res) => {
    try {
        const classrooms = await Classroom.find();
        res.status(200).json(classrooms);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve classrooms', error });
    }
};

exports.updateClassroom = async (req, res) => {
    const { classroomId } = req.params;
    const { name, startTime, endTime, days } = req.body;

    try {
        const classroom = await Classroom.findByIdAndUpdate(
            classroomId,
            { name, startTime, endTime, days },
            { new: true }
        );

        if (!classroom) {
            return res.status(404).json({ message: 'Classroom not found' });
        }

        res.status(200).json(classroom);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update classroom', error });
    }
};

exports.deleteClassroom = async (req, res) => {
    const { classroomId } = req.params;

    try {
        const classroom = await Classroom.findByIdAndDelete(classroomId);

        if (!classroom) {
            return res.status(404).json({ message: 'Classroom not found' });
        }

        res.status(200).json({ message: 'Classroom deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete classroom', error });
    }
};
