import React, { useState, useEffect, useMemo } from 'react';

const POSTS_PER_PAGE = 10;

export default function App() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    // 1. Fetch data ONCE on mount (Client-side filtering will handle search)
    useEffect(() => {
        setIsLoading(true);
        const controller = new AbortController();

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

        return () => controller.abort();
    }, []); // Run only once

    // 2. Reset to page 1 whenever the user types in search
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    // 3. Client-side filter logic
    const displayedData = useMemo(() => {
        if (search.trim().length < 3) {
            return data;
        }
        const lowerSearch = search.toLowerCase();
        return data.filter((item) =>
            item?.title?.toLowerCase().includes(lowerSearch)
        );
    }, [data, search]);

    // 4. Paginate over `displayedData` (NOT raw `data`)
    const lastIndex = currentPage * POSTS_PER_PAGE;
    const firstIndex = lastIndex - POSTS_PER_PAGE;
    const currentPosts = displayedData.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(displayedData.length / POSTS_PER_PAGE);

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h1>Data Inventory</h1>

            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Type 3+ characters to filter by title..."
                    value={search}
                    onChange={handleSearchChange}
                    style={{ padding: '8px', width: '300px' }}
                />
                {isLoading && (
                    <span style={{ marginLeft: '10px' }}>Loading latest data...</span>
                )}
            </div>

            {/* HTML Table Rendering */}
            <table
                border="1"
                cellPadding="10"
                cellSpacing="0"
                style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}
            >
                <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <th>ID</th>
                    <th>User ID</th>
                    <th>Title</th>
                    <th>Body</th>
                </tr>
                </thead>
                <tbody>
                {currentPosts.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.userId}</td>
                        <td>
                            <strong>{item.title}</strong>
                        </td>
                        <td>{item.body}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            {totalPages > 0 && (
                <div style={{ marginTop: '20px' }}>
                    <button
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>

                    {[...Array(totalPages).keys()].map((i) => {
                        const page = i + 1;
                        return (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                style={{
                                    color: currentPage === page ? 'white' : 'black',
                                    backgroundColor: currentPage === page ? 'black' : 'white',
                                    margin: '0 2px',
                                }}
                            >
                                {page}
                            </button>
                        );
                    })}

                    <button
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}

            {/* No results feedback */}
            {search.trim().length >= 3 && displayedData.length === 0 && (
                <p style={{ textAlign: 'center', marginTop: '20px' }}>
                    No matches found for "{search}"
                </p>
            )}
        </div>
    );
}
