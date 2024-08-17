const User = require('../models/User');
const Classroom = require('../models/Classroom');

exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "Student" }).select("-password");

    if (!students.length) {
      return res.status(404).json({ msg: 'No students found' });
    }

    res.json({ students });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getAllClassrooms = async (req, res) => {
  try {
    const classrooms = await Classroom.find();
    res.json({classrooms});
  } catch (error) {
    console.error('Error fetching classrooms:', error);
    res.status(500).json({ message: 'Failed to fetch classrooms' });
  }
};
