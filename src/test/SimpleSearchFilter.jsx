import React,{ useState } from 'react';

export default function SimpleSearchFilter() {
    const [search, setSearch] = useState('');
    const items = ['Angular', 'Vue', 'Springboot', 'Laravel', 'Django'];

    // Filter items based on user input
    const filteredItems = items.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <h2>Search Framework</h2>
            <input
                type="text"
                value={search}
                placeholder="Search Frameworks ... "
                onChange={(e) => setSearch(e.target.value)}
            />

            <ul>
                {filteredItems.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </>
    );
}
