import { Menu, Search, ShoppingBag, UserCircle2, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Button from '../ui/Button';

function Navbar() {
  const { user, role, isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const location = useLocation();
  const navigate = useNavigate();

  const onProductsPage = location.pathname.startsWith('/products');

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (!search.trim()) {
      navigate('/products');
      return;
    }
    navigate(`/products?search=${encodeURIComponent(search.trim())}`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500 text-white">
            <ShoppingBag className="h-5 w-5" />
          </span>
          <span className="heading-font text-xl font-bold text-slate-900">MarketNest</span>
        </Link>

        {onProductsPage ? (
          <form onSubmit={handleSearchSubmit} className="hidden flex-1 items-center md:flex">
            <div className="relative w-full max-w-xl">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products, categories, styles"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-brand-400"
              />
            </div>
          </form>
        ) : (
          <div className="hidden flex-1 md:block" />
        )}

        <nav className="hidden items-center gap-2 md:flex">
          {isAuthenticated ? (
            <>
              {role === 'brand' ? <Link to="/dashboard" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900">Dashboard</Link> : null}
              {role === 'brand' ? <Link to="/dashboard/products" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900">Manage</Link> : null}
              <Link to="/products" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900">Products</Link>
              <div className="relative">
                <button
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  <UserCircle2 className="h-4 w-4" />
                  {user?.name?.split(' ')[0] || 'Profile'}
                </button>
                {profileOpen ? (
                  <div className="absolute right-0 mt-2 w-44 rounded-xl border border-slate-200 bg-white p-2 shadow-soft">
                    <p className="px-2 py-1 text-xs text-slate-500">{user?.email}</p>
                    <button
                      onClick={logout}
                      className="w-full rounded-lg px-2 py-2 text-left text-sm text-rose-600 transition hover:bg-rose-50"
                    >
                      Logout
                    </button>
                  </div>
                ) : null}
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </nav>

        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="ml-auto rounded-lg border border-slate-200 p-2 md:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="space-y-2 border-t border-slate-100 bg-white px-4 py-3 md:hidden">
          <Link to="/products" className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
            Products
          </Link>
          {role === 'brand' ? (
            <>
              <Link to="/dashboard" className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                Dashboard
              </Link>
              <Link to="/dashboard/products" className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                Manage Products
              </Link>
            </>
          ) : null}
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-rose-600 hover:bg-rose-50"
            >
              Logout
            </button>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="flex-1">
                <Button variant="secondary" className="w-full">Login</Button>
              </Link>
              <Link to="/signup" className="flex-1">
                <Button className="w-full">Signup</Button>
              </Link>
            </div>
          )}
        </div>
      ) : null}
    </header>
  );
}

export default Navbar;
