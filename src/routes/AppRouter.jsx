import { AnimatePresence } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import DashboardLayout from '../layouts/DashboardLayout';
import MainLayout from '../layouts/MainLayout';
import BrandDashboardPage from '../pages/BrandDashboardPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import ProductsPage from '../pages/ProductsPage';
import CreateProductPage from '../pages/dashboard/CreateProductPage';
import EditProductPage from '../pages/dashboard/EditProductPage';
import ManageProductsPage from '../pages/dashboard/ManageProductsPage';
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import PrivateRoute from './PrivateRoute';

function RootRedirect() {
  const { role, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/products" replace />;
  }

  return role === 'brand' ? <Navigate to="/dashboard" replace /> : <Navigate to="/products" replace />;
}

function PublicOnlyRoute({ children }) {
  const { isAuthenticated, role } = useAuth();

  if (isAuthenticated) {
    return role === 'brand' ? <Navigate to="/dashboard" replace /> : <Navigate to="/products" replace />;
  }

  return children;
}

function AppRouter() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
        <Route path="/signup" element={<PublicOnlyRoute><SignupPage /></PublicOnlyRoute>} />

        <Route element={<MainLayout />}>
          <Route index element={<RootRedirect />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />

          <Route element={<PrivateRoute allowedRoles={['brand']} />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<BrandDashboardPage />} />
              <Route path="products" element={<ManageProductsPage />} />
              <Route path="create-product" element={<CreateProductPage />} />
              <Route path="products/:id/edit" element={<EditProductPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AppRouter;
