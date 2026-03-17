import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import PageTransition from '../../components/common/PageTransition';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import InputField from '../../components/ui/InputField';
import useAuth from '../../hooks/useAuth';
import { cn } from '../../utils/cn';

const roleOptions = [
  {
    value: 'brand',
    title: 'Brand',
    description: 'Manage catalog, pricing, and storefront performance.',
  },
  {
    value: 'customer',
    title: 'Customer',
    description: 'Browse products and discover your next favorite style.',
  },
];

function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'customer',
    },
  });

  const selectedRole = watch('role');

  const onSubmit = async (values) => {
    setApiError('');
    try {
      await signup(values);
      navigate(values.role === 'brand' ? '/dashboard' : '/products');
    } catch (error) {
      setApiError(error.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <PageTransition>
      <div className="grid min-h-[calc(100vh-7rem)] overflow-hidden rounded-3xl border border-white/70 bg-white shadow-soft lg:grid-cols-2">
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-brand-600 to-brand-500 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1400')] bg-cover bg-center opacity-25" />
          <div className="relative z-10">
            <p className="text-sm uppercase tracking-[0.2em] text-brand-50">Start Selling or Shopping</p>
            <h1 className="heading-font mt-4 text-4xl font-bold leading-tight">Your fashion marketplace, built around trust and speed.</h1>
          </div>
          <p className="relative z-10 max-w-md text-brand-50">Create your account in minutes, choose your role, and jump right into the MarketNest ecosystem.</p>
        </div>

        <div className="flex items-center justify-center bg-gradient-to-b from-white to-slate-50 p-6 sm:p-10">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-xl">
            <Card className="glass-card p-7 sm:p-8">
              <div className="mb-6">
                <h2 className="heading-font text-3xl font-bold text-slate-900">Create Account</h2>
                <p className="mt-1 text-sm text-slate-600">Join MarketNest as a brand or customer.</p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <InputField
                  id="signup-name"
                  label="Full Name"
                  error={errors.name?.message}
                  {...register('name', {
                    required: 'Name is required',
                    minLength: { value: 2, message: 'Name must be at least 2 characters' },
                  })}
                />
                <InputField
                  id="signup-email"
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
                  id="signup-password"
                  label="Password"
                  type="password"
                  error={errors.password?.message}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 8, message: 'Password must be at least 8 characters' },
                  })}
                />

                <div>
                  <p className="mb-2 text-sm font-medium text-slate-700">Choose your role</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {roleOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setValue('role', option.value, { shouldValidate: true })}
                        className={cn(
                          'rounded-xl border p-3 text-left transition',
                          selectedRole === option.value
                            ? 'border-brand-500 bg-brand-50 ring-2 ring-brand-200'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        )}
                      >
                        <p className="text-sm font-semibold text-slate-900">{option.title}</p>
                        <p className="text-xs text-slate-600">{option.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <input
                  type="hidden"
                  {...register('role', { required: 'Role is required' })}
                />
                {errors.role?.message ? <p className="text-xs text-rose-600">{errors.role.message}</p> : null}
                {apiError ? <p className="text-sm text-rose-600">{apiError}</p> : null}

                <Button type="submit" className="w-full" loading={isSubmitting}>
                  <UserPlus className="h-4 w-4" />
                  Create account
                </Button>
              </form>

              <p className="mt-5 text-sm text-slate-600">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-500">
                  Sign in
                </Link>
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}

export default SignupPage;
