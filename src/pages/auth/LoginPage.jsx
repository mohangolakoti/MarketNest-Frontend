import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import PageTransition from '../../components/common/PageTransition';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import InputField from '../../components/ui/InputField';
import useAuth from '../../hooks/useAuth';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values) => {
    setApiError('');
    try {
      const user = await login(values);
      navigate(user.role === 'brand' ? '/dashboard' : '/products');
    } catch (error) {
      setApiError(error.response?.data?.message || 'Unable to login. Try again.');
    }
  };

  return (
    <PageTransition>
      <div className="grid min-h-[calc(100vh-7rem)] overflow-hidden rounded-3xl border border-white/70 bg-white shadow-soft lg:grid-cols-2">
        <div className="relative hidden overflow-hidden bg-slate-900 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1400')] bg-cover bg-center opacity-35" />
          <div className="relative z-10">
            <p className="text-sm uppercase tracking-[0.2em] text-brand-50">MarketNest</p>
            <h1 className="heading-font mt-4 text-4xl font-bold leading-tight">Run your fashion storefront with clarity and speed.</h1>
          </div>
          <p className="relative z-10 max-w-md text-slate-200">Brands manage products, customers discover styles, and everyone gets a smoother experience.</p>
        </div>

        <div className="flex items-center justify-center bg-gradient-to-b from-white to-slate-50 p-6 sm:p-10">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
            <Card className="glass-card p-7 sm:p-8">
              <div className="mb-6">
                <h2 className="heading-font text-3xl font-bold text-slate-900">Welcome Back</h2>
                <p className="mt-1 text-sm text-slate-600">Log in to your MarketNest account.</p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <InputField
                  id="login-email"
                  label="Email"
                  type="email"
                  error={errors.email?.message}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Enter a valid email address',
                    },
                  })}
                />
                <InputField
                  id="login-password"
                  label="Password"
                  type="password"
                  error={errors.password?.message}
                  {...register('password', { required: 'Password is required' })}
                />

                {apiError ? <p className="text-sm text-rose-600">{apiError}</p> : null}

                <Button type="submit" className="w-full" loading={isSubmitting}>
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              </form>

              <p className="mt-5 text-sm text-slate-600">
                New to MarketNest?{' '}
                <Link to="/signup" className="font-semibold text-brand-600 hover:text-brand-500">
                  Create an account
                </Link>
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}

export default LoginPage;
