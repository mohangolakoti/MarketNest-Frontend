const categoryDefaults = ['men', 'women', 'shoes', 'tshirts', 'accessories', 'ethnic'];

function CategoryFilterSidebar({ categories = [], selectedCategory, onSelectCategory }) {
  const merged = Array.from(new Set([...categoryDefaults, ...categories.filter(Boolean).map((item) => item.toLowerCase())]));

  return (
    <aside className="rounded-2xl border border-white/70 bg-white p-4 shadow-soft">
      <h3 className="heading-font text-lg font-semibold text-slate-900">Categories</h3>
      <div className="mt-3 flex flex-wrap gap-2 lg:flex-col">
        <button
          onClick={() => onSelectCategory('')}
          className={`rounded-lg px-3 py-2 text-sm text-left transition ${!selectedCategory ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
        >
          All Categories
        </button>
        {merged.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`rounded-lg px-3 py-2 text-sm text-left capitalize transition ${selectedCategory?.toLowerCase() === category ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            {category}
          </button>
        ))}
      </div>
    </aside>
  );
}

export default CategoryFilterSidebar;
