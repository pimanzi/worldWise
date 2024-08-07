import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/FakeAuthProvider';
import { useEffect } from 'react';

function ProtectorRoutes({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);
  return isAuthenticated ? children : null;
}

export default ProtectorRoutes;
