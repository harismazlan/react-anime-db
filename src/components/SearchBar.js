import { useState, useEffect } from 'react';

const SearchBar = ({ query, setQuery }) => {
    const [localQuery, setLocalQuery] = useState(query);

    useEffect(() => {
        setLocalQuery(query);
    }, [query]);

    const handleChange = (e) => {
        setLocalQuery(e.target.value);
        setQuery(e.target.value);
    };

    return (
        <div className="search-box">
            <input
                type="search"
                placeholder="Search for an anime..."
                value={localQuery}
                onChange={handleChange}
            />
        </div>
    );
};

export default SearchBar;