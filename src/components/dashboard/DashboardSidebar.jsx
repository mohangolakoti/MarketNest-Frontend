import { LayoutDashboard, PlusCircle, Shirt } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/dashboard/products', label: 'Manage Products', icon: Shirt },
  { to: '/dashboard/create-product', label: 'Create Product', icon: PlusCircle },
];

function DashboardSidebar() {
  return (
    <aside className="rounded-2xl border border-white/70 bg-white p-4 shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Seller Studio</p>
      <div className="mt-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${isActive ? 'bg-brand-500 text-white' : 'text-slate-700 hover:bg-slate-100'}`
              }
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
}

export default DashboardSidebar;
