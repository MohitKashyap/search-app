import React, { useState, useEffect, useRef } from 'react';

type SearchResult = {
    id: string;
    title: string;
    url: string;
    description: string;
    category: 'VIDEOS' | 'PLAYLISTS' | 'BLOG_POSTS';
};

function App() {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [message, setMessage] = useState('');

    const inputRef = useRef<HTMLInputElement>(null);
    const handleSearch = async () => {
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
        <div className="App">
            <h1>Search App</h1>
            <div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleEnterKeyPress}
                    placeholder="Enter your search query"
                    ref={inputRef}
                />
                <button onClick={handleSearch} disabled={loading}>
                    Search
                </button>
            </div>
            {loading && <p>Loading...</p>}
            {message && <p>{message}</p>}
            {!loading && <div className="card-container">
                {searchResults.map((result, index) => (
                    <div className="card" key={index}>
                        <a href={result.url} target="_blank" rel="noopener noreferrer">
                            <strong>{result.title}</strong>
                        </a>
                        <p>{result.description}</p>
                        <p>{result.category}</p>
                    </div>
                ))}
            </div>}
            {searchResults.length === 0 && !loading && !message && <p>No results found.</p>}
        </div>
    );
}

export default App;