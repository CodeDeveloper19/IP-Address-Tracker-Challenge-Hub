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

export default function SearchHook() {
  const [info, setUpdatedInfo] = useState(sampleInfo);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData("");
  }, [])

  const SearchForAddressOrDomain = (e) => {
    e.preventDefault();
    let tempvalue = document.getElementById("text").value;
    let value;
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(tempvalue)){
      value = `&ipAddress=${tempvalue}`;
      lookForValidDomainOrAddress(value);
    } else if (/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(tempvalue)) {
      value = `&domain=${tempvalue}`;
      lookForValidDomainOrAddress(value);
    } else {
      alert('Invalid Email Address or Domain Name');
    }
  }

  const lookForValidDomainOrAddress = (value) => {
    setLoading(true);
    fetchData(value);
  }

  const fetchData = (ipaddress) => {
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_f19gK99cDZ0qXPfxr4KGRA8ZSAgMC${ipaddress}`)
    .then(response => response.json())
    .then(data => {
      rewriteInfo(data.isp, data.ip, data.location.timezone, data.location.region, data.location.country, data.location.city);
      setMap(data.location.lat, data.location.lng);
    })
    .catch(error => {
      console.log(error.message);
    })
  }

  const rewriteInfo = (a, b, c, d, e, f) => {
    newInfo[3].value = a;
    newInfo[2].value = c;
    newInfo[1].value = `${f}, ${d}, ${e}`;
    newInfo[0].value = b;
    setUpdatedInfo([...newInfo]);
    setLoading(false);
  }

  const setMap = (lat, lon) => {
    let map = L.map('map').setView([lat, lon], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);  

    L.marker([lat, lon]).addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();
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