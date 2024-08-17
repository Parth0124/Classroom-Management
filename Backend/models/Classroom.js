const mongoose = require('mongoose');

const ClassroomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    days: {
        type: String,
        required: true,
    },
    assignedTeacher: {
        type: String,
        ref: 'User',
        default: null, 
    }
});

module.exports = mongoose.model('Classroom', ClassroomSchema);
