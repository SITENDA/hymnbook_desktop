import React, { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import Typed from "typed.js";
import { useNavigate } from "react-router-dom";
import broJosephYf from '../img/bro-joseph-bg.png'; // Import the background image

const Intro = () => {
  const typedRef = useRef(null); // Reference for the typed text
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Initialize the Typed.js
    const typed = new Typed(typedRef.current, {
      strings: [
        `“I love singing so well, when you ever get to heaven, and when they’re singing at, that’s where I will be.” I like to hear it.
        <br/><strong>51-0728 — Three Witnesses <br /> Rev. William Marrion Branham</strong>`,
      ],
      typeSpeed: 20,
      backSpeed: 0,
      loop: false,
      showCursor: false,
    });

    // Set a timeout to navigate to the HymnbookList page after 10 seconds (10000 milliseconds)
    const timeout = setTimeout(() => {
      navigate("/hymnbookslist"); // Navigate to HymnbookList page
    }, 10000); // 10 seconds

    // Cleanup the Typed instance and clear timeout on component unmount
    return () => {
      typed.destroy();
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundImage: `url(${broJosephYf})`, // Use the background image
        backgroundSize: 'cover',  // Ensures the image covers the entire viewport
        backgroundPosition: 'center',  // Centers the image
        backgroundRepeat: 'no-repeat',  // Prevents the image from repeating
        padding: '2rem',
        boxSizing: 'border-box',
      }}
    >
      {/* Left half - Title */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" component="h1" fontWeight="bold" color="primary">
          Press Play Hymns
        </Typography>
      </Box>

      {/* Right half - Typed Quote */}
      <Box
        sx={{
          flex: 1,
          padding: '2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4" // Increased font size
          color="white" // White color to stand out against the background
          fontStyle="italic"
          sx={{
            fontSize: { xs: '1.5rem', md: '2rem', lg: '2.5rem' }, // Reduced responsive font sizes
            lineHeight: 1.5,
          }}
          component="div" // Use "div" to allow innerHTML for Typed.js
        >
          <span ref={typedRef}></span> {/* This is where the typed text will appear */}
        </Typography>
      </Box>
    </Box>
  );
};

export default Intro;