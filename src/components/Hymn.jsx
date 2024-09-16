import { useState } from "react";
import React from "react";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import { selectHymnById } from "../features/hymns/hymnsSlice";
import { useSelector } from "react-redux";


const Hymn = () => {


  const location = useLocation()
  const { hymn_number } = location.state
  console.log("Hymn number is " + hymn_number)

  const selectedHymn = useSelector(state => selectHymnById(state, hymn_number))
  let stanzaId = 0;
  const [stanza, setStanza] = useState(selectedHymn.hymn_text[0])
  console.log("Number of stanzs : " + selectedHymn.hymn_text.length)

  Hymn.handleClickEvent = (e) => {

    //TODO: Write code here to use %2 and check if second stanza begings with "CHORUS", 
    //and toggle chorus to be displayed whenever stanzaId is odd.
    console.log("Current stanzaId : ", stanzaId)
    let hymnLength = selectedHymn.hymn_text.length
    stanzaId++;
    setStanza(selectedHymn.hymn_text[stanzaId % hymnLength])
    console.log("Current text : ", selectedHymn.hymn_text[stanzaId % hymnLength])
  }

  return ( 
    <div className="hymn">
      <Header hymn = {selectedHymn} />
      <Content stanzas={stanza}/>
      <Footer/>
    </div>
  );
};


export default Hymn;