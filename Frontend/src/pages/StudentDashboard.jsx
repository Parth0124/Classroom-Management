// pages/StudentDashboard.js
import React, { useState, useEffect } from 'react';
import { Layout, Table, message, Typography} from 'antd';
import { getAllStudents, getAllClassrooms } from '../api/student';
import AppHeader from '../components/common/Header';

const { Content } = Layout;
const { Title } = Typography;

const StudentDashboard = () => {
    const [students, setStudents] = useState([]);
    const [classrooms, setClassrooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [studentsData, classroomsData] = await Promise.all([
                getAllStudents(),
                getAllClassrooms(),
            ]);
            setStudents(studentsData);
            setClassrooms(classroomsData);
        } catch (error) {
            message.error('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <AppHeader />
            <Content style={{ padding: '20px' }}>
                <h1>Student Dashboard</h1>

                <Title level={3}>Students Records:</Title>
                <Table
                    dataSource={students}
                    columns={[
                        { title: 'Student Name', dataIndex: 'name' },
                        { title: 'Student Email', dataIndex: 'email' },
                    ]}
                    loading={loading}
                    rowKey="_id"
                />
                <Title level={3} style={{ marginTop: '20px' }}>Classroom Records/ Time-Table:</Title>
                <Table
                    dataSource={classrooms}
                    columns={[
                        { title: 'Classroom Name', dataIndex: 'name' },
                        { title: 'Start Time', dataIndex: 'startTime' },
                        { title: 'End Time', dataIndex: 'endTime' },
                        { title: 'Days', dataIndex: 'days' }
                    ]}
                    loading={loading}
                    rowKey="_id"
                    style={{ marginTop: '20px' }}
                />
            </Content>
        </Layout>
    );
};

export default StudentDashboard;
