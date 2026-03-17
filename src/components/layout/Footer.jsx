function Footer() {
  return (
    <footer className="mt-16 border-t border-white/80 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>Copyright {new Date().getFullYear()} MarketNest. Built for modern fashion commerce.</p>
        <p className="font-medium text-slate-800">Brand-first storefronts. Customer-first browsing.</p>
      </div>
    </footer>
  );
}

export default Footer;
