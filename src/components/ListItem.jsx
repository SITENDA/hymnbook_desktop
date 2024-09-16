import React from "react";
import { Link } from "react-router-dom";

const ListItem = ({ hymn }) => {
  return (
    <Link to="/hymn" state={{ hymn_number: hymn.hymn_number }}>
      <li className="item">
        <span className="hymn-number">{hymn.hymn_number}</span>
        <span className="hymn-text">{hymn.hymn_title}</span>
      </li>
    </Link>
  );
};

export default ListItem;