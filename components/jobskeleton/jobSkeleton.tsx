const JobCardSkeleton = () => {
  return (
    <div className="group flex flex-col justify-between w-full h-full shadow-md border border-gray-200 rounded-xl overflow-hidden animate-pulse">
      <div className="p-6 flex flex-col space-y-4 h-full">
        {/* Logo & Country */}
        <div className="flex items-center justify-between mb-2">
          <div className="w-16 h-16 rounded-full bg-gray-300"></div>
          <div className="h-4 w-20 bg-gray-300 rounded" />
        </div>

        {/* Title & Posted */}
        <div className="flex justify-between items-center">
          <div className="h-4 w-2/3 bg-gray-300 rounded" />
          <div className="h-4 w-16 bg-gray-300 rounded" />
        </div>

        {/* Category */}
        <div className="h-4 w-32 bg-gray-300 rounded" />

        {/* Description */}
        <ul className="space-y-2">
          <li className="h-3 w-full bg-gray-300 rounded" />
          <li className="h-3 w-5/6 bg-gray-300 rounded" />
        </ul>

        {/* Footer */}
        <div className="mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-x-4">
          <div className="space-y-2">
            <div className="h-3 w-24 bg-gray-300 rounded" />
            <div className="h-3 w-32 bg-gray-300 rounded" />
          </div>
          <div className="flex gap-3">
            <div className="h-8 w-16 bg-gray-300 rounded" />
            <div className="h-8 w-20 bg-gray-300 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCardSkeleton;
