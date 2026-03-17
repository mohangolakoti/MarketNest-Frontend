import api from './axios';

export const getProducts = (params = {}) => api.get('/products', { params });

export const getProductById = (id) => api.get(`/products/${id}`);

export const getBrandDashboardSummary = () => api.get('/brand/dashboard');

export const createProduct = (payload) =>
	api.post('/products', payload, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});

export const updateProduct = (id, payload) =>
	api.put(`/products/${id}`, payload, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});

export const deleteProduct = (id) => api.delete(`/products/${id}`);

export const getBrandProductsFromPublishedFeed = async ({ userId, page = 1, limit = 50, search, category }) => {
	const response = await getProducts({ page, limit, ...(search ? { search } : {}), ...(category ? { category } : {}) });
	const products = response.data?.data?.products || [];
	const filtered = products.filter((product) => {
		const brandRef = product?.brand;
		const brandId = brandRef?.id || brandRef?._id || brandRef;
		return String(brandId) === String(userId);
	});

	return {
		...response,
		data: {
			...response.data,
			data: {
				...response.data?.data,
				products: filtered,
				pagination: {
					...(response.data?.data?.pagination || {}),
					total: filtered.length,
					totalPages: 1,
				},
			},
		},
	};
};
