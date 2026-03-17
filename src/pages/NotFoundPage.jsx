import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

function NotFoundPage() {
  return (
    <div className="grid min-h-screen place-items-center px-4">
      <div className="max-w-md text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">404</p>
        <h1 className="heading-font mt-2 text-4xl font-bold text-slate-900">Page not found</h1>
        <p className="mt-2 text-slate-600">The page you requested does not exist or may have been moved.</p>
        <Link to="/products" className="mt-6 inline-block">
          <Button>Go to products</Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;