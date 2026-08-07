import React, { useState, useEffect, useRef } from 'react';

export default function InfiniteTable() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const infiRef = useRef(null);

    // 1. Fetch data whenever currentPage changes
    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);

        fetch(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=1`)
            .then((res) => res.json())
            .then((newItems) => {
                if (!isMounted) return;

                if (newItems.length === 0) {
                    setHasMore(false);
                } else {
                    setData((prev) => [...prev, ...newItems]);
                }
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
                if (isMounted) setIsLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [currentPage]);

    // 2. Intersection Observer setup with proper dependencies
    useEffect(() => {
        // Prevent trigger if currently fetching or no more data available
        if (isLoading || !hasMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const firstEntry = entries[0];
                if (firstEntry.isIntersecting) {
                    setCurrentPage((prev) => prev + 1);
                }
            },
            { threshold: 0.1 }
        );

        const currentTarget = infiRef.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [data, isLoading, hasMore]); // Re-runs after data loads to re-check viewport visibility

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h2>Infinite Scroll Table</h2>

            <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%' }}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Sentinel element observed by IntersectionObserver */}
            <div ref={infiRef} style={{ height: '20px', margin: '10px 0' }}>
                {isLoading && <p>Loading more items...</p>}
                {!hasMore && <p>No more items to load.</p>}
            </div>
        </div>
    );
}