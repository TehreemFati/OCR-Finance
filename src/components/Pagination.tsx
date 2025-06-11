// components/Pagination.tsx
import React, { type ChangeEvent } from 'react';
import { DOTS, usePagination } from '../hooks/usePagination'; // Adjust path
import { listingLimitValues } from '../types/enums';

interface PaginationProps {
    currentPage: number;
    limit: number;
    totalCount: number;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
    limitOptions?: number[];
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    limit,
    totalCount,
    onPageChange,
    onLimitChange,
    // limitOptions = Object.values(listingLimitEnum).map(Number),
    limitOptions = listingLimitValues,
}) => {
    const totalPages = Math.ceil(totalCount / limit);

    const paginationRange = usePagination({
        currentPage,
        limit,
        totalCount,
        siblingCount: 1,
    });

    const handleLimitChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onLimitChange(Number(e.target.value));
    };

    return (
        <>
            {/* {totalCount > 0 && ( */}
                <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap">
                    {/* Limit Selector */}
                    <div className="form-group d-flex align-items-center gap-2">
                        <label className="mb-0">Show</label>
                        <select
                            className="form-select form-select-sm"
                            value={limit}
                            onChange={handleLimitChange}
                        >
                            {limitOptions.map((n) => (
                                <option key={n} value={n}>
                                    {n}
                                </option>
                            ))}
                        </select>
                        <label className="mb-0">entries</label>
                    </div>

                    {/* Pagination Controls */}
                    <nav aria-label="Page navigation">
                        <ul className="pagination mb-0">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button
                                    className="page-link"
                                    onClick={() => onPageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                            </li>
                            {paginationRange?.map((pageNumber: number | string, index: number) => (
                                <li
                                    key={index}
                                    className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}
                                >
                                    {pageNumber === DOTS ? (
                                        <span className="page-link">...</span>
                                    ) : (
                                        <button
                                            className="page-link"
                                            onClick={() => onPageChange(pageNumber as number)}
                                        >
                                            {pageNumber}
                                        </button>
                                    )}
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button
                                    className="page-link"
                                    onClick={() => onPageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            {/* )} */}
        </>
    );
};

export default Pagination;