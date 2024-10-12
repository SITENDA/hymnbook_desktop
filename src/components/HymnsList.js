import React, {useState, useEffect} from "react";
import {
    Box,
    Typography,
    List,
    ListItem,
    TextField,
    InputAdornment,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useNavigate, useLocation} from "react-router-dom";
import {
    useGetHymnsByBookAndLanguageQuery,
    useGetLanguagesQuery, useGetPreferredLanguageQuery,
    useUpdateSettingMutation
} from "../features/api/apiSlice";
import {ThemeProvider} from "@mui/material/styles"; // Import ThemeProvider from MUI
import {useTendaTheme} from './useTendaTheme'; // Import the custom Tenda theme

const HymnsList = () => {
    const [searchTerm, setSearchTerm] = useState(""); // State for the search input
    const [filteredHymns, setFilteredHymns] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const {hymnbook, language: initialLanguage, range} = location.state;  // Destructure range from location.state
    const [language, setLanguage] = useState(initialLanguage); // Set initial language from location.state
    const theme = useTendaTheme(); // Apply the Tenda theme

    // Fetch hymns by book and language
    const {data: hymns, isSuccess} = useGetHymnsByBookAndLanguageQuery({
        hymnbookId: hymnbook?.hymnbookId,
        languageId: language?.languageId
    });

    // Fetch available languages
    const {data: loadedLanguages, isSuccess: languagesSuccessfullyLoaded} = useGetLanguagesQuery();
    const [languages, setLanguages] = useState([]);

    const [updateSetting] = useUpdateSettingMutation();
    const {data: loadedPreferredLanguage, isSuccess: preferredLanguageLoaded} = useGetPreferredLanguageQuery();

    // Set the languages when loaded
    useEffect(() => {
        if (languagesSuccessfullyLoaded) {
            setLanguages(loadedLanguages);
            if (loadedPreferredLanguage) {
                const preferredLanguage = loadedLanguages.find(
                    lang => lang.languageId === loadedPreferredLanguage.languageId // Compare using languageId
                );
                if (preferredLanguage) {
                    setLanguage(preferredLanguage); // Set the dropdown value using languageId
                }
            }
        }
    }, [languagesSuccessfullyLoaded, loadedLanguages, loadedPreferredLanguage]);

    useEffect(() => {
        const makeUpdate = async (runyankoreLanguage) => {
            await updateSetting({
                key: "preferredLanguage",
                value: (runyankoreLanguage.languageId).toString()
            }).unwrap();
        }
        if (typeof hymnbook?.hymnbookName === "string" && hymnbook?.hymnbookName?.includes("Runyankore")) {
            const runyankoreLanguage = languages.find(l => l.languageName === "Runyankore");
            if (runyankoreLanguage) {
                makeUpdate(runyankoreLanguage);
            }
        }
    }, [hymnbook?.hymnbookName, languages, updateSetting, language])

    // Set the languages when loaded
    useEffect(() => {
        if (languagesSuccessfullyLoaded) {
            setLanguages(loadedLanguages);
        }
    }, [languagesSuccessfullyLoaded, loadedLanguages]);

    // Filter hymns based on the search term and hymnbook range
    useEffect(() => {
        if (isSuccess && hymns) {
            const lowercasedSearchTerm = searchTerm.toLowerCase();

            const filtered = hymns.filter((hymn) => {
                const hymnInRange = hymn.hymnNumber >= range?.start && hymn.hymnNumber <= range?.end; // Check if hymn is in range

                // Check if the search term is in the hymn number, title, or any stanza text
                const matchHymnNumberOrTitle =
                    hymn.hymnNumber.toString().includes(lowercasedSearchTerm) ||
                    hymn.title.toLowerCase().includes(lowercasedSearchTerm);

                const matchStanzaText = hymn.stanzas.some(stanza =>
                    stanza.stanzaText.toLowerCase().includes(lowercasedSearchTerm)
                );

                // Return true if any of the conditions match
                return hymnInRange && (matchHymnNumberOrTitle || matchStanzaText);
            });

            setFilteredHymns(filtered);
        }
    }, [searchTerm, hymns, isSuccess, range]);

    // Handle click on hymn to navigate to the HymnDisplay page
    const handleHymnClick = (hymn, hymnId) => {
        navigate('/hymnsdisplay', {state: {hymn, hymnId: hymnId, languageId: language.languageId}});
    };

    // Handle language change
    const handleLanguageChange = async (event) => {
        const selectedLanguage = languages.find(l => l.languageId === event.target.value);
        setLanguage(selectedLanguage); // Set language based on languageId
        await updateSetting({key: "preferredLanguage", value: (selectedLanguage.languageId).toString()}).unwrap();
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: theme.palette.background.default, // Use theme background
                    padding: '2rem',
                    boxSizing: 'border-box',
                }}
            >
                {/* Back Button */}
                <Button
                    variant="contained"
                    color="primary"
                    sx={{alignSelf: 'flex-start', marginBottom: '1.5rem'}}
                    onClick={() => navigate(-1)}  // Go back to the previous page
                >
                    Back
                </Button>

                {/* Hymnbook Name and Language Selection */}
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem'}}>
                    <Typography variant="h3" component="h3" fontWeight="bold" color={theme.palette.primary.main}>
                        {hymnbook?.hymnbookName}
                    </Typography>

                    {/* Language Dropdown */}
                    <FormControl variant="outlined" sx={{minWidth: 200}}>
                        <InputLabel id="language-select-label">Language</InputLabel>
                        <Select
                            labelId="language-select-label"
                            id="language-select"
                            value={language?.languageId || ''} // Use empty string if language is not set
                            onChange={handleLanguageChange}
                            label="Language"
                            sx={{
                                backgroundColor: theme.palette.background.paper,
                                borderRadius: '4px',
                                color: theme.palette.text.primary
                            }}
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

                {/* Search Input */}
                <TextField
                    variant="outlined"
                    placeholder="Search Hymns..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{
                        width: '50%',
                        marginTop: '1.5rem',
                        marginBottom: '1.5rem',
                        backgroundColor: theme.palette.background.paper, // Use theme paper background
                        color: theme.palette.text.primary // Use theme text color
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon
                                    sx={{color: theme.palette.text.primary}}/> {/* Search icon color from theme */}
                            </InputAdornment>
                        ),
                    }}
                />

                {/* List of Hymns */}
                <Box
                    sx={{
                        width: '80%',
                        maxHeight: '60vh',
                        overflowY: 'auto',
                        backgroundColor: theme.palette.background.paper, // Apply theme background to list box
                        color: theme.palette.text.primary, // Use theme text color for hymn titles
                        '&::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: theme.palette.primary.light,
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-track': {
                            backgroundColor: theme.palette.background.default,
                        },
                    }}
                >
                    <List sx={{padding: 0, margin: 0}}>
                        {filteredHymns.map((hymn) => (
                            <ListItem
                                key={hymn.hymnId}
                                sx={{
                                    backgroundColor: theme.palette.background.paper,
                                    marginBottom: '1rem',
                                    borderRadius: '8px',
                                    color: theme.palette.text.primary,
                                    padding: '1rem',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',  // Add pointer cursor to show it's clickable
                                    '&:hover': {
                                        backgroundColor: theme.palette.primary.dark // Hover effect with theme color
                                    }
                                }}
                                onClick={() => handleHymnClick(hymn, hymn.hymnId)} // Call handleHymnClick on click
                            >
                                <Typography variant="body1">{hymn.hymnNumber}</Typography>
                                <Typography variant="body1">{hymn.title}</Typography>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default HymnsList;