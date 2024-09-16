import React from 'react'
import Hymn from './Hymn'

const Footer = () => {

  return (
    <div id="footer" data-id="footer" data-position="fixed">
        <div className='buttonDiv'>
        <button onClick={Hymn.handleClickEvent}></button>
        </div>
      </div>
  )
}

export default Footer