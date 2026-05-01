export default function GoldDivider({ className = "" }) {
  return (
    <div className={`relative my-2 flex items-center gap-4 ${className}`}>
      <div className="h-px flex-1 bg-gold-line" />
      <div className="h-1.5 w-1.5 rounded-full bg-gold" />
      <div className="h-px flex-1 bg-gold-line" />
    </div>
  );
}
