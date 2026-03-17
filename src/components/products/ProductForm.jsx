import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../ui/Button';
import InputField from '../ui/InputField';

const STATUS_OPTIONS = ['draft', 'published'];

function ProductForm({ defaultValues, onSubmit, isSubmitting, submitLabel = 'Save Product' }) {
  const [previewUrls, setPreviewUrls] = useState([]);

  const initialValues = useMemo(
    () => ({
      title: defaultValues?.title || '',
      description: defaultValues?.description || '',
      price: defaultValues?.price || '',
      category: defaultValues?.category || '',
      status: defaultValues?.status || 'draft',
      images: null,
    }),
    [defaultValues]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleImagePreview = (event) => {
    const files = Array.from(event.target.files || []);
    const nextPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(nextPreviews);
  };

  const submitForm = (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('price', values.price);
    formData.append('category', values.category);
    formData.append('status', values.status);

    const files = Array.from(values.images || []);
    files.forEach((file) => {
      formData.append('images', file);
    });

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
      <InputField
        id="product-title"
        label="Title"
        error={errors.title?.message}
        {...register('title', {
          required: 'Title is required',
          maxLength: { value: 150, message: 'Title must be at most 150 characters' },
        })}
      />

      <div>
        <label htmlFor="product-description" className="mb-1 block text-sm font-medium text-slate-700">
          Description
        </label>
        <textarea
          id="product-description"
          rows={5}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
          {...register('description', {
            required: 'Description is required',
            maxLength: { value: 2000, message: 'Description must be at most 2000 characters' },
          })}
        />
        {errors.description?.message ? <p className="mt-1 text-xs text-rose-600">{errors.description.message}</p> : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          id="product-price"
          label="Price"
          type="number"
          step="0.01"
          min="0"
          error={errors.price?.message}
          {...register('price', {
            required: 'Price is required',
            min: { value: 0, message: 'Price must be positive' },
          })}
        />
        <InputField
          id="product-category"
          label="Category"
          error={errors.category?.message}
          {...register('category', {
            required: 'Category is required',
            maxLength: { value: 80, message: 'Category must be at most 80 characters' },
          })}
        />
      </div>

      <div>
        <label htmlFor="product-status" className="mb-1 block text-sm font-medium text-slate-700">
          Status
        </label>
        <select
          id="product-status"
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
          {...register('status')}
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="product-images" className="mb-1 block text-sm font-medium text-slate-700">
          Product Images
        </label>
        <input
          id="product-images"
          type="file"
          multiple
          accept="image/*"
          className="w-full rounded-xl border border-dashed border-slate-300 bg-white p-3 text-sm"
          {...register('images', {
            validate: (fileList) => {
              const existingCount = defaultValues?.images?.length || 0;
              const selectedCount = fileList?.length || 0;
              if (existingCount + selectedCount === 0) {
                return 'At least one image is required';
              }
              if (selectedCount > 6) {
                return 'You can upload up to 6 images';
              }
              return true;
            },
          })}
          onChange={handleImagePreview}
        />
        {errors.images?.message ? <p className="mt-1 text-xs text-rose-600">{errors.images.message}</p> : null}
      </div>

      {(defaultValues?.images?.length || previewUrls.length > 0) ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(previewUrls.length > 0 ? previewUrls : defaultValues?.images || []).map((src) => (
            <img key={src} src={src} alt="Preview" className="h-24 w-full rounded-lg object-cover" />
          ))}
        </div>
      ) : null}

      <Button type="submit" loading={isSubmitting}>
        {submitLabel}
      </Button>
    </form>
  );
}

export default ProductForm;
