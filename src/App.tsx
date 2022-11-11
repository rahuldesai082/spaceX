import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import "./App.scss";
import Header from './Component/Header';
import Dropdown from './Component/Dropdown/Dropdown';
import { AiOutlineCalendar } from 'react-icons/ai';
import { IoIosArrowDown, IoMdRocket } from 'react-icons/io';
import { CiFilter } from 'react-icons/ci';
import LaunchTable from './Component/LaunchTable/LaunchTable';
import axios from 'axios';
import Pagination from 'react-bootstrap/esm/Pagination';

function App() {
  const filterOptions1:string[] = ['Past 1 Month', 'Past 2 Month'];
  const filterOptions2:string[] = ['All Launches', 'Upcoming launches', 'Successful launches', 'Failed launches' ];
  const launchTableHeaderLabel = [ 'No.', 'Launched (UTC)', 'Location', 'Mission', 'Orbit', 'Launch Status', 'Rocket' ];
  const launchTableColSize = [ 1, 3, 2, 2, 1, 2, 1 ];

  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [launchData, setLaunchData] = useState([]);

  const fetchLaunchData = useCallback(() => {
    axios.get(`https://api.spacexdata.com/v3/launches`)
      .then((response:any) => {
        const launchData = prepareLaunchData(!!response.data ? response.data : []);
        !!launchData.length && setLaunchData(launchData);
      });
  },[]);

  const prepareLaunchData = (launchDataList:{[key:string] : any}[]) => {
    const structuredLaunchData:any = launchDataList.map((launchData:any) => {
      return {
        flight_number: launchData?.flight_number,
        launch_date_utc: launchData?.launch_date_utc,
        site_name: launchData?.launch_site?.site_name,
        mission_name: launchData?.mission_name,
        orbit: launchData?.rocket?.second_stage?.payloads[0]?.orbit,
        launch_success: launchData?.launch_success,
        rocket_name: launchData?.rocket?.rocket_name
      };
    });
    return structuredLaunchData;
  };

  useEffect(() => {
    fetchLaunchData()
  },[fetchLaunchData])

  const handleLaunchFilter1 = (option:string) => {
    console.log({ options1: option})
  };
  const handleLaunchFilter2 = (option:string) => {
    console.log({ options2: option})
  };
  console.log({launchData})
  return (
    <div className="App">
      <Header/>
      <Container>
        <div className='filters my-4'>
          <Dropdown
            placeholder={<span>Launch duration</span>}
            options={filterOptions1}
            onSelect={handleLaunchFilter1}
            icons={{prefix: AiOutlineCalendar, postfix: IoIosArrowDown}}
          />
          <Dropdown
            defaultValue= {filterOptions2[0]}
            placeholder= {<span>Launch filter</span>}
            options= {filterOptions2}
            onSelect= {handleLaunchFilter2}
            icons= {{ prefix: CiFilter, postfix: IoIosArrowDown }}
          />
        </div>
        <LaunchTable headerLabels= { launchTableHeaderLabel } columnSize= { launchTableColSize} launchData= { launchData }/>
        <Pagination className='justify-content-end mt-2' >
          <Pagination.Prev/>
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Ellipsis />
          <Pagination.Item>{10}</Pagination.Item>
          <Pagination.Item>{11}</Pagination.Item>
          <Pagination.Item active>{12}</Pagination.Item>
          <Pagination.Next/>
        </Pagination>
      </Container>
    </div>
  );
}

export default App;
