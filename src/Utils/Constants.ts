import { dropdownOption, launchPastOption, launchType } from "./Interface";

export const filterOptions1:dropdownOption[] = [
    {optionLabel:'All', optionValue:launchPastOption.ALL},
    {optionLabel:'Past week', optionValue:launchPastOption.PAST_WEEK},
    {optionLabel:'Past 1 month', optionValue:launchPastOption.PAST_1_MONTH},
    {optionLabel:'Past 6 months', optionValue:launchPastOption.PAST_6_MONTH},
    {optionLabel:'Past year', optionValue:launchPastOption.PAST_1_YEAR},
];
export const filterOptions2:dropdownOption[] = [
    { optionLabel: 'All Launches', optionValue: launchType.ALL },
    { optionLabel: 'Upcoming launches', optionValue: launchType.UPCOMING },
    { optionLabel: 'Successful launches', optionValue: launchType.SUCCESS },
    { optionLabel: 'Failed launches', optionValue: launchType.FAIL },
];
export const launchTableHeaderLabel = [ 'No.', 'Launched (UTC)', 'Location', 'Mission', 'Orbit', 'Launch Status', 'Rocket' ];
export const launchTableColSize = [ 1, 3, 2, 2, 1, 2, 1 ];
export const recordsPerPage = 12;
export const baseUrl:string = 'https://api.spacexdata.com/v3/launches/';