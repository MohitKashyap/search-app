import React, { useState, useEffect, useRef } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { SearchResult } from './types';
import SearchResultCard from './SearchResultCard';
import CircularProgress from '@mui/material/CircularProgress';

function App() {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [message, setMessage] = useState('');

    const inputRef = useRef<HTMLInputElement>(null);
    const handleSearch = async () => {
        if (query.trim() === '') {
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`/api/data?search=${query}`);
            if (response.ok) {
                const data = await response.json();
                setSearchResults(data);
                setMessage(data.length === 0 ? 'There are no results matching your query.' : '');
            } else {
                setMessage('Error fetching data.');
            }
        } catch (error) {
            setMessage('An error occurred.');
        }

        setLoading(false);
    };
    const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);
    return (
        <Container maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom>
                Search App
            </Typography>
            <div className="flex justify-center items-center">
                <TextField
                    variant="outlined"
                    fullWidth
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleEnterKeyPress}
                    placeholder="Enter your search query"
                    ref={inputRef}
                    autoFocus

                    InputProps={{
                        endAdornment: (
                            <Button variant="contained" color="primary" role="button" title='Search' onClick={handleSearch} aria-label='search button' disabled={loading}>
                                Search
                            </Button>
                        ),
                    }}
                />
            </div>
            {loading && (
                <div className="loader-container">
                    <CircularProgress />
                </div>
            )}
            {message && <p>{message}</p>}
            {!loading && query &&
                <div className="card-container flex flex-wrap gap-4 justify-center mt-4">
                    {searchResults.map((result: SearchResult) => (
                        <SearchResultCard key={result.id} title={result.title} description={result.description} id={result.id} category={result.category} url={result.url} />
                    ))}
                </div>}
            {searchResults.length === 0 && !loading && !message && <p> No results found.</p>}
        </Container >
    );
}

export default App;