import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import JobList from './components/jobs/JobList';
import JobDetail from './components/jobs/JobDetail';
import JobForm from './components/jobs/JobForm';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/jobs" />} />
          <Route 
            path="/jobs" 
            element={
              <ProtectedRoute>
                <JobList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/jobs/:id" 
            element={
              <ProtectedRoute>
                <JobDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/jobs/create" 
            element={
              <ProtectedRoute>
                <JobForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/jobs/:id/edit" 
            element={
              <ProtectedRoute>
                <JobForm />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;