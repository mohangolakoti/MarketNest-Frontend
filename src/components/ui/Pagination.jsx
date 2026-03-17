import Button from './Button';

function Pagination({ page, totalPages, onPageChange, className = '' }) {
  if (!totalPages || totalPages <= 1) {
    return null;
  }

  const pages = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);

  for (let i = start; i <= end; i += 1) {
    pages.push(i);
  }

  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
      <Button variant="secondary" onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
        Previous
      </Button>
      {pages.map((current) => (
        <Button
          key={current}
          variant={current === page ? 'primary' : 'secondary'}
          onClick={() => onPageChange(current)}
          className="min-w-10"
        >
          {current}
        </Button>
      ))}
      <Button variant="secondary" onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>
        Next
      </Button>
    </div>
  );
}

export default Pagination;
