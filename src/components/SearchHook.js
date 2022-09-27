import React, { useState } from 'react';
import DataHook from './DataHook';
import { v4 as uuidv4 } from 'uuid';

export default function SearchHook() {
  const [info, updatedInfo] = useState(sampleInfo);

  const UpdateInfo = (e) => {
    e.preventDefault();
    const newInfo = {
      id: uuidv4(),
      title: "default",
      value: "default"
    }

    updatedInfo([...info, newInfo]);
    console.log(info)
  }

  return (
    <div className='top-part'>
      <div className='first-part'>
        <h1 className='title'>IP Address Tracker</h1>
        <form id='form'>
          <input type={"text"} id='text' placeholder='Search for any IP address or domain'/>
          <input type={"submit"} id='submit' onClick={UpdateInfo}/>
        </form>
        <DataHook info={sampleInfo}/>
      </div>
    </div>
  )
}

const sampleInfo = [
  {
    id: 1,
    title: "IP Address",
    value: "192.212.174.101"
  },
  {
    id: 2,
    title: "Location",
    value: "Brooklyn, NY 10001"
  },
  {
    id: 3,
    title: "Time Zone",
    value: "UTC -05:00"
  },
  {
    id: 4,
    title: "ISP",
    value: "SpaceX Starlink"
  }
]