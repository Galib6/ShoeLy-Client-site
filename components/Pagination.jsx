import React from "react";

const Pagination = ({
  products,
  currentPage,
  SetCurrentPage,
  postsPerPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(products.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex gap-3 items-center justify-center my-16 md:my-0">
      <button
        className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
        disabled={currentPage === 1}
        onClick={() => SetCurrentPage(currentPage - 1)}
      >
        Previous
      </button>

      {pageNumbers.map((number, i) => (
        <span
          key={i}
          className={`${number === currentPage ? "font-extrabold" : ""}`}
          onClick={() => SetCurrentPage(number)}
        >
          {number}
        </span>
      ))}

      <button
        className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
        disabled={currentPage === pageNumbers.length}
        onClick={() => SetCurrentPage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
