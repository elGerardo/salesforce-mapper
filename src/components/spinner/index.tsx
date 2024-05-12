export default function Spinner({ className = "" }: { className?: string }) {
  return (
    <div
      className={`border-c-gray-200 h-10 w-10 animate-spin rounded-full border-4 border-t-c-gray-300 ${className}`}
    />
  );
}