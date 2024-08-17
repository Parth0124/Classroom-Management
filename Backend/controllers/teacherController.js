const Classroom = require('../models/Classroom');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getAssignedClassroom = async (req, res) => {
    try {
        const teacherId = req.userId; 

        const classroom = await Classroom.findById({ assignedTeacher: teacherId });

        if (!classroom) {
            return res.status(404).json({ msg: 'No classroom assigned to this teacher' });
        }

        res.json(classroom);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getAllStudents = async (req, res) => {
    try {
        const students = await User.find({ role: 'Student' }, 'email');

        if (!students.length) {
            return res.status(404).json({ msg: 'No students found' });
        }

        res.json({ students });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update student details
exports.updateStudent = async (req, res) => {
    try {
        const { _id, name,email, password } = req.body;
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

        const updatedStudent = await User.findByIdAndUpdate(_id, name,{ email, ...(hashedPassword && { password: hashedPassword }) }, { new: true });

        if (!updatedStudent) {
            return res.status(404).json({ msg: 'Student not found' });
        }

        res.json(updatedStudent);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        const { studentId } = req.params;

        const deletedStudent = await User.findByIdAndDelete(studentId);

        if (!deletedStudent) {
            return res.status(404).json({ msg: 'Student not found' });
        }

        res.json({ msg: 'Student deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Create a new student
exports.createStudent = async (req, res) => {
    try {
        const { name,email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const newStudent = new User({
            name,
            email,
            password: hashedPassword,
            role: 'Student',
        });

        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
