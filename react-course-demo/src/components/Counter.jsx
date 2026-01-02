import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div style={{ textAlign: 'center', margin: '20px 0', padding: '20px', border: '1px dashed #666', borderRadius: '8px' }}>
            <h2>Counter Demo</h2>
            <p style={{ fontSize: '2em', fontWeight: 'bold' }}>目前計數: {count}</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button onClick={() => setCount(count - 1)}>減少 (-)</button>
                <button onClick={() => setCount(count + 1)}>增加 (+)</button>
                <button onClick={() => setCount(0)}>歸零 (Reset)</button>
            </div>
        </div>
    );
}

export default Counter;
