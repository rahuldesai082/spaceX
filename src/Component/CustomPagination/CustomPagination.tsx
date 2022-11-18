import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/esm/Pagination';
import { paginationAction } from '../../Utils/Interface';
interface CustomPaginationProps {
    customClass?: string;
    current_page: number,
    totalPages: number,
    handlePageClick: (page: number) => void,
}
 
const CustomPagination: FunctionComponent<CustomPaginationProps> = ({ current_page, totalPages, customClass, handlePageClick }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const [pages, setPages] = useState<string[]>([]);
    const [pageNav, setPageNav] = useState<string[]>([]);

    const initCurrentPage = useCallback(()=>{
        setCurrentPage(current_page);
    },[current_page])

    useEffect(() => {
        initCurrentPage()
    },[initCurrentPage])
    
    const genPages = useCallback((pages:string[], current:number) => {
        const first = (page:number) => page === 1;
        const middle = (page:number, between:{bet : number, ween : number}) => page > between.bet && page <= between.ween;
        const last = (page:number) => page === totalPages
        const mid = Math.ceil(totalPages/2);
        const between = {
            bet: 0,
            ween: 0
        };
        if(current <= mid) {
            between.bet = 1;
            between.ween = mid;
        } else if(current > totalPages - 2) {
            between.bet = totalPages - mid + 1;
            between.ween = totalPages - 1;       
        } else {
            between.bet = current - 2;
            between.ween = current + 1;
        }
        const allPages:string[] = pages.filter(page => first(Number(page)) || middle(Number(page), between) || last(Number(page)));
        return addEtc(allPages);
    },[totalPages])

    const generatePagination= useCallback((totalPage:number) => {
        const pages:string[] = [];
        for(var i=1; i<=totalPage; i++) {
            pages.push(i.toString());
        }
        setPages(pages);
        setPageNav((pageNav) => {
            return [...genPages(pages, currentPage)]
        });
    },[ genPages, currentPage]);
    
    useEffect(() => {
        generatePagination(totalPages);
    },[generatePagination, totalPages]);
    
    function addEtc(pages:string[]) {
        if(pages.length <= 1) {
            return pages;
        }
        var lastPage = pages[pages.length - 1];
        var secondLast = pages[pages.length - 2];
        parseInt(pages[0]) + 1 !== parseInt(pages[1]) && pages.splice(1, 0, "...");
        parseInt(lastPage) !== parseInt(secondLast) + 1 && pages.splice(pages.length - 1, 0, "...");
        return pages;
    }
    
    function onClick(curr:number, type:string) {
        if(isNaN(curr)) return;
        if (type === paginationAction.PREV && currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setPageNav([...genPages(pages, curr - 1)]);
        } else if (type === paginationAction.NEXT && curr < totalPages) {
            setCurrentPage(currentPage + 1);
            setPageNav([...genPages(pages, curr + 1)]);
        } else {
            setCurrentPage(curr);
            setPageNav([...genPages(pages, curr)]);
        }
        handlePageClick(curr);
    }
    
    return <Pagination className={`${customClass ? customClass : ''}`}>
        {
            currentPage > 1 && <Pagination.Prev onClick={()=>onClick(currentPage-1, paginationAction.PREV)}/>
        }
        {
            pageNav.map((page, index) => {
                return <Pagination.Item key={index} active={page === currentPage.toString()} onClick={()=>onClick(parseInt(page), '')}>{page}</Pagination.Item>
            })
        }
        {currentPage < totalPages && <Pagination.Next onClick={()=>onClick(currentPage+1, paginationAction.NEXT)}/>}
    </Pagination>;
}
 
export default CustomPagination;