import React, {useState, useEffect} from "react";
import {Box, Typography, List, ListItem, TextField, InputAdornment} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
    useGetHymnsByBookAndLanguageQuery,
} from "../features/api/apiSlice";
import {useLocation} from "react-router-dom";

const HymnsList = () => {
    const [searchTerm, setSearchTerm] = useState(""); // State for the search input
    const [filteredHymns, setFilteredHymns] = useState([]);
    const location = useLocation();
    const {hymnbook, language} = location.state;

    // Fetch hymns by book and language
    const {data: hymns, isSuccess} = useGetHymnsByBookAndLanguageQuery({
    hymnbookId: hymnbook?.hymnbookId,
    languageId: language?.languageId
});


    // Filter hymns based on search term
    useEffect(() => {
        if (isSuccess && hymns) {
            const lowercasedSearchTerm = searchTerm.toLowerCase();
            const filtered = hymns.filter((hymn) =>
                hymn.hymnNumber.toString().includes(lowercasedSearchTerm) ||
                hymn.title.toLowerCase().includes(lowercasedSearchTerm)
            );
            setFilteredHymns(filtered);
        }
    }, [searchTerm, hymns, isSuccess]);

    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#f5f5f5', // Light background color
                padding: '2rem',
                boxSizing: 'border-box',
            }}
        >
            {/* Top-centered title */}
            <Typography variant="h2" component="h1" fontWeight="bold" color="primary" sx={{textAlign: 'center'}}>
                {hymnbook?.hymnbookName}
            </Typography>

            {/* Search Input */}
            <TextField
                variant="outlined"
                placeholder="Search Hymns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{width: '50%', marginTop: '1.5rem', marginBottom: '1.5rem'}}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon/>
                        </InputAdornment>
                    ),
                }}
            />

            {/* List of Hymns */}
            <Box sx={{width: '80%', maxHeight: '60vh', overflowY: 'auto'}}>
                <List sx={{padding: 0, margin: 0}}>
                    {filteredHymns.map((hymn) => (
                        <ListItem
                            key={hymn.hymnId}
                            sx={{
                                backgroundColor: '#ffffff',
                                marginBottom: '1rem',
                                borderRadius: '8px',
                                color: '#333',
                                padding: '1rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                fontWeight: 'bold',
                            }}
                        >
                            <Typography variant="body1">{hymn.hymnNumber}</Typography>
                            <Typography variant="body1">{hymn.title}</Typography>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
};

export default HymnsList;
