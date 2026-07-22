interface StatsBarProps {
  totalContacts: number;
  favoriteCount: number;
  recentCount: number;
}

export default function StatsBar({ totalContacts, favoriteCount, recentCount }: StatsBarProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-card border border-border/60 rounded-2xl p-4 transition-all hover:shadow-sm">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Contacts</p>
        <p className="text-2xl font-semibold text-foreground mt-1">{totalContacts}</p>
      </div>
      <div className="bg-card border border-border/60 rounded-2xl p-4 transition-all hover:shadow-sm">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Favorites</p>
        <p className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mt-1">{favoriteCount}</p>
      </div>
      <div className="bg-card border border-border/60 rounded-2xl p-4 transition-all hover:shadow-sm">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Added Today</p>
        <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400 mt-1">{recentCount}</p>
      </div>
    </div>
  );
}