import {useEffect, useState} from "react";

export default function useRequest(request){
    const [data,setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        request()
            .then((response)=>response.json())
            .then(data=>{setData(data)})
            .catch(error=>{setError(error)})
            .finally(() => setLoading(false));
    },[]);

    return [data,loading,error];
}