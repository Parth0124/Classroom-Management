import axios from 'axios';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
};

export const getTeachersStudentsAndClassrooms = async () => {
    try {
        const response = await axios.get('http://localhost:4000/api/v1/principal/data', {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching teachers and students:', error);
        throw new Error('Failed to load data');
    }
};

export const createTeacher = async (teacherData) => {
    try {
        const response = await axios.post('http://localhost:4000/api/v1/principal/teacher', teacherData, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        console.error('Error creating teacher:', error);
        throw new Error('Failed to create teacher');
    }
};

export const createStudent = async (studentData) => {
    try {
        const response = await axios.post('http://localhost:4000/api/v1/principal/student', studentData, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        console.error('Error creating student:', error);
        throw new Error('Failed to create student');
    }
};

export const createClassroom = async (classroomData) => {
    try {
        const response = await axios.post('http://localhost:4000/api/v1/principal/classroom', classroomData, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        console.error('Error creating classroom:', error);
        throw new Error('Failed to create classroom');
    }
};

export const assignTeacherToClassroom = async (data) => {
    console.log(data)
    try {
        const response = await axios.post('http://localhost:4000/api/v1/principal/assign-teacher', data, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        console.error('Error assigning teacher to classroom:', error);
        throw new Error('Failed to assign teacher OR may be assigned to other Classroom');
    }
};

   

export const updateStudent = async (studentId, updatedData) => {
    try {
        const response = await axios.put(`http://localhost:4000/api/v1/principal/update-student/${studentId}`, updatedData, {
            headers: getAuthHeader(), 
        });
        return response.data;
    } catch (error) {
        console.error('Error updating student:', error);
        throw error;
    }
};



export const deleteStudent = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:4000/api/v1/principal/delete-student/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
