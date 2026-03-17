import { Pencil, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  deleteProduct,
  getBrandProductsFromPublishedFeed,
} from '../../api/productApi';
import PageTransition from '../../components/common/PageTransition';
import Modal from '../../components/ui/Modal';
import Pagination from '../../components/ui/Pagination';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Loader from '../../components/ui/Loader';
import useAuth from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';

function statusClasses(status) {
  return status === 'published'
    ? 'bg-emerald-100 text-emerald-700'
    : 'bg-amber-100 text-amber-700';
}

function ManageProductsPage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const page = useMemo(() => Number(searchParams.get('page') || '1'), [searchParams]);
  const limit = useMemo(() => Number(searchParams.get('limit') || '20'), [searchParams]);

  const loadBrandProducts = useCallback(async () => {
    if (!user?.id) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await getBrandProductsFromPublishedFeed({
        userId: user.id,
        page,
        limit,
      });
      setProducts(response.data?.data?.products || []);
      setPagination(response.data?.data?.pagination || null);
    } catch (fetchError) {
      setError(fetchError.response?.data?.message || 'Unable to load your products.');
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, page, limit]);

  useEffect(() => {
    loadBrandProducts();
  }, [loadBrandProducts]);

  const onPageChange = (nextPage) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', String(nextPage));
    setSearchParams(next);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    const previous = products;
    setProducts((prev) => prev.filter((item) => item.id !== deleteId));

    try {
      await deleteProduct(deleteId);
      showToast({
        type: 'success',
        title: 'Product deleted',
        message: 'The product has been archived successfully.',
      });
      setDeleteId('');
    } catch (deleteError) {
      setProducts(previous);
      showToast({
        type: 'error',
        title: 'Delete failed',
        message: deleteError.response?.data?.message || 'Could not delete this product.',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <PageTransition>
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="heading-font text-2xl font-bold text-slate-900">Manage Products</h1>
          <Link to="/dashboard/create-product">
            <Button>Create Product</Button>
          </Link>
        </div>

        <Card className="bg-amber-50 text-amber-800">
          <p className="text-sm">Current backend only exposes the public product feed endpoint for listing, so draft items may not appear here until a dedicated brand listing endpoint is added.</p>
        </Card>

        {isLoading ? <Loader text="Loading your products..." /> : null}

        {!isLoading && error ? (
          <Card>
            <p className="text-sm text-rose-600">{error}</p>
          </Card>
        ) : null}

        {!isLoading && !error ? (
          <Card className="overflow-x-auto p-0">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Product</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Price</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                      No products found.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="border-t border-slate-100">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images?.[0] || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=400'}
                            alt={product.title}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                          <p className="font-medium text-slate-900">{product.title}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{product.category}</td>
                      <td className="px-4 py-3 font-medium text-slate-900">${Number(product.price).toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2 py-1 text-xs font-semibold capitalize ${statusClasses(product.status)}`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Link to={`/dashboard/products/${product.id}/edit`} state={{ product }}>
                            <Button variant="secondary" className="px-3 py-2">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="secondary"
                            className="px-3 py-2 text-rose-600"
                            onClick={() => setDeleteId(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Card>
        ) : null}

        <Pagination
          page={pagination?.page || page}
          totalPages={pagination?.totalPages || 1}
          onPageChange={onPageChange}
        />

        <Modal isOpen={Boolean(deleteId)} title="Confirm Delete" onClose={() => setDeleteId('')}>
          <p className="text-sm text-slate-600">This action archives the product. You can continue, or cancel now.</p>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setDeleteId('')}>Cancel</Button>
            <Button loading={isDeleting} onClick={confirmDelete}>Delete Product</Button>
          </div>
        </Modal>
      </section>
    </PageTransition>
  );
}

export default ManageProductsPage;
