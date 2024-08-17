import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './utils/auth';
import Login from './pages/Login';
import PrincipalDashboard from './pages/PrincipalDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/principal" element={<ProtectedRoute roled="Principal"><PrincipalDashboard /></ProtectedRoute>} />
                    <Route path="/teacher" element={<ProtectedRoute roled="Teacher"><TeacherDashboard /></ProtectedRoute>} />
                    <Route path="/student" element={<ProtectedRoute roled="Student"><StudentDashboard /></ProtectedRoute>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
