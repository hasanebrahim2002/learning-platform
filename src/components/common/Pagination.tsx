import type { PaginationType } from "../../types/course";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import { motion } from "framer-motion";
import Button from "./Button";

interface PaginationProps {
  data: PaginationType;
  onPageChange: (newPage: number) => void;
}

const Pagination = ({ data, onPageChange }: PaginationProps) => {
  if (!data || typeof data.totalPages !== "number" || data.totalPages <= 1) {
    return null;
  }

  const pages: (number | string)[] = [];

  if (data.totalPages <= 5) {
    for (let i = 1; i <= data.totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    if (data.page > 3) {
      pages.push("...");
    }

    const start = Math.max(2, data.page - 1);
    const end = Math.min(data.totalPages - 1, data.page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (data.page < data.totalPages - 2) {
      pages.push("...");
    }

    pages.push(data.totalPages);
  }

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex items-center justify-center gap-2 select-none"
    >
      <Button
        size="sm"
        variant="outline"
        disable={!data.hasPrevious}
        onClick={() => onPageChange(data.page - 1)}
        className="px-2.5 sm:px-3 gap-1 hover:border-primary transition-all"
      >
        <IoMdArrowRoundBack className="text-base" />
        <span className="hidden sm:inline">previous</span>
      </Button>

      <div className="flex items-center gap-1 sm:gap-1.5 bg-gray-50 dark:bg-gray-900/50 p-1.5 rounded-xl border border-gray-200/80 dark:border-gray-800">
        {pages.map((item, index) => {
          if (item === "...") {
            return (
              <span
                key={`dots-${index}`}
                className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-gray-400"
              >
                ...
              </span>
            );
          }

          const pageNumber = Number(item);
          const isActive = pageNumber === data.page;

          return (
            <div key={pageNumber} className="relative">
              <Button
                size="sm"
                variant={isActive ? "primary" : "ghost"}
                onClick={() => onPageChange(pageNumber)}
                className={`min-w-8 sm:min-w-9 h-8 sm:h-9 px-0! text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "shadow-md shadow-primary/20 scale-105"
                    : "hover:bg-gray-200/60 dark:hover:bg-gray-800"
                }`}
              >
                {pageNumber}
              </Button>

              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </div>
          );
        })}
      </div>

      <Button
        size="sm"
        variant="outline"
        disable={!data.hasNext}
        onClick={() => onPageChange(data.page + 1)}
        className="px-2.5 sm:px-3 gap-1 hover:border-primary transition-all"
      >
        <span className="hidden sm:inline">next</span>
        <IoMdArrowRoundForward className="text-base" />
      </Button>
    </nav>
  );
};

export default Pagination;
