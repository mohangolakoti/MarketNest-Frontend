import { BarChart3, Layers3, PackageCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getBrandDashboardSummary } from '../api/productApi';
import DashboardCard from '../components/dashboard/DashboardCard';
import PageTransition from '../components/common/PageTransition';
import Card from '../components/ui/Card';
import Loader from '../components/ui/Loader';

const iconMap = {
  totalProducts: Layers3,
  publishedCount: PackageCheck,
  archivedCount: BarChart3,
};

const labelMap = {
  totalProducts: 'Total Products',
  publishedCount: 'Published',
  archivedCount: 'Draft + Archived',
};

function BrandDashboardPage() {
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadSummary = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await getBrandDashboardSummary();
        setSummary(response.data?.data || null);
      } catch (fetchError) {
        setError(fetchError.response?.data?.message || 'Unable to load dashboard data.');
      } finally {
        setIsLoading(false);
      }
    };

    loadSummary();
  }, []);

  if (isLoading) {
    return <Loader text="Loading dashboard..." />;
  }

  if (error || !summary) {
    return (
      <Card>
        <p className="text-sm text-rose-600">{error || 'No dashboard data available.'}</p>
      </Card>
    );
  }

  return (
    <PageTransition>
      <section className="space-y-6">
        <Card className="bg-gradient-to-r from-brand-500 to-brand-600 text-white">
          <p className="text-sm uppercase tracking-[0.15em] text-brand-50">Brand Control Center</p>
          <h1 className="heading-font mt-2 text-3xl font-bold">Your live catalog performance</h1>
          <p className="mt-2 max-w-2xl text-sm text-brand-50">Keep your store healthy with a quick view of active, published, and archived product counts.</p>
        </Card>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(summary).map(([key, value]) => {
            const Icon = iconMap[key];
            return (
              <DashboardCard key={key} title={labelMap[key] || key} value={value} icon={Icon} />
            );
          })}
        </div>

        <Card>
          <h2 className="heading-font text-lg font-semibold text-slate-900">Performance Tip</h2>
          <p className="mt-1 text-sm text-slate-600">Products in draft or archived mode are counted separately. Publish high-performing styles to increase storefront visibility.</p>
        </Card>
      </section>
    </PageTransition>
  );
}

export default BrandDashboardPage;
