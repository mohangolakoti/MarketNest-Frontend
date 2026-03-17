import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';

function ProductCard({ product }) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
      <Card className="group overflow-hidden p-0 transition duration-300 hover:shadow-xl">
        <img
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200'}
          alt={product.title}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="space-y-3 p-4">
          <p className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
            {product.category}
          </p>
          <div>
            <h3 className="heading-font line-clamp-1 text-lg font-semibold text-slate-900">{product.title}</h3>
            <p className="line-clamp-2 text-sm text-slate-600">{product.description}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-slate-900">${Number(product.price).toFixed(2)}</p>
            <Link
              to={`/product/${product.id}`}
              className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              View
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default ProductCard;
