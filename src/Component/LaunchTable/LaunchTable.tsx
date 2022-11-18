import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import Alert from 'react-bootstrap/esm/Alert';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useSearchParams } from 'react-router-dom';
import { recordsPerPage } from '../../Utils/Constants';
import { launchObject } from '../../Utils/Interface';
import CustomPagination from '../CustomPagination/CustomPagination';

import './LaunchTable.scss'

interface LaunchTableProps {
    error: string;
    isLoading?: boolean,
    customClass?: string,
    headerLabels: string[],
    columnSize: number[],
    launchData: launchObject[] | null,
    totalRecords: number,
    onClick?: (launchId: string) => void
}

const LaunchTable: FunctionComponent<LaunchTableProps> = (props) => {
    
    const [offset, setOffset] = useState<number>(0);
    const [launchRecords, setLaunchRecords] = useState<launchObject[]>([]);
    let [searchParams, setSearchParams] = useSearchParams();
    
    const initiateOffset = useCallback(() =>{
        let page = (parseInt(searchParams.get('page') || '0') - 1) * recordsPerPage;
        setOffset(page > 0 ? page : 0);
        if(props?.launchData)
            props?.launchData?.length && setLaunchRecords(props.launchData.slice(offset, offset + recordsPerPage))
    },[searchParams, offset, props.launchData])

    useEffect(() => {
        initiateOffset();
        return ()=> {
            setLaunchRecords([]);
            setOffset(0);
        }
    },[initiateOffset]);

    const handlePaginationChange = (page: number) => {
        searchParams.set('page', page.toString());
        setSearchParams(searchParams);
    }
    return <>
        <div className='p-0 launchTable'>
            <Row className='launchTableHeader'>
                {
                    props.headerLabels.map((label:string, index:number) => <Col key={index} md={props.columnSize[index]} className='px-1'>{label}</Col>)
                }
            </Row>
            {
                <div className='launchRecords mt-2'>
                    { props.isLoading ? <Row className='loader my-5'><AiOutlineLoading3Quarters size='24px'/></Row> :
                        props?.error ? <Row className='notFound my-5'>{props.error}</Row> :
                        launchRecords.map((launchData:launchObject) => {
                            return <Row key={launchData.id} className="launchRecord" onClick={()=>{props.onClick && props.onClick(launchData.id)}}>
                                <Col className={'px-1'} md={props.columnSize[0]}>{launchData.flight_number}</Col>
                                <Col className={'px-1'} md={props.columnSize[1]}>{launchData.launch_date_utc}</Col>
                                <Col className={'px-1'} md={props.columnSize[2]}>{launchData.site_name}</Col>
                                <Col className={'px-1'} md={props.columnSize[3]}>{launchData.mission_name}</Col>
                                <Col className={'px-1'} md={props.columnSize[4]}>{launchData.orbit}</Col>
                                <Col className={'px-1'} md={props.columnSize[5]}>
                                {
                                    launchData.upcoming ? <Alert className='launchStatus' variant="warning">Upcoming</Alert> : (launchData.launch_success ? <Alert className='launchStatus' variant="success">Passed</Alert>:<Alert className='launchStatus' variant="danger">Failed</Alert>)
                                }
                                </Col>
                                <Col md={props.columnSize[6]}>{launchData.rocket_name}</Col>
                            </Row>
                        })
                    }
                </div>
            }
        </div>
        {
            !props.isLoading && <CustomPagination
                customClass='mt-4 justify-content-end'
                totalPages= { Math.ceil(props.totalRecords/recordsPerPage) }
                handlePageClick= { handlePaginationChange }
                current_page= { parseInt(searchParams.get('page')||'1') }
            />
        }
    </>;
}
 
export default LaunchTable;