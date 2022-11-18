import { jsonObject, launchDetailsObject, launchType } from "./Interface";

export const serialize:any = function(obj:any, prefix?:any) {
    var str = [],
      p;
    for (p in obj) {
      if (obj.hasOwnProperty(p)) {
        var k = prefix ? prefix + "[" + p + "]" : p,
          v = obj[p];
        str.push((v !== null && typeof v === "object") ?
          serialize(v, k) :
          encodeURIComponent(k) + "=" + encodeURIComponent(v));
      }
    }
    return str.join("&");
  }

export const prepareLaunchData = (launchDataList:jsonObject[]) => {
    const structuredLaunchData:any = launchDataList.map((launchData:jsonObject) => {
      return {
        id:launchData?._id,
        flight_number: launchData?.flight_number,
        launch_date_utc: launchData?.launch_date_utc,
        site_name: launchData?.launch_site?.site_name,
        mission_name: launchData?.mission_name,
        orbit: launchData?.rocket?.second_stage?.payloads[0]?.orbit,
        launch_success: launchData?.launch_success,
        rocket_name: launchData?.rocket?.rocket_name,
        upcoming: launchData?.upcoming,
      };
    });
    return structuredLaunchData;
  };

  export const prepareLaunchDetailsData = (launchData:jsonObject) => {
    return {
      id: launchData?._id,
      mission_patch: launchData?.links?.mission_patch,
      flight_number: launchData?.flight_number,
      mission_name: launchData?.mission_name,
      upcoming: launchData?.upcoming,
      launch_success: launchData?.launch_success,
      rocket_name: launchData?.rocket?.rocket_name,
      article_link: launchData?.links?.article_link,
      wikipedia: launchData?.links?.wikipedia,
      video_link: launchData?.links?.video_link,
      details: launchData?.details,
      rocket_type: launchData?.rocket?.rocket_type,
      manufacturer: launchData?.rocket?.second_stage?.payloads[0]?.manufacturer,
      nationality: launchData?.rocket?.second_stage?.payloads[0]?.nationality,
      launch_date_utc: launchData?.launch_date_utc,
      payload_type: launchData?.rocket?.second_stage?.payloads[0]?.payload_type,
      orbit: launchData?.rocket?.second_stage?.payloads[0]?.orbit,
      site_name: launchData?.launch_site?.site_name,
    }
  }