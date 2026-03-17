import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loader from '../components/ui/Loader';

function PrivateRoute({ allowedRoles }) {
  const { isAuthenticated, isInitializing, role } = useAuth();

  if (isInitializing) {
    return <Loader text="Preparing your session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/products" replace />;
  }

  return <Outlet />;
}

export default PrivateRoute;
