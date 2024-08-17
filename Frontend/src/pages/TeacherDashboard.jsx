import React, { useState, useEffect } from 'react';
import { Layout, Table, Button, Modal, Form, Input, message, Typography } from 'antd';
import { getStudentsInClassroom, updateStudent, deleteStudent, createStudent, getAssignedClassroom } from '../api/teacher';
import AppHeader from '../components/common/Header';

const { Content } = Layout;
const { Title } = Typography;

const TeacherDashboard = () => {
    const [students, setStudents] = useState([]);
    const [classroom, setClassroom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [action, setAction] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        fetchStudentsAndClassroom();
    }, []);

    const fetchStudentsAndClassroom = async () => {
        setLoading(true);
        try {
            const studentsData = await getStudentsInClassroom();
            setStudents(studentsData.students);
            const classroomData = await getAssignedClassroom();
            setClassroom(classroomData);
        } catch (error) {
            message.error('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleModalOpen = (actionType, student) => {
        setAction(actionType);
        if (student) {
            setSelectedStudent(student);
            form.setFieldsValue(student);
        } else {
            setSelectedStudent(null);
            form.resetFields();
        }
        setIsModalVisible(true);
    };

    const handleModalOk = async () => {
        try {
            if (action === 'UpdateStudent') {
                await updateStudent({ ...form.getFieldsValue(), _id: selectedStudent._id });
            } else if (action === 'DeleteStudent') {
                await deleteStudent(selectedStudent._id);
            } else if (action === 'CreateStudent') {
                await createStudent(form.getFieldsValue());
            }
            fetchStudentsAndClassroom();
            setIsModalVisible(false);
            message.success(`${action.replace(/([A-Z])/g, ' $1')} successful`);
        } catch (error) {
            message.error(`Failed to ${action.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        }
    };

    const handleDelete = (student) => {
        setSelectedStudent(student);
        handleModalOpen('DeleteStudent', student);
    };

    return (
      <Layout>
        <AppHeader />
        <Content style={{ padding: "20px" }}>
          <h1>Teacher Dashboard</h1>
          <Button
            onClick={() => handleModalOpen("CreateStudent")}
            type="primary"
            style={{ marginBottom: "20px" }}
          >
            Create Student
          </Button>
          <Title level={3}>Students Records:</Title>
          <Table
            dataSource={students}
            columns={[
              { title: "Student Name", dataIndex: "name" },
              { title: "Student Email", dataIndex: "email" },
              {
                title: "Actions",
                render: (text, student) => (
                  <div>
                    <Button
                      onClick={() => handleModalOpen("UpdateStudent", student)}
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => handleDelete(student)}
                      danger
                      style={{ marginLeft: "10px" }}
                    >
                      Delete
                    </Button>
                  </div>
                ),
              },
            ]}
            loading={loading}
            rowKey="_id"
          />
          <Title level={3} style={{ marginTop: "20px" }}>
            Classroom Records/ Time-Table:
          </Title>
          <Table
            dataSource={classroom ? [classroom] : []}
            columns={[
              { title: "My Classroom Name", dataIndex: "name" },
              { title: "Start Time", dataIndex: "startTime" },
              { title: "End Time", dataIndex: "endTime" },
              { title: "Days", dataIndex: "days" },
            ]}
            loading={loading}
            rowKey="_id"
            style={{ marginTop: "20px" }}
          />
          <Modal
            title={action}
            visible={isModalVisible}
            onOk={handleModalOk}
            onCancel={() => setIsModalVisible(false)}
          >
            <Form form={form} layout="vertical">
              {(action === "UpdateStudent" || action === "CreateStudent") && (
                <>
                  <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: "Please input name!" }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, message: "Please input email!" }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      { required: true, message: "Please input password!" },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </>
              )}
            </Form>
          </Modal>
        </Content>
      </Layout>
    );
};

export default TeacherDashboard;
