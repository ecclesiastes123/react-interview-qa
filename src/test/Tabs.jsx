import React, { useState } from 'react';

const tabsData = [
    { id: 'tab1', label: 'Tab 1', content: 'Content for Tab 1' },
    { id: 'tab2', label: 'Tab 2', content: 'Content for Tab 2' },
    { id: 'tab3', label: 'Tab 3', content: 'Content for Tab 3' },
];

export default function Tabs() {
    const [activeId, setActiveId] = useState(tabsData[0].id);

    const activeTab = tabsData.find((tab) => tab.id === activeId);

    return (
        <div style={styles.container}>
            {/* Header Buttons */}
            <div style={styles.tabList}>
                {tabsData.map((tab) => {
                    const isActive = tab.id === activeId;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveId(tab.id)}
                            style={{
                                ...styles.tabButton,
                                borderBottom: isActive ? '2px solid #2563eb' : 'none',
                                fontWeight: isActive ? 'bold' : 'normal',
                            }}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Active Content */}
            <div style={styles.content}>
                {activeTab?.content}
            </div>
        </div>
    );
}

const styles = {
    container: { maxWidth: '400px', margin: '2rem auto', fontFamily: 'sans-serif' },
    tabList: { display: 'flex', borderBottom: '1px solid #ccc' },
    tabButton: {
        flex: 1,
        padding: '10px',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        fontSize: '1rem',
    },
    content: { padding: '1rem' },
};