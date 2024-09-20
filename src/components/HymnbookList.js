import React, {useState, useEffect} from "react";
import {Box, Typography, List, ListItem, FormControl, InputLabel, Select, MenuItem} from "@mui/material";
import {useNavigate} from 'react-router-dom'; // Import useNavigate
import broJosephYf from '../img/bro-joseph-bg.png';
import {useGetHymnBooksQuery, useGetLanguagesQuery, useGetPreferredLanguageQuery} from "../features/api/apiSlice";

const HymnbookList = () => {
    const [language, setLanguage] = useState(null); // Language state initialized as null
    const [hymnbooks, setHymnbooks] = useState([]);
    const [languages, setLanguages] = useState([]);

    const navigate = useNavigate(); // Initialize the navigate hook

    const {
        data: loadedHymnbooks,
        isLoading: hymnbooksAreLoading,
        isSuccess: hymnbooksSuccessfullyLoaded
    } = useGetHymnBooksQuery();
    const {
        data: loadedLanguages,
        isLoading: languagesAreLoading,
        isSuccess: languagesSuccessfullyLoaded
    } = useGetLanguagesQuery();
    const {data: loadedPreferredLanguage, isSuccess: preferredLanguageLoaded} = useGetPreferredLanguageQuery();

    // Set the hymnbooks when loaded
    useEffect(() => {
        if (hymnbooksSuccessfullyLoaded && loadedHymnbooks) {
            const modifiedHymnbooks = loadedHymnbooks.flatMap(hymnbook => {
                if (hymnbook.hymnbookName === "Only Believe Songbook") {
                    return [
                        {
                            hymnbookId: hymnbook.hymnbookId, // Keep the same hymnbookId
                            hymnbookName: "Only Believe Songbook (1 - 222)",
                            range: {start: 1, end: 222} // Define the range
                        },
                        {
                            hymnbookId: hymnbook.hymnbookId, // Keep the same hymnbookId
                            hymnbookName: "Only Believe Songbook (223 - 1085)",
                            range: {start: 223, end: hymnbook.hymnCount} // Define the range
                        }
                    ];
                }
                // Return other hymnbooks unchanged
                return {
                    ...hymnbook,
                    range: {start: 1, end: hymnbook.hymnCount},
                    hymnbookName: hymnbook.hymnbookName.concat(` (1 - ${hymnbook.hymnCount})`)
                };
            });
            setHymnbooks(modifiedHymnbooks);
        }
    }, [hymnbooksSuccessfullyLoaded, loadedHymnbooks]);


    // Set the languages when loaded
    useEffect(() => {
        if (languagesSuccessfullyLoaded) {
            setLanguages(loadedLanguages);
        }
    }, [languagesSuccessfullyLoaded, loadedLanguages]);

    // Set the preferred language when loaded and set it as the default value for the dropdown
    useEffect(() => {
        if (preferredLanguageLoaded && loadedLanguages) {
            const preferredLanguage = loadedLanguages.find(
                lang => lang.languageId === loadedPreferredLanguage.languageId // Compare using languageId
            );
            if (preferredLanguage) {
                setLanguage(preferredLanguage); // Set the dropdown value using languageId
            }
        }
    }, [preferredLanguageLoaded, loadedLanguages, loadedPreferredLanguage]);

    // Handle language change
    const handleLanguageChange = (event) => {
        const selectedLanguage = languages.find(l => l.languageId === event.target.value);
        setLanguage(selectedLanguage); // Set language based on languageId
    };

    const handleHymnbookClick = (hymnbook) => {
        if (language) {
            navigate("/hymnslist", {
                state: {
                    hymnbook: hymnbook,
                    language: language,
                    range: hymnbook?.range // Pass the range along with the state
                }
            });
        } else {
            console.log('Please select a language first.');
        }
    };


    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                backgroundImage: `url(${broJosephYf})`, // Use the background image
                backgroundSize: 'cover',  // Ensures the image covers the entire viewport
                backgroundPosition: 'center',  // Centers the image
                backgroundRepeat: 'no-repeat',  // Prevents the image from repeating
                padding: '2rem',
                boxSizing: 'border-box',
                overflow: 'hidden', // Ensures no scrollbars
            }}
        >
            {/* Top-centered title */}
            <Typography variant="h2" component="h1" fontWeight="bold" color="primary" sx={{textAlign: 'center'}}>
                Press Play Hymns
            </Typography>

            {/* Hymnbooks Title */}
            <Typography variant="h4" component="h2" color="white" sx={{marginTop: '2rem', textAlign: 'center'}}>
                Hymnbooks
            </Typography>

            {/* List of Hymnbooks */}
            <Box sx={{width: '50%', marginTop: '1rem', overflow: 'hidden'}}>
                <List sx={{padding: 0, margin: 0}}>
                    {hymnbooks.map((hymnbook, index) => (
                        <ListItem
                            key={index}
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                marginBottom: '1rem',
                                borderRadius: '8px',
                                color: 'black',
                                padding: '1rem',
                                display: 'flex',
                                fontWeight: 'bold',
                                justifyContent: 'center',
                                alignItems: 'center',
                                whiteSpace: 'nowrap', // Prevent text wrapping
                                cursor: 'pointer' // Indicate clickable
                            }}
                            onClick={() => handleHymnbookClick(hymnbook)} // Handle hymnbook click
                        >
                            {hymnbook?.hymnbookName}
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* Language Dropdown */}
            <Box sx={{position: 'absolute', top: '20%', right: '5%'}}>
                <FormControl variant="outlined" sx={{minWidth: 200}}>
                    <InputLabel id="language-select-label" sx={{color: 'white'}}>Language</InputLabel>
                    <Select
                        labelId="language-select-label"
                        id="language-select"
                        value={language?.languageId || ''} // Use empty string if language is not set
                        onChange={handleLanguageChange}
                        label="Language"
                        sx={{
                            color: 'white',
                            backgroundColor: 'rgba(255, 255, 255, 0.3)',
                            borderRadius: '4px',
                            padding: '0.5rem',
                        }}
                        variant='outlined'
                    >
                        {/* Dynamically populate languages */}
                        {languages.map((languageItem) => (
                            <MenuItem key={languageItem.languageId} value={languageItem.languageId}>
                                {languageItem.languageName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </Box>
    );
};

export default HymnbookList;