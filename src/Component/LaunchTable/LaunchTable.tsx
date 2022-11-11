import React, { FunctionComponent, useEffect, useState } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

import './LaunchTable.scss'

interface LaunchTableProps {
    customClass?: string,
    headerLabels: string[],
    columnSize: number[],
    launchData: { [key:string] : string }[] | null,
}

const LaunchTable: FunctionComponent<LaunchTableProps> = (props) => {
    console.log(props.launchData)
    return <div className='p-0 launchTable'>
        <Row className='launchTableHeader'>
            {
                props.headerLabels.map((label:string, index:number) => <Col key={index} md={props.columnSize[index]} className='px-1'>{label}</Col>)
            }
        </Row>
        {
            !!!props.launchData && <Row className='notFound my-5'>No results found for the specified filter</Row>
        }
        {
            !!props.launchData && <div className='launchRecords mt-2'>
                {
                    props.launchData.map((launchData:any, index:number) => <Row key={`launch_${index}`} className="launchRecord">
                        <Col md={props.columnSize[0]}>{launchData.flight_number}</Col>
                        <Col md={props.columnSize[1]}>{launchData.launch_date_utc}</Col>
                        <Col md={props.columnSize[2]}>{launchData.site_name}</Col>
                        <Col md={props.columnSize[3]}>{launchData.mission_name}</Col>
                        <Col md={props.columnSize[4]}>{launchData.orbit}</Col>
                        <Col md={props.columnSize[5]}>{launchData.launch_success ? 'passed':'failed'}</Col>
                        <Col md={props.columnSize[6]}>{launchData.rocket_name}</Col>
                    </Row>)
                }
            </div>
        }
    </div>;
}
 
export default LaunchTable;