export interface LaunchDataQueryParams {
    id?:boolean
    limit?:number,
    order?:'asec'|'desc',
    offset?:number,
    flight_id?:string
}
export interface jsonObject {
    [key:string] : any
}
export interface dropdownOption {
    optionLabel: string,
    optionValue: string
}
export interface launchObject {
    id:string,
    flight_number: number,
    launch_date_utc: string,
    site_name: string,
    mission_name: string,
    orbit: string,
    launch_success: string,
    rocket_name: string,
    upcoming: boolean
}

export interface launchDetailsObject extends launchObject {
      mission_patch: string,
      article_link: string,
      wikipedia: string,
      video_link: string,
      details: string,
      rocket_type: string,
      manufacturer: string,
      nationality: string,
      payload_type: string,
      site_name: string,
}

// enums

export enum launchType {
    UPCOMING='upcoming',
    PAST='past',
    SUCCESS='success',
    FAIL='fail',
    ALL=''
};

export enum launchPastOption {
    ALL='',
    PAST_WEEK='past_week',
    PAST_1_MONTH='past_1_month',
    PAST_6_MONTH='past_6_month',
    PAST_1_YEAR='past_1_year',
};

export enum paginationAction {
    NEXT='next',
    PREV='prev'
}