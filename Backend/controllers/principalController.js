const User = require('../models/User');
const Classroom = require('../models/Classroom');

exports.getTeachersStudentsAndClassrooms = async (req, res) => {
    try {
        const teachers = await User.find({ role: 'Teacher' }).select('-password');
        const students = await User.find({ role: 'Student' }).select('-password');
        const classrooms = await Classroom.find();

        res.json({ teachers, students, classrooms });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.createTeacher = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'Teacher already exists' });
        }
        user = new User({
            name,
            email,
            password,
            role: 'Teacher'
        });

        await user.save();
        res.json({ msg: 'Teacher created successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Create a new student
exports.createStudent = async (req, res) => {
    const { name,email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'Student already exists' });
        }
        user = new User({
            name,
            email,
            password,
            role: 'Student'
        });

        await user.save();
        res.json({ msg: 'Student created successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Create a new classroom
exports.createClassroom = async (req, res) => {
    const { name, startTime, endTime, days } = req.body;
    try {
        const classroom = new Classroom({
            name,
            startTime,
            endTime,
            days
        });

        await classroom.save();
        res.json({ msg: 'Classroom created successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Assign a teacher to a classroom
exports.assignTeacherToClassroom = async (req, res) => {
    const { teacherName, classroomName } = req.body;
    try {
        const teacher = await User.findOne({ name: teacherName });
        if (!teacher || teacher.role !== 'Teacher') {
            return res.status(400).json({ msg: 'Teacher not found' });
        }

        const classroom = await Classroom.findOne({ name: classroomName });
        if (!classroom) {
            return res.status(400).json({ msg: 'Classroom not found' });
        }

        classroom.assignedTeacher = teacherName;
        await classroom.save();

        res.json({ msg: 'Teacher assigned to classroom successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update student information
exports.updateStudent = async (req, res) => {
    try {
        const { id } = req.params;  
        const updatedData = req.body;

        const student = await User.findByIdAndUpdate(id, updatedData, { new: true });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json({
            message: 'Student updated successfully',
            student,
        });
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ message: 'Failed to update student' });
    }
};


exports.deleteStudent = async (req, res) => {
  const { studentId } = req.params;

  try {
      const deletedStudent = await User.findByIdAndDelete(studentId);

      if (!deletedStudent) {
          return res.status(404).json({ message: 'Student not found' });
      }

      res.json({ message: 'Student deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Error deleting student', error });
  }
};
