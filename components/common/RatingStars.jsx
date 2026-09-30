import { Star } from "lucide-react";

export default function RatingStars({ rating = 5.0, reviewsCount = 0 }) {
  return (
    <div className="flex items-center gap-1.5 text-xs">
      <div className="flex items-center text-amber-500">
        <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
      </div>
      <span className="font-bold text-white text-sm">{rating.toFixed(1)}</span>
      {reviewsCount > 0 && (
        <span className="text-gray-400">({reviewsCount})</span>
      )}
    </div>
  );
}
