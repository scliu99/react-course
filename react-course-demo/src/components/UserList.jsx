import { useState, useEffect } from 'react';

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(data => {
                // Limit to 5 users for demo
                setUsers(data.slice(0, 5));
                setLoading(false);
            })
            .catch(err => console.error("Error fetching data:", err));
    }, []);

    if (loading) return <p>載入使用者資料中...</p>;

    return (
        <div style={{ padding: '20px', border: '1px solid #444', borderRadius: '8px', margin: '20px 0' }}>
            <h2>使用者列表 (API Fetch Demo)</h2>
            <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
                {users.map(user => (
                    <li key={user.id} style={{ marginBottom: '10px', padding: '10px', background: '#333', borderRadius: '4px' }}>
                        <strong style={{ color: '#646cff' }}>{user.name}</strong> <br />
                        <small>{user.email}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
