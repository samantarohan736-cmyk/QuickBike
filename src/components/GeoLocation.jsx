import React, {useEffect,useState} from 'react'
import { useNavigate , useLocation} from "react-router-dom";
const GeoLocation = () => {
    const[geo,setGeo]=useState({lat:'',long:''})
    useEffect(() => {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            (position)=>{
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                
                setGeo({
                    lat:latitude,
                    long:longitude
                })
                
            },
            (error)=>{
                console.log("Error Code = " + error.code + " - ");
                
            }
        );
      }else{
        console.log("Geo Location is not supported by this enviroment");
        
      }
    
      
    }, [])

  return (
    <div>
        <div>latitude:{geo.lat}</div>
        <div>longitude:{geo.long}</div>
    
        
    </div>
    
  )
}

export default GeoLocation