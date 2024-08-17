import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../../api/auth';
import { Spin } from 'antd'; 

const ProtectedRoute = ({ roled, children }) => {
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const user = await getCurrentUser();
                setRole(user.role);
            } catch (error) {
                console.error('Failed to fetch user role:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserRole();
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        )
    }

    if (!roled || role !== roled) {
        console.log(roled, " expected role ", roled, " user's role ", role);
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
