import React, { useState, useEffect } from 'react';
import DataHook from './DataHook';

const sampleInfo = [
  {
    id: 1,
    title: "IP ADDRESS",
    value: "192.212.174.101"
  },
  {
    id: 2,
    title: "LOCATION",
    value: "Brooklyn, NY 10001"
  },
  {
    id: 3,
    title: "TIMEZONE",
    value: "UTC -05:00"
  },
  {
    id: 4,
    title: "ISP",
    value: "SpaceX Starlink"
  }
]


const newInfo = [
  {
    id: 1,
    title: "IP ADDRESS",
    value: ""
  },
  {
    id: 2,
    title: "LOCATION",
    value: ""
  },
  {
    id: 3,
    title: "TIMEZONE",
    value: ""
  },
  {
    id: 4,
    title: "ISP",
    value: ""
  }
]

let L = window.L;
let map;

export default function SearchHook() {
  const [info, setUpdatedInfo] = useState(sampleInfo);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false)
    fetchData("");
  }, [])

  const SearchForAddressOrDomain = (e) => {
    e.preventDefault();
    let tempvalue = document.getElementById("text").value;
    let value;
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(tempvalue)){
      value = `&ip=${tempvalue}`;
      lookForValidIPAddress(value);
    } else if (/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(tempvalue)) {
      fetch(`http://ip-api.com/json/${tempvalue}?fields=country,regionName,city,lat,lon,isp,query`)
      .then(response => response.json())
      .then(data => {
        rewriteInfo(data.isp, data.query, "--:--", data.regionName, data.country, data.city);
        setMap(data.lat, data.lon, data.regionName, data.country, data.city);
      })
      .catch(error => {
        console.log(error.message);
      })
    } else {
      alert('Invalid Email Address or Domain Name');
    }
  }

  const lookForValidIPAddress = (value) => {
    setLoading(true);
    fetchData(value);
  }

  const fetchData = (ipaddress) => {
    fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=6a3b77d7f8984eb4ae1518bc4c8b5e82${ipaddress}`)
    .then(response => response.json())
    .then(data => {
      let timeZone;
      let tempTimeZone = data.time_zone.current_time.slice(-5);
      timeZone = [tempTimeZone.slice(0, 3), ":", tempTimeZone.slice(3)].join('');
      rewriteInfo(data.isp, data.ip, timeZone, data.district, data.country_name, data.state_prov);
      setMap(data.latitude, data.longitude, data.district, data.country_name, data.state_prov);
    })
    .catch(error => {
      console.log(error.message);
    })
  }

  const rewriteInfo = (a, b, c, d, e, f) => {
    newInfo[3].value = a;
    newInfo[2].value = c;
    if (d === ""){
      newInfo[1].value = `${f}, ${e}`;
    } else {
      newInfo[1].value = `${d}, ${f}, ${e}`;
    }
    newInfo[0].value = b;
    setUpdatedInfo([...newInfo]);
    setLoading(false);
  }

  let container = L.DomUtil.get('map');

  const setMap = (lat, lon, a, b, c) => {
    if(container){
      map.remove();
      SetMapPerform(lat, lon, a, b, c)
    } else {
      SetMapPerform(lat, lon, a, b, c);
    }
  }

  const SetMapPerform = (lat, lon, a, b, c) => {
    map = L.map('map').setView([lat, lon], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);  
    if (a === ""){
      L.marker([lat, lon]).addTo(map)
      .bindPopup(`${c}, ${b}`)
      .openPopup();
    } else {
      L.marker([lat, lon]).addTo(map)
      .bindPopup(`${a}, ${c}, ${b}`)
      .openPopup();
    }
  }

  return (
    <>
    <div id="display" style={{display: loading ? 'flex' : 'none'}}>
      <div className="animated">
        <div id="circle1"></div>
        <div id="circle2"></div>
        <div id="circle3"></div>
      </div>
    </div>
    <div className='top-part'>
      <div className='first-part'>
        <h1 className='title'>IP Address Tracker</h1>
        <form id='form'>
          <input type={"text"} id='text' placeholder={'Search for any IP address or domain'}/>
          <input type={"submit"} id='submit' onClick={SearchForAddressOrDomain}/>
        </form>
        <DataHook info={info}/>
      </div>
    </div>
    </>

  )
}