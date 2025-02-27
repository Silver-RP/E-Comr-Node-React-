import React from "react";
import "../../../assets/app/css/Pagination.css"

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}



const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <nav className="pagination-container">
      {/* PREV Button */}
      <button 
        className="btn" 
        disabled={currentPage === 1} 
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
      >
        PREV
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={`page-btn ${page === currentPage ? "active" : ""}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* NEXT Button */}
      <button 
        className="btn" 
        disabled={currentPage === totalPages} 
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
      >
        NEXT
      </button>
    </nav>
  );
};

export default Pagination;
