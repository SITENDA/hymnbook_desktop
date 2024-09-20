import React, {useState, useRef, useEffect} from 'react';
import {Box, Typography, Divider, Fab, IconButton, Chip} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import {useLocation, useNavigate} from 'react-router-dom';
import {ThemeProvider} from '@mui/material/styles';
import {useTendaTheme} from './useTendaTheme';

const HymnDisplay = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {hymn} = location.state;
    const [currentStanzaIndex, setCurrentStanzaIndex] = useState(0);
    const [fontSize, setFontSize] = useState(2.5); // Default font size in rem
    const stanzaRef = useRef(); // Reference to the Typography component
    const displayBoxRef = useRef(); // Reference to the Box (stanza display area)
    const [previousHeight, setPreviousHeight] = useState(null); // Store the previous height

    const theme = useTendaTheme(); // Apply custom theme

    // Function to handle moving to the next stanza
    const nextStanza = () => {
        if (currentStanzaIndex < hymn.stanzas.length - 1) {
            setCurrentStanzaIndex(currentStanzaIndex + 1);
        }
    };

    // Function to handle moving to the previous stanza
    const previousStanza = () => {
        if (currentStanzaIndex > 0) {
            setCurrentStanzaIndex(currentStanzaIndex - 1);
        }
    };

    // Helper function to recursively increase font size until condition is met
    const increaseFontSizeGradually = () => {
        const stanzaElement = stanzaRef.current;
        const displayBoxElement = displayBoxRef.current;

        const stanzaHeight = stanzaElement.scrollHeight;
        const displayBoxHeight = displayBoxElement.clientHeight;

        // Detect if the height has changed before increasing further
        if (stanzaHeight < displayBoxHeight * 0.7 && fontSize < 9 && stanzaHeight !== previousHeight) {
            console.log('Increasing font size');
            setFontSize((prevSize) => prevSize + 0.2);
            setPreviousHeight(stanzaHeight); // Update the previous height
        }
    };

    // Helper function to recursively decrease font size until condition is met
    const decreaseFontSizeGradually = () => {
        const stanzaElement = stanzaRef.current;
        const displayBoxElement = displayBoxRef.current;

        const stanzaHeight = stanzaElement.scrollHeight;
        const displayBoxHeight = displayBoxElement.clientHeight;

        // Detect if the height has changed before decreasing further
        if (stanzaHeight > displayBoxHeight && fontSize > 1.0 && stanzaHeight !== previousHeight) {
            console.log('Decreasing font size');
            setFontSize((prevSize) => prevSize - 0.2);
            setPreviousHeight(stanzaHeight); // Update the previous height
        }
    };

    // Adjust the font size when the stanza or font size changes
    useEffect(() => {
        const stanzaElement = stanzaRef.current;
        const displayBoxElement = displayBoxRef.current;

        if (!stanzaElement || !displayBoxElement) return;

        const stanzaHeight = stanzaElement.scrollHeight;
        const displayBoxHeight = displayBoxElement.clientHeight;

        // Case 1: Shrink the font if the stanza height is larger than the display box
        if (stanzaHeight > displayBoxHeight) {
            decreaseFontSizeGradually();
        }

        // Case 2: Increase font size if the stanza height is too small
        if (stanzaHeight < displayBoxHeight * 0.7) {
            increaseFontSizeGradually();
        }
    }, [currentStanzaIndex, fontSize]); // Adjust only when stanza changes or font size is updated

    return (
        <ThemeProvider theme={theme}>
            <Box
                bgcolor="background.default"
                color="text.primary"
                sx={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Top section with back button and hymn title */}
                <Box
                    sx={{
                        height: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 2rem',
                        position: 'relative',
                        backgroundColor: theme.palette.background.paper,
                    }}
                >
                    {/* Back button to return to previous page */}
                    <IconButton sx={{position: 'absolute', left: '1rem'}} onClick={() => navigate(-1)}>
                        <NavigateBeforeIcon fontSize="large"/>
                    </IconButton>

                    {/* Hymn Title and Stanza Chip */}
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Typography
                            variant="h4"
                            component="h1"
                            fontWeight="bold"
                            color={theme.palette.text.primary} // Use theme text color
                            sx={{textAlign: 'center', marginRight: '1rem'}}
                        >
                            {hymn.title}
                        </Typography>
                        <Chip color="primary" variant="outlined" sx={{marginRight: 2}}
                              label={`Stanza ${currentStanzaIndex + 1}`}/>
                    </Box>
                </Box>

                {/* Divider between title and stanza */}
                <Divider sx={{width: '100%'}}/>

                {/* Stanza Display */}
                <Box
                    ref={displayBoxRef} // Reference to the Box for measuring
                    sx={{
                        flex: 1, // Make this Box fill the remaining space
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        backgroundColor: theme.palette.background.paper,
                        padding: '2rem',
                        overflow: 'auto',
                    }}
                >
                    <Typography
                        ref={stanzaRef} // Reference to the Typography for measuring
                        variant="body1"
                        component="p"
                        sx={{
                            whiteSpace: 'pre-line',
                            color: theme.palette.text.primary,
                            fontSize: `${fontSize}rem`, // Dynamic font size
                            fontFamily: 'Roboto',
                        }}
                    >
                        {hymn.stanzas[currentStanzaIndex].stanzaText}
                    </Typography>

                    {/* Previous Stanza Button (Floating Action Button) */}
                    <Fab
                        color="primary"
                        onClick={previousStanza}
                        disabled={currentStanzaIndex === 0}
                        sx={{
                            position: 'absolute',
                            left: '2rem',
                            bottom: '2rem',
                        }}
                    >
                        <ArrowBackIcon/>
                    </Fab>

                    {/* Next Stanza Button (Floating Action Button) */}
                    <Fab
                        color="primary"
                        onClick={nextStanza}
                        disabled={currentStanzaIndex === hymn.stanzas.length - 1}
                        sx={{
                            position: 'absolute',
                            right: '2rem',
                            bottom: '2rem',
                        }}
                    >
                        <ArrowForwardIcon/>
                    </Fab>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default HymnDisplay;