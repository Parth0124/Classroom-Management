import axios from 'axios';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
};

export const getAllStudents = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/student/allstudents`,
      {
        headers: getAuthHeader(),
      }
    );
    return response.data.students; 
  } catch (error) {
    console.error('Error fetching students:', error);
    throw new Error('Failed to fetch students');
  }
};

export const getAllClassrooms = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/student/allclassrooms`,
      {
        headers: getAuthHeader(),
      }
    );
    return response.data.classrooms;
  } catch (error) {
    console.error('Error fetching classrooms:', error);
    throw new Error('Failed to fetch classrooms');
  }
};
