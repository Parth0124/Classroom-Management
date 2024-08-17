import React, { useState, useEffect } from 'react';
import { Layout, Table, Button, Modal, Form, Input, message, Popconfirm, Typography } from 'antd';
import { getTeachersStudentsAndClassrooms, createTeacher, createStudent, createClassroom, assignTeacherToClassroom, updateStudent, deleteStudent } from '../api/principal';
import AppHeader from '../components/common/Header';

const { Content } = Layout;
const { Title } = Typography;

const PrincipalDashboard = () => {
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [classrooms, setClassrooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [action, setAction] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await getTeachersStudentsAndClassrooms();
            setTeachers(data.teachers);
            setStudents(data.students);
            setClassrooms(data.classrooms);
        } catch (error) {
            message.error('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleModalOpen = (actionType, student = null) => {
        setAction(actionType);
        setSelectedStudent(student);
        if (student) {
            form.setFieldsValue(student);
        } else {
            form.resetFields();
        }
        setIsModalVisible(true);
    };

    const handleModalOk = async () => {
        try {
            if (action === 'CreateTeacher') {
                await createTeacher(form.getFieldsValue());
            } else if (action === 'CreateStudent') {
                await createStudent(form.getFieldsValue());
            } else if (action === 'CreateClassroom') {
                await createClassroom(form.getFieldsValue());
            } else if (action === 'AssignTeacher') {
                await assignTeacherToClassroom(form.getFieldsValue());
            } else if (action === 'UpdateStudent') {
                await updateStudent(selectedStudent._id, form.getFieldsValue());  // Pass student ID and updated data
            }
            fetchData();
            setIsModalVisible(false);
            message.success(`${action.replace(/([A-Z])/g, ' $1')} successful`);
        } catch (error) {
            message.error(`Failed to ${action.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        }
    };

    const handleDeleteStudent = async (studentId) => {
        try {
            await deleteStudent(studentId);
            fetchData();
            message.success('Delete student successful');
        } catch (error) {
            message.error('Failed to delete student');
        }
    };

    const studentColumns = [
        { title: 'Students Name', dataIndex: 'name' },
        { title: 'Students Email', dataIndex: 'email' },
        {
            title: 'Actions',
            render: (text, student) => (
                <div>
                    <Button onClick={() => handleModalOpen('UpdateStudent', student)}>Update</Button>
                    <Popconfirm
                        title="Are you sure you want to delete this student?"
                        onConfirm={() => handleDeleteStudent(student._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger style={{ marginLeft: '10px' }}>Delete</Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
      <Layout>
        <AppHeader />
        <Content style={{ padding: "20px" }}>
          <h1>Principal Dashboard</h1>
          <Button
            type="primary"
            style={{ marginBottom: "20px", marginRight: "10px" }}
            onClick={() => handleModalOpen("CreateTeacher")}
          >
            Create Teacher
          </Button>
          <Button
            type="primary"
            style={{ marginBottom: "20px", marginRight: "10px" }}
            onClick={() => handleModalOpen("CreateStudent")}
          >
            Create Student
          </Button>
          <Button
            type="primary"
            style={{ marginBottom: "20px", marginRight: "10px" }}
            onClick={() => handleModalOpen("CreateClassroom")}
          >
            Create Classroom
          </Button>
          <Button
            type="primary"
            style={{ marginBottom: "20px", marginRight: "10px" }}
            onClick={() => handleModalOpen("AssignTeacher")}
          >
            Assign Classroom to Teacher
          </Button>

          <Title level={3}>Teachers Records:</Title>
          <Table
            dataSource={teachers}
            columns={[
              { title: "Teachers Name", dataIndex: "name" },
              { title: "Teachers Email", dataIndex: "email" },
            ]}
            loading={loading}
          />

          <Title level={3} style={{ marginTop: "20px" }}>
            Students Records:
          </Title>
          <Table
            dataSource={students}
            columns={studentColumns}
            loading={loading}
          />

          <Title level={3} style={{ marginTop: "20px" }}>
            Classroom Records/ Time-Table:
          </Title>
          <Table
            dataSource={classrooms}
            columns={[
              { title: "Classroom Name", dataIndex: "name" },
              {
                title: "Assigned Teacher Name",
                dataIndex: "teacherName",
                render: (text, record) =>
                  record.assignedTeacher ? record.assignedTeacher : "None",
              },
              { title: "Start Time", dataIndex: "startTime" },
              { title: "End Time", dataIndex: "endTime" },
              { title: "Days", dataIndex: "days" },
            ]}
            loading={loading}
          />

          <Modal
            title={action}
            visible={isModalVisible}
            onOk={handleModalOk}
            onCancel={() => setIsModalVisible(false)}
          >
            <Form form={form} layout="vertical">
              {action === "CreateTeacher" ||
              action === "CreateStudent" ||
              action === "UpdateStudent" ? (
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
                      {
                        required: action !== "UpdateStudent",
                        message: "Please input password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </>
              ) : action === "CreateClassroom" ? (
                <>
                  <Form.Item
                    name="name"
                    label="Classroom Name"
                    rules={[
                      {
                        required: true,
                        message: "Please input classroom name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="startTime"
                    label="Start Time"
                    rules={[
                      { required: true, message: "Please input start time!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="endTime"
                    label="End Time"
                    rules={[
                      { required: true, message: "Please input end time!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="days"
                    label="Days"
                    rules={[{ required: true, message: "Please input days!" }]}
                  >
                    <Input />
                  </Form.Item>
                </>
              ) : (
                action === "AssignTeacher" && (
                  <>
                    <Form.Item
                      name="teacherName"
                      label="Teacher Name"
                      rules={[
                        {
                          required: true,
                          message: "Please input teacher Name!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="classroomName"
                      label="Classroom name"
                      rules={[
                        {
                          required: true,
                          message: "Please input classroom subject!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </>
                )
              )}
            </Form>
          </Modal>
        </Content>
      </Layout>
    );
};

export default PrincipalDashboard;
