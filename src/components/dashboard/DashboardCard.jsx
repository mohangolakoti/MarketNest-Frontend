function DashboardCard({ title, value, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-white/70 bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="heading-font mt-1 text-3xl font-bold text-slate-900">{value}</p>
        </div>
        <span className="rounded-xl bg-slate-100 p-2.5 text-slate-700">
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </div>
  );
}

export default DashboardCard;
