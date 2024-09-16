import React from 'react'
import uuid from 'react-uuid';

const Content = ({ stanzas }) => {
  stanzas = stanzas.split("<br/>");
  let theContent = stanzas.map(stanza =>  <div key={uuid()}>{stanza}</div>);
  
  return (
    <div className="content">
      { theContent }
    </div>
  )
}

export default Content
