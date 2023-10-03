// SearchResultCard.js
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { SearchResult } from './types';
import { useState } from 'react';
import Chip from '@mui/material/Chip';

function SearchResultCard({ title, category, description, url, id }: SearchResult) {
    const [hovered, setHovered] = useState(false);
    const cardStyle = {
        marginBottom: '16px',
        cursor: 'pointer',
        boxShadow: hovered ? '0px 8px 12px rgba(0, 0, 0, 0.2)' : '0px 4px 8px rgba(0, 0, 0, 0.2)',
        borderBottom: hovered ? '2px solid #1976d2' : '2px solid transparent',
        transition: 'box-shadow 0.3s, border-bottom-color 0.3s',
        width: '300px',
    };
    const categoryColors = {
        VIDEOS: '#df4747',
        PLAYLISTS: '#68a568',
        BLOG_POSTS: '#1976d2',
    };

    const chipStyle = {
        fontSize: '12px',
        padding: '4px 8px',
        backgroundColor: categoryColors[category] || 'gray',
        color: 'white',
    };

    const handleCardClick = () => {
        if (url) {
            window.open(url, '_blank');
        }
    };
    return (
        <Card
            variant="outlined"
            style={cardStyle}
            onClick={handleCardClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            key={`card_${id}`}
        >
            <CardContent className='card-content'>
                <Typography variant="h6" gutterBottom>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="card-link">
                        {title}
                    </a>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {description}
                </Typography>
                <Chip label={category} color="primary" className='card-category' sx={{ marginTop: '8px', ...chipStyle }} />
            </CardContent>
        </Card>
    );
}

export default SearchResultCard;
