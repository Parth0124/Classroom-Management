import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { login, getCurrentUser } from "../api/auth"

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await login(values.name, values.email, values.password);

            const currentUser = await getCurrentUser();

            if (currentUser.role === 'Principal') {
                navigate('/principal');
            } else if (currentUser.role === 'Teacher') {
                navigate('/teacher');
            } else if (currentUser.role === 'Student') {
                navigate('/student');
            }
        } catch (error) {
            message.error('Invalid credentials');
            setLoading(false);
        }
    };

    return (
      <div style={styles.container}>
        <Card title="Login" style={styles.card}>
          <Form onFinish={onFinish}>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
};
const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#87CEEB',
    },
    card: {
        width: 400,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
};

export default Login;
