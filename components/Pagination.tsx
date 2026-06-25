"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { formUrlQuery } from "@/lib/utils";

export const Pagination = ({
  page,
  totalPages,
}: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (type: "prev" | "next") => {
    const pageNumber = type === "prev" ? page - 1 : page + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: pageNumber.toString(),
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div
      className="
        flex items-center justify-between
        rounded-2xl border border-gray-100
        bg-white px-4 py-3
        shadow-sm
      "
    >
      {/* Previous */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleNavigation("prev")}
        disabled={page <= 1}
        className="
          gap-2 rounded-xl
          transition-all duration-300
          disabled:opacity-40
        "
      >
        <Image
          src="/icons/arrow-left.svg"
          alt="Previous"
          width={16}
          height={16}
        />
        Previous
      </Button>

      {/* Page Info */}
      <div className="flex flex-col items-center">
        <span className="text-xs text-gray-500">
          Current Page
        </span>

        <span className="text-lg font-bold text-gray-900">
          {page}
          <span className="mx-1 text-gray-400">/</span>
          {totalPages}
        </span>
      </div>

      {/* Next */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleNavigation("next")}
        disabled={page >= totalPages}
        className="
          gap-2 rounded-xl
          transition-all duration-300
          disabled:opacity-40
        "
      >
        Next
        <Image
          src="/icons/arrow-left.svg"
          alt="Next"
          width={16}
          height={16}
          className="-scale-x-100"
        />
      </Button>
    </div>
  );
};