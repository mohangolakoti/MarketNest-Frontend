function ProductCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-soft">
      <div className="h-56 w-full bg-slate-200" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-3/4 rounded bg-slate-200" />
        <div className="h-3 w-full rounded bg-slate-200" />
        <div className="h-3 w-2/3 rounded bg-slate-200" />
        <div className="mt-3 h-8 w-full rounded bg-slate-200" />
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
