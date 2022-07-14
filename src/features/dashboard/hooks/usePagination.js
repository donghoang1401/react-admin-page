import { useMemo } from "react";

export const usePagination = ({ items, itemPerPages = 10, currentIndex }) => {
  const page = useMemo(() => {
    const res = [];
    for (let i = 0; i < items.length; i += itemPerPages) {
      const chunk = items.slice(i, i + itemPerPages);
      res.push(chunk);
    }
    return res;
  }, [itemPerPages, items]);

  return {
    totalElements: items.length,
    size: itemPerPages,
    totalPages: page.length,
    number: currentIndex-1,
    pageItems: page[currentIndex-1] || [],
  };
};
