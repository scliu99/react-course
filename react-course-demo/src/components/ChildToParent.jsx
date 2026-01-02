import { useState } from 'react';

// 子元件 (Child)
// 接收父元件傳來的函式 (onMessage)
function ChildButton({ onMessage }) {
    return (
        <div style={{ border: '1px dashed #aaa', padding: '10px', marginTop: '10px' }}>
            <p>我是子元件 (Child)</p>
            <button onClick={() => onMessage("Hello from Child!")}>
                傳送 "Hello" 給爸爸
            </button>
            <button onClick={() => onMessage("React is fun!")} style={{ marginLeft: '10px' }}>
                傳送 "React" 給爸爸
            </button>
        </div>
    );
}

// 父元件 (Parent)
function ChildToParent() {
    const [message, setMessage] = useState("等待訊息中...");

    // 定義一個函式，準備給子元件呼叫
    const handleChildMessage = (msg) => {
        setMessage(msg);
    };

    return (
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
            <h3>Parent Component</h3>
            <p>來自兒子的訊息: <strong style={{ color: 'blue' }}>{message}</strong></p>

            {/* 把函式傳下去 */}
            <ChildButton onMessage={handleChildMessage} />
        </div>
    );
}

export default ChildToParent;
