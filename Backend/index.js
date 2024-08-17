const express = require('express');
const cors = require("cors")
const connectDB = require('./config/db');
const authRoutes = require('./routes/api/v1/auth');
const principalRoutes = require('./routes/api/v1/principal');
const teacherRoutes = require('./routes/api/v1/teacher');
const studentRoutes = require('./routes/api/v1/student');
const timetableRoutes = require('./routes/api/v1/timetableRoute');
const classroomRoutes = require('./routes/api/v1/classroomRoutes');

const app = express();

connectDB()
.then((result) => {
  console.log("Database successfully connected!")
})
.catch((error) => {
  console.log(error)
});

app.use(express.json());
app.use(cors())

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/principal', principalRoutes);
app.use('/api/v1/teacher', teacherRoutes);
app.use('/api/v1/student', studentRoutes);
app.use('/api/v1/timetable', timetableRoutes);
app.use('/api/v1/classroom', classroomRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
