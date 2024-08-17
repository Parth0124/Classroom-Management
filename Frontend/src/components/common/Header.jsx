import React, { useEffect, useState } from 'react';
import { Layout, Menu, Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { logout, getCurrentUser } from '../../api/auth'; 

const { Header } = Layout;
const { Title } = Typography;

function AppHeader() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getCurrentUser(); 
                setCurrentUser(user);
            } catch (error) {
                console.error('Failed to fetch user', error);
                setCurrentUser(null); 
            }
        };

        fetchUser();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Header style={{ padding: '0 20px', backgroundColor: '#001529' }}>
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <Title level={3} style={{ color: '#fff', margin: 0 }}>My Classroom App</Title>
                <Menu theme="dark" mode="horizontal" selectable={false} style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    <Menu.Item key="1">
                        <span style={{ color: '#fff' }}>
                            {currentUser ? `Welcome ${currentUser.name}` : 'Welcome Guest'}
                        </span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Button type="primary" danger onClick={handleLogout} style={{ marginLeft: '10px' }}>
                            Logout
                        </Button>
                    </Menu.Item>
                </Menu>
            </div>
        </Header>
    );
}

export default AppHeader;
