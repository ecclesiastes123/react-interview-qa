import React, { useState, useEffect, useMemo } from 'react';

export default function SerachFileter() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // 1. Guard Clause: Don't fetch if search length is under 3
        if (search.trim().length < 3) {
            setData([]);
            return;
        }

        const controller = new AbortController();

        // 2. Debounce API call (500ms is standard for search UX)
        const timer = setTimeout(() => {
            setIsLoading(true);

            fetch('https://jsonplaceholder.typicode.com/posts', {
                signal: controller.signal,
            })
                .then((res) => res.json())
                .then((res) => {
                    setData(res);
                    setIsLoading(false);
                })
                .catch((err) => {
                    if (err.name !== 'AbortError') {
                        console.error('Fetch error:', err);
                        setIsLoading(false);
                    }
                });
        }, 500);

        // 3. Proper Cleanup: Clear timer AND abort pending request
        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [search]);

    // 4. Derive filtered list without needing extra useState
    const filteredList = useMemo(() => {
        if (search.trim().length < 3) return [];

        const lowerSearch = search.toLowerCase();
        return data.filter((item) =>
            item?.title?.toLowerCase().includes(lowerSearch)
        );
    }, [data, search]);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Search</h1>

            <input
                type="text"
                placeholder="Type at least 3 characters..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {isLoading && <p>Loading latest data...</p>}

            <ul>
                {filteredList.map((item) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>

            {!isLoading && search.trim().length >= 3 && filteredList.length === 0 && (
                <p>No results found.</p>
            )}
        </div>
    );
}