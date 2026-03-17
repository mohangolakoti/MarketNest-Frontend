import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../api/productApi';
import PageTransition from '../../components/common/PageTransition';
import ProductForm from '../../components/products/ProductForm';
import Card from '../../components/ui/Card';
import useToast from '../../hooks/useToast';

function CreateProductPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    setIsSubmitting(true);
    try {
      await createProduct(formData);
      showToast({
        type: 'success',
        title: 'Product created',
        message: 'Your product has been saved successfully.',
      });
      navigate('/dashboard/products');
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Create failed',
        message: error.response?.data?.message || 'Unable to create product.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <section className="space-y-4">
        <h1 className="heading-font text-2xl font-bold text-slate-900">Create Product</h1>
        <Card>
          <ProductForm onSubmit={handleCreate} isSubmitting={isSubmitting} submitLabel="Create Product" />
        </Card>
      </section>
    </PageTransition>
  );
}

export default CreateProductPage;
