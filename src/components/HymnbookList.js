import React, { useEffect, useState } from "react";
import { Box, Typography, List, ListItem, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import broJosephYf from '../img/bro-joseph-bg.png';
import { useGetHymnBooksQuery, useGetLanguagesQuery } from "../features/api/apiSlice"; // Import the background image

const HymnbookList = () => {
    const [language, setLanguage] = useState(''); // Language state
    const [hymnbooks, setHymnbooks] = useState([]);
    const [languages, setLanguages] = useState([]);

    const { data: loadedHymnbooks, isLoading: hymnbooksAreLoading, isSuccess: hymnbooksSuccessfullyLoaded } = useGetHymnBooksQuery();
    const { data: loadedLanguages, isLoading: languagesAreLoading, isSuccess: LanguagesSuccessfullyLoaded } = useGetLanguagesQuery();

    useEffect(() => {
        if (hymnbooksSuccessfullyLoaded) {
            console.log("hymnbooksLoaded are : ", loadedHymnbooks);
            setHymnbooks(loadedHymnbooks);
        }
    }, [hymnbooksSuccessfullyLoaded, loadedHymnbooks]);

    useEffect(() => {
        if (LanguagesSuccessfullyLoaded) {
            console.log("loadedLanguages are : ", loadedLanguages);
            setLanguages(loadedLanguages);
        }
    }, [LanguagesSuccessfullyLoaded, loadedLanguages]);

    // Handle language change
    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
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
            <Typography variant="h2" component="h1" fontWeight="bold" color="primary" sx={{ textAlign: 'center' }}>
                Press Play Hymns
            </Typography>

            {/* Hymnbooks Title */}
            <Typography variant="h4" component="h2" color="white" sx={{ marginTop: '2rem', textAlign: 'center' }}>
                Hymnbooks
            </Typography>

            {/* List of Hymnbooks */}
            <Box sx={{ width: '50%', marginTop: '1rem', overflow: 'hidden' }}>
                <List sx={{ padding: 0, margin: 0 }}>
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
                            }}>
                            {hymnbook?.hymnbookName}
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* Language Dropdown */}
            <Box sx={{ position: 'absolute', top: '20%', right: '5%' }}>
                <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                    <InputLabel id="language-select-label" sx={{ color: 'white' }}>Language</InputLabel>
                    <Select
                        labelId="language-select-label"
                        id="language-select"
                        value={language}
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
                            <MenuItem key={languageItem.languageId} value={languageItem.languageName}>
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