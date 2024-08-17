import React, { useState, useEffect } from "react";
import {
  Layout,
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
  Typography,
} from "antd";
import {
  getTeachersStudentsAndClassrooms,
  createTeacher,
  createStudent,
  createClassroom,
  assignTeacherToClassroom,
  updateStudent,
  deleteStudent,
} from "../api/principal";
import AppHeader from "../components/common/Header";

const { Content } = Layout;
const { Title } = Typography;

const PrincipalDashboard = () => {
  const [teachersList, setTeachersList] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  const [classroomsList, setClassroomsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [formInstance] = Form.useForm();
  const [currentAction, setCurrentAction] = useState("");
  const [studentToEdit, setStudentToEdit] = useState(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      const responseData = await getTeachersStudentsAndClassrooms();
      setTeachersList(responseData.teachers);
      setStudentsList(responseData.students);
      setClassroomsList(responseData.classrooms);
    } catch (error) {
      message.error("Unable to load data.");
    } finally {
      setIsLoading(false);
    }
  };

  const showModal = (actionType, student = null) => {
    setCurrentAction(actionType);
    setStudentToEdit(student);
    if (student) {
      formInstance.setFieldsValue(student);
    } else {
      formInstance.resetFields();
    }
    setModalVisible(true);
  };

  const handleModalConfirm = async () => {
    try {
      switch (currentAction) {
        case "CreateTeacher":
          await createTeacher(formInstance.getFieldsValue());
          break;
        case "CreateStudent":
          await createStudent(formInstance.getFieldsValue());
          break;
        case "CreateClassroom":
          await createClassroom(formInstance.getFieldsValue());
          break;
        case "AssignTeacher":
          await assignTeacherToClassroom(formInstance.getFieldsValue());
          break;
        case "UpdateStudent":
          await updateStudent(studentToEdit._id, formInstance.getFieldsValue());
          break;
        default:
          throw new Error("Unknown action");
      }
      loadInitialData();
      setModalVisible(false);
      message.success(
        `${currentAction.replace(/([A-Z])/g, " $1")} completed successfully.`
      );
    } catch (error) {
      message.error(
        `Failed to ${currentAction.replace(/([A-Z])/g, " $1").toLowerCase()}.`
      );
    }
  };

  const removeStudent = async (studentId) => {
    try {
      await deleteStudent(studentId);
      loadInitialData();
      message.success("Student removed successfully.");
    } catch (error) {
      message.error("Unable to remove student.");
    }
  };

  const studentColumns = [
    { title: "Student Name", dataIndex: "name" },
    { title: "Student Email", dataIndex: "email" },
    {
      title: "Actions",
      render: (text, student) => (
        <div>
          <Button onClick={() => showModal("UpdateStudent", student)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to remove this student?"
            onConfirm={() => removeStudent(student._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger style={{ marginLeft: "10px" }}>
              Remove
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <AppHeader />
      <Content style={{ padding: "20px" }}>
        <h1>Dashboard</h1>
        <Button
          type="primary"
          style={{ marginBottom: "20px", marginRight: "10px" }}
          onClick={() => showModal("CreateTeacher")}
        >
          Add Teacher
        </Button>
        <Button
          type="primary"
          style={{ marginBottom: "20px", marginRight: "10px" }}
          onClick={() => showModal("CreateStudent")}
        >
          Add Student
        </Button>
        <Button
          type="primary"
          style={{ marginBottom: "20px", marginRight: "10px" }}
          onClick={() => showModal("CreateClassroom")}
        >
          Add Classroom
        </Button>
        <Button
          type="primary"
          style={{ marginBottom: "20px", marginRight: "10px" }}
          onClick={() => showModal("AssignTeacher")}
        >
          Assign Teacher
        </Button>

        <Title level={3}>Teachers List:</Title>
        <Table
          dataSource={teachersList}
          columns={[
            { title: "Teacher Name", dataIndex: "name" },
            { title: "Teacher Email", dataIndex: "email" },
          ]}
          loading={isLoading}
        />

        <Title level={3} style={{ marginTop: "20px" }}>
          Students List:
        </Title>
        <Table
          dataSource={studentsList}
          columns={studentColumns}
          loading={isLoading}
        />

        <Title level={3} style={{ marginTop: "20px" }}>
          Classroom Schedule:
        </Title>
        <Table
          dataSource={classroomsList}
          columns={[
            { title: "Classroom", dataIndex: "name" },
            {
              title: "Teacher",
              dataIndex: "teacherName",
              render: (text, record) =>
                record.assignedTeacher ? record.assignedTeacher : "Unassigned",
            },
            { title: "Start Time", dataIndex: "startTime" },
            { title: "End Time", dataIndex: "endTime" },
            { title: "Days", dataIndex: "days" },
          ]}
          loading={isLoading}
        />

        <Modal
          title={currentAction}
          visible={modalVisible}
          onOk={handleModalConfirm}
          onCancel={() => setModalVisible(false)}
        >
          <Form form={formInstance} layout="vertical">
            {currentAction === "CreateTeacher" ||
            currentAction === "CreateStudent" ||
            currentAction === "UpdateStudent" ? (
              <>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[
                    { required: true, message: "Please enter the name!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Please enter the email!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: currentAction !== "UpdateStudent",
                      message: "Please enter the password!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </>
            ) : currentAction === "CreateClassroom" ? (
              <>
                <Form.Item
                  name="name"
                  label="Classroom Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the classroom name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="startTime"
                  label="Start Time"
                  rules={[
                    { required: true, message: "Please enter the start time!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="endTime"
                  label="End Time"
                  rules={[
                    { required: true, message: "Please enter the end time!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="days"
                  label="Days"
                  rules={[
                    { required: true, message: "Please enter the days!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </>
            ) : (
              currentAction === "AssignTeacher" && (
                <>
                  <Form.Item
                    name="teacherName"
                    label="Teacher Name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the teacher's name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="classroomName"
                    label="Classroom Name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the classroom name!",
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
