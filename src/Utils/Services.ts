import axios from "axios";

export const fetchLaunchData = async(launchUrl:string) => {
    try {
        const { data } = await axios.get(launchUrl);
        return [data];
    }
    catch(e){
        return [null, e]
    }
};