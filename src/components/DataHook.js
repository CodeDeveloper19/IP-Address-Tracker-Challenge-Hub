import React from 'react'
import InfoHook from './InfoHook';

export default function DataHook({ info }) {
  return (
    <>
      <div className='middle-part'>
          <div className='first-part'>
            {
              info.map(info => {
                return <InfoHook key={info.id} {...info} />
              })
            }
          </div>
      </div>   
    </>
  )

}
