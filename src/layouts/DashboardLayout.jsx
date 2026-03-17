import { Outlet } from 'react-router-dom';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';

function DashboardLayout() {
  return (
    <section className="grid gap-6 lg:grid-cols-[240px_1fr]">
      <div className="lg:sticky lg:top-24 lg:h-fit">
        <DashboardSidebar />
      </div>
      <div>
        <Outlet />
      </div>
    </section>
  );
}

export default DashboardLayout;