import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
        <Link to="/"> Home </Link>
        <Link to="/hymnsIndex"> Index </Link>
        <Link to="/hymn"> Hymn </Link>
    </nav>
  ) 
}

export default Navbar