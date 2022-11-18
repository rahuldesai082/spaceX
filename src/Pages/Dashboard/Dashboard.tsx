import React, {FunctionComponent, useCallback, useEffect, useState} from 'react';
import Container from 'react-bootstrap/esm/Container';
import { AiOutlineCalendar } from 'react-icons/ai';
import { CiFilter } from 'react-icons/ci';
import { IoIosArrowDown } from 'react-icons/io';
import { useSearchParams } from 'react-router-dom';
import Dropdown from '../../Component/Dropdown/Dropdown';
import Header from '../../Component/Header';
import LaunchInfoModal from '../../Component/LaunchInfoModal/LaunchInfoModal';
import LaunchTable from '../../Component/LaunchTable/LaunchTable';
import { filterOptions1, filterOptions2, launchTableHeaderLabel, launchTableColSize, baseUrl } from '../../Utils/Constants';
import { dropdownOption, launchDetailsObject, launchObject, launchPastOption, launchType } from '../../Utils/Interface';
import { fetchLaunchData } from '../../Utils/Services';
import { prepareLaunchData, prepareLaunchDetailsData } from '../../Utils/Utils';
interface DashboardProps {
    
}
 
const Dashboard: FunctionComponent<DashboardProps> = () => {
  
  let [searchParams, setSearchParams] = useSearchParams();
  
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  
  const [launchData, setLaunchData] = useState<launchObject[]>([]);
  const [error, setError] = useState<string>('');

  const [showLaunchDetails, setShowLaunchDetails] = useState<boolean>(false);
  const [launchError, setLaunchError] = useState<string>('');
  const [launchDetailsLoader, setLaunchDetailsLoader] = useState<boolean>(false);
  const [launchDetail, setLaunchDetail] = useState<launchDetailsObject | null>(null);
  
  const handleFilterApiCall = useCallback(async (launchCategory?:string, pastLaunch?:string) => {
    setLoading(true);
    let endDate:string = new Date().toISOString().split('T')[0];
    
    let url:string = baseUrl;
    
    let queryParams = '?id=true';

    switch(pastLaunch) {
      case launchPastOption.PAST_WEEK: 
      queryParams += `&start=${new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0]}&end=${endDate}`;
        break;
      case launchPastOption.PAST_1_MONTH:
        queryParams += `&start=${new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0]}&end=${endDate}`;
        break;
      case launchPastOption.PAST_6_MONTH: 
        queryParams += `&start=${new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString().split('T')[0]}&end=${endDate}`;
        break;
      case launchPastOption.PAST_1_YEAR:
        queryParams += `&start=${new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0]}&end=${endDate}`;
        break;
    }
    switch(launchCategory) {
      case launchType.UPCOMING : url += 'upcoming';
        break;
      case launchType.SUCCESS : queryParams+= `&launch_success=true`;
        break;
      case launchType.FAIL : queryParams+= `&launch_success=false`;
        break;
    }
    const apiUrl:string = `${url}${queryParams}`;

    const [ LaunchRecords, error2 ] = await fetchLaunchData(apiUrl);
    if(error2) {
      setError(error2);
      return;
    }
    const launch_data = prepareLaunchData(!!LaunchRecords ? LaunchRecords : []);
    if(!launch_data.length)
      setError('No results found for the specified filter');

    setLaunchData(launch_data)
    setTotalRecords(launch_data.length);
    
    setLoading(false);
  },[])

  useEffect(() => {
    const launchCategory:string = searchParams.get('launch_category')||'';
    const pastLaunch:string = searchParams.get('past_launch')||'';
    !searchParams.has('page') && handleFilterApiCall(launchCategory, pastLaunch);
    return () => {
      setError('');
      setLoading(false);
    }
  }, [handleFilterApiCall, searchParams])

  const handleLaunchFilter = (option:string|dropdownOption, key?:string) => {
    const optionValue:string = typeof option==='string' ? option : option.optionValue;
    searchParams.delete('page');
    if(key)
      !!!optionValue ? searchParams.delete(key) : searchParams.set(key, optionValue);
    setSearchParams(searchParams);
  };

  const fetchDefaultOption = (options:dropdownOption[], type:string|null,)=> {
    if(type===null)
      return options[0];
    return options.find((option:dropdownOption) => option.optionValue === type);
  }
  
  const handleLaunchDetails = async (launchId:string) => {
    const launchDetailUrl = `${baseUrl}?flight_id=${launchId}&id=true`;
    setShowLaunchDetails(true);
    setLaunchDetailsLoader(true);
    const [launchDetail, error] = await fetchLaunchData(launchDetailUrl);
    if(error) {
      setLaunchError(error);
      setLaunchDetailsLoader(false);
      return;
    }
    const formattedLaunchDetails = prepareLaunchDetailsData(launchDetail.length > 0 ? launchDetail[0] : []);
    launchDetail && setLaunchDetail(formattedLaunchDetails);
    setLaunchDetailsLoader(false);
  }

  return <>
    <Header/>
    <Container>
        <div className='filters my-4'>
          {
            filterOptions1 && <Dropdown
              placeholder={<span>Launch duration</span>}
              options={filterOptions1}
              onSelect={ handleLaunchFilter }
              icons={{prefix: AiOutlineCalendar, postfix: IoIosArrowDown}}
              queryKey='past_launch'
            />
          }
          {
            filterOptions2 && <Dropdown
              defaultValue= {fetchDefaultOption(filterOptions2, searchParams.get('launch_category'))}
              placeholder= {<span>Launch filter</span>}
              options= {filterOptions2}
              onSelect= { handleLaunchFilter }
              icons= {{ prefix: CiFilter, postfix: IoIosArrowDown }}
              queryKey= 'launch_category'
            />
          }
        </div>
        <LaunchTable
          error= { error || '' }
          isLoading= { loading }
          headerLabels= { launchTableHeaderLabel }
          columnSize= { launchTableColSize}
          launchData= { launchData }
          totalRecords= { totalRecords }
          onClick= { handleLaunchDetails }
          />
          {
            showLaunchDetails && <LaunchInfoModal
              error={ launchError }
              showModal= { showLaunchDetails }
              hideDetails={() => setShowLaunchDetails(false)}
              isLoading={launchDetailsLoader}
              launchDetails={launchDetail}
            />
          }
    </Container>
  </>;
}
 
export default Dashboard;