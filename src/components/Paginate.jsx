import React from 'react';

function Paginate({ page, setPage, total, onNext }) {
  const handlePrev = () => {
    if (page === 1) return; // Disable on first page
    setPage(page - 1);
  };

  return (
    <div className="pagination"> {/* Add a class for styling */}
      <button onClick={handlePrev} disabled={page === 1}>Prev</button>
      <span aria-live="polite">{page} / {total}</span> {/* Announce page change for screen readers */}
      <button onClick={onNext} disabled={page === total}>Next</button>
    </div>
  );
}

export default Paginate;
