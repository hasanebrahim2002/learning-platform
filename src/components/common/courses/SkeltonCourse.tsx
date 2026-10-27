// src/components/common/CourseCardSkeleton.tsx

export const CourseCardSkeleton = () => {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900 animate-pulse">
      <div className="relative h-48 w-full bg-gray-200 dark:bg-neutral-800">
        <div className="absolute top-3 inset-s-3 h-6 w-20 rounded-full bg-gray-300 dark:bg-neutral-700" />

        <div className="absolute top-3 inset-e-3 h-6 w-12 rounded-full bg-gray-300 dark:bg-neutral-700" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-gray-200 dark:bg-neutral-800" />
          <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-neutral-800" />
        </div>

        <div className="mt-5 flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-full bg-gray-200 dark:bg-neutral-800" />
          <div className="h-3 w-24 rounded bg-gray-200 dark:bg-neutral-800" />
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-neutral-800">
          <div className="space-y-1.5">
            <div className="h-2.5 w-10 rounded bg-gray-200 dark:bg-neutral-800" />
            <div className="h-4 w-12 rounded bg-gray-200 dark:bg-neutral-800" />
          </div>

          <div className="h-8 w-28 rounded-lg bg-gray-200 dark:bg-neutral-800" />
        </div>
      </div>
    </div>
  );
};

export default CourseCardSkeleton;
