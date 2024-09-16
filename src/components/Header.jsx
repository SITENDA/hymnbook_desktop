import React from "react";
import { Link } from "react-router-dom";

const Header = ({ hymn }) => {
  return (
    <>
      <div className="header">
        <span className="pageChange">
          <Link to="/"> Home </Link>
          <Link to="/hymnsIndex"> Index </Link>
        </span>
        <h1>
          <span className="hymn-number"> {hymn.hymn_number} </span>
          {
            hymn.hymn_title.length > 20 ? 
            hymn.hymn_title.substring(0, 19).toUpperCase().concat("...")
            : hymn.hymn_title.toUpperCase()
          } 
          
          <em>{hymn.hymn_key.toUpperCase()}</em>
        </h1>
        <span className="languageChange">
          <Link to="/"> ENG </Link>
          <Link to="/hymn"> LUG </Link>
          <Link to="/hymn"> RUNY </Link>
        </span>
      </div>

      <hr></hr>
      <br></br>
    </>
  );
};

export default Header;
