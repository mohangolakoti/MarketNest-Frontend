import { BadgeDollarSign, Building2, Tags } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../api/productApi';
import PageTransition from '../components/common/PageTransition';
import Card from '../components/ui/Card';
import Loader from '../components/ui/Loader';

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await getProductById(id);
        const nextProduct = response.data?.data?.product || null;
        setProduct(nextProduct);
        setActiveImage(nextProduct?.images?.[0] || '');
      } catch (fetchError) {
        setError(fetchError.response?.data?.message || 'Unable to load product details.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (isLoading) {
    return <Loader text="Loading product details..." />;
  }

  if (error || !product) {
    return (
      <Card>
        <p className="text-sm text-rose-600">{error || 'Product not found.'}</p>
      </Card>
    );
  }

  return (
    <PageTransition>
      <section className="grid gap-6 lg:grid-cols-[120px_1fr_1fr]">
        <div className="order-2 flex gap-3 overflow-auto lg:order-1 lg:flex-col">
          {(product.images?.length ? product.images : ['https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200']).map((image) => (
            <button
              key={image}
              onClick={() => setActiveImage(image)}
              className={`h-24 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition ${activeImage === image ? 'border-brand-500' : 'border-transparent hover:border-slate-200'}`}
            >
              <img src={image} alt="Thumbnail" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>

        <Card className="order-1 overflow-hidden p-0 lg:order-2">
          <img
            src={activeImage || product.images?.[0] || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200'}
            alt={product.title}
            className="h-full max-h-[620px] w-full object-cover"
          />
        </Card>

        <Card className="order-3 space-y-4">
          <p className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
            {product.status}
          </p>
          <h1 className="heading-font text-3xl font-bold text-slate-900">{product.title}</h1>
          <p className="text-slate-600">{product.description}</p>

          <div className="grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
            <p className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2">
              <BadgeDollarSign className="h-4 w-4" />
              ${Number(product.price).toFixed(2)}
            </p>
            <p className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2">
              <Tags className="h-4 w-4" />
              {product.category}
            </p>
            <p className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 sm:col-span-2">
              <Building2 className="h-4 w-4" />
              {product.brand?.name || 'Brand'}
            </p>
          </div>
        </Card>
      </section>
    </PageTransition>
  );
}

export default ProductDetailsPage;
