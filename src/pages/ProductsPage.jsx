import { Filter, Search, SearchX } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoryFilterSidebar from '../components/products/CategoryFilterSidebar';
import PageTransition from '../components/common/PageTransition';
import ProductCard from '../components/products/ProductCard';
import ProductCardSkeleton from '../components/products/ProductCardSkeleton';
import Card from '../components/ui/Card';
import Pagination from '../components/ui/Pagination';
import useDebounce from '../hooks/useDebounce';
import { getProducts } from '../api/productApi';

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');

  const page = useMemo(() => Number(searchParams.get('page') || '1'), [searchParams]);
  const limit = useMemo(() => Number(searchParams.get('limit') || '12'), [searchParams]);
  const search = useMemo(() => searchParams.get('search') || '', [searchParams]);
  const category = useMemo(() => searchParams.get('category') || '', [searchParams]);
  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);
      if (debouncedSearch) {
        next.set('search', debouncedSearch);
      } else {
        next.delete('search');
      }
      next.set('page', '1');
      next.set('limit', String(limit));
      return next;
    }, { replace: true });
  }, [debouncedSearch, limit, setSearchParams]);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await getProducts({
          page,
          limit,
          ...(search ? { search } : {}),
          ...(category ? { category } : {}),
        });
        const nextProducts = response.data?.data?.products || [];
        setProducts(nextProducts);
        setPagination(response.data?.data?.pagination || null);
        setCategories((prev) => {
          const fromResult = nextProducts.map((item) => item.category).filter(Boolean);
          return Array.from(new Set([...prev, ...fromResult]));
        });
      } catch (fetchError) {
        setError(fetchError.response?.data?.message || 'Failed to load products.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [search, category, page, limit]);

  const changeFilter = (nextCategory) => {
    const next = new URLSearchParams(searchParams);
    if (nextCategory) {
      next.set('category', nextCategory);
    } else {
      next.delete('category');
    }
    next.set('page', '1');
    next.set('limit', String(limit));
    setSearchParams(next);
  };

  const onPageChange = (nextPage) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', String(nextPage));
    next.set('limit', String(limit));
    setSearchParams(next);
  };

  const onLimitChange = (event) => {
    const next = new URLSearchParams(searchParams);
    next.set('limit', event.target.value);
    next.set('page', '1');
    setSearchParams(next);
  };

  return (
    <PageTransition>
      <section className="space-y-6">
        <Card className="bg-gradient-to-r from-slate-900 to-slate-700 text-white">
          <p className="text-sm uppercase tracking-widest text-slate-300">Discover</p>
          <h1 className="heading-font mt-2 text-3xl font-bold sm:text-4xl">Fresh drops for your wardrobe</h1>
          <div className="relative mt-4 w-full max-w-xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
            <input
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search for shirts, shoes, brands"
              className="w-full rounded-xl border border-white/30 bg-white/10 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-300 outline-none focus:border-white/70"
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-200">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1">
              <Filter className="h-3.5 w-3.5" />
              Search: {search || 'All'}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1">Category: {category || 'All'}</span>
            <span className="rounded-full bg-white/10 px-3 py-1">Items: {pagination?.total || 0}</span>
          </div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <CategoryFilterSidebar
            categories={categories}
            selectedCategory={category}
            onSelectCategory={changeFilter}
          />

          <div className="space-y-5">
            <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2 shadow-soft">
              <p className="text-sm text-slate-600">Page {pagination?.page || page} of {pagination?.totalPages || 1}</p>
              <label className="text-sm text-slate-600">
                Show
                <select
                  value={limit}
                  onChange={onLimitChange}
                  className="ml-2 rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm"
                >
                  <option value="8">8</option>
                  <option value="12">12</option>
                  <option value="16">16</option>
                  <option value="20">20</option>
                </select>
              </label>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: limit }).map((_, index) => (
                  <ProductCardSkeleton key={`skeleton_${index + 1}`} />
                ))}
              </div>
            ) : null}

            {!isLoading && error ? (
              <Card>
                <p className="text-sm text-rose-600">{error}</p>
              </Card>
            ) : null}

            {!isLoading && !error && products.length === 0 ? (
              <Card className="text-center">
                <SearchX className="mx-auto mb-2 h-8 w-8 text-slate-400" />
                <p className="text-slate-700">No products found for your query.</p>
              </Card>
            ) : null}

            {!isLoading && !error && products.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            ) : null}

            <Pagination
              page={pagination?.page || page}
              totalPages={pagination?.totalPages || 1}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default ProductsPage;
