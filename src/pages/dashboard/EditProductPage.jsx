import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getProductById, updateProduct } from '../../api/productApi';
import PageTransition from '../../components/common/PageTransition';
import ProductForm from '../../components/products/ProductForm';
import Card from '../../components/ui/Card';
import Loader from '../../components/ui/Loader';
import useToast from '../../hooks/useToast';

function EditProductPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [product, setProduct] = useState(location.state?.product || null);
  const [isLoading, setIsLoading] = useState(!location.state?.product);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      if (location.state?.product) {
        return;
      }

      setIsLoading(true);
      try {
        const response = await getProductById(id);
        setProduct(response.data?.data?.product || null);
      } catch {
        showToast({
          type: 'error',
          title: 'Product unavailable',
          message: 'Could not preload this product from current API endpoints.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id, location.state?.product, showToast]);

  const handleUpdate = async (formData) => {
    setIsSubmitting(true);
    try {
      await updateProduct(id, formData);
      showToast({
        type: 'success',
        title: 'Product updated',
        message: 'Your changes are now live.',
      });
      navigate('/dashboard/products');
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Update failed',
        message: error.response?.data?.message || 'Unable to update product.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Loader text="Loading product..." />;
  }

  if (!product) {
    return (
      <Card>
        <p className="text-sm text-rose-600">Product could not be loaded. Try editing from the manage products table.</p>
      </Card>
    );
  }

  return (
    <PageTransition>
      <section className="space-y-4">
        <h1 className="heading-font text-2xl font-bold text-slate-900">Edit Product</h1>
        <Card>
          <ProductForm
            defaultValues={product}
            onSubmit={handleUpdate}
            isSubmitting={isSubmitting}
            submitLabel="Save Changes"
          />
        </Card>
      </section>
    </PageTransition>
  );
}

export default EditProductPage;