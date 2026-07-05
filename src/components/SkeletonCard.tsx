export default function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Shimmer />
      </div>
      <div className="space-y-3 p-4">
        <div className="relative h-5 w-3/4 overflow-hidden rounded bg-muted">
          <Shimmer />
        </div>
        <div className="relative h-4 w-full overflow-hidden rounded bg-muted">
          <Shimmer />
        </div>
        <div className="relative h-4 w-1/3 overflow-hidden rounded bg-muted">
          <Shimmer />
        </div>
      </div>
    </div>
  );
}

function Shimmer() {
  return (
    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-background/50 to-transparent [animation:shimmer_1.5s_infinite] motion-reduce:animate-none" />
  );
}
