import React, { useState} from 'react';

export const useCustomPagination = (totalRecords: number, recordsPerPage: number) => {
    const totalPages:number = Math.ceil(totalRecords / recordsPerPage);
    const [startPageIndex, setStartPageIndex] = useState<number>(0);
    const [endPageIndex, setEndPageIndex] = useState<number>(recordsPerPage - 1);
    const [currentPage, setCurrentPage] = useState<number>(1);

    function handlePageChange(page: number) {
        setCurrentPage(page);
        const startPageIndex = (page * recordsPerPage) - 1;
        const endPageIndex = (page * recordsPerPage) - recordsPerPage;
        setStartPageIndex(startPageIndex);

        if(endPageIndex > totalRecords) {
            setEndPageIndex(totalRecords-1);
        } else {
            setEndPageIndex(endPageIndex);
        }
    };
    return { startPageIndex, endPageIndex, totalPages, currentPage, handlePageChange };
}