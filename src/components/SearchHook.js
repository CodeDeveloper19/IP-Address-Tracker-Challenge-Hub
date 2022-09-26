import React from 'react';
// import background from '../Images/pattern-bg.png';
import DataHook from './DataHook';

export default function SearchHook() {
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
      // value: "MTN NIGERIA Communication limited"
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
      // value: "MTN NIGERIA Communication limited"
    }
  ]

  return (
    <div className='top-part'>
      {/* <img src={background} alt="illustration of a greater than sign"></img> */}
      <div className='first-part'>
        <h1 className='title'>IP Address Tracker</h1>
        <form id='form'>
          <input type={"text"} id='text' placeholder='Search for any IP address or domain'/>
          <input type={"submit"} id='submit'/>
        </form>
        <DataHook info={sampleInfo}/>
      </div>

    </div>
  )
}