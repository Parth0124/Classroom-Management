import axios from 'axios';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
};

export const getStudentsInClassroom = async () => {
    try {
        const response = await axios.get('http://localhost:4000/api/v1/teacher/all-students', {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching students:', error);
        throw new Error('Failed to load students');
    }
};

export const updateStudent = async (studentData) => {
    try {
        const response = await axios.put('http://localhost:4000/api/v1/teacher/update-student', studentData, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        console.error('Error updating student:', error);
        throw new Error('Failed to update student');
    }
};

export const deleteStudent = async (studentId) => {
    try {
        const response = await axios.delete(`http://localhost:4000/api/v1/teacher/delete-student/${studentId}`, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting student:', error);
        throw new Error('Failed to delete student');
    }
};


export const createStudent = async (studentData) => {
    try {
        const response = await axios.post('http://localhost:4000/api/v1/teacher/create-student', studentData, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        console.error('Error creating student:', error);
        throw new Error('Failed to create student');
    }
};

// API to get the assigned classroom
export const getAssignedClassroom = async () => {
    try {
        const response = await axios.get('http://localhost:4000/api/v1/teacher/assigned-classroom', {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching assigned classroom:', error);
        throw new Error('Failed to load assigned classroom');
    }
};
