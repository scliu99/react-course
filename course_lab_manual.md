# React 課程實作手冊 (Lab Manual)

本手冊包含課程中的所有練習題與參考解答。

---

## 練習 1: 建立第一個 Component (Hello Components)

**目標**: 熟悉 JSX 語法與 Component 結構。

### 步驟

1. 打開 `App.jsx`。
2. 清空原本的內容，建立一個新的 `App` component。
3. 建立一個 `Header` component 並在 `App` 中使用它。

### 程式碼範例 (`App.jsx`)

```jsx
// 1. 定義 Header Component
function Header() {
  return (
    <header style={{ backgroundColor: '#333', color: 'white', padding: '1rem' }}>
      <h1>我的第一個 React App</h1>
    </header>
  );
}

// 2. 定義 Main Component
function App() {
  return (
    <div>
      <Header />
      <main style={{ padding: '20px' }}>
        <p>這是一個段落內容。</p>
      </main>
    </div>
  );
}

export default App;
```

---

## 練習 2: 使用 Props 傳遞資料 (Dynamic Cards)

**目標**: 學習如何讓 Component 接收外部資料 (重用性)。

### 步驟

1. 建立一個 `Card` component，接收 `title` 和 `content` 兩個 props。
2. 在 `App` 中呼叫三次 `Card`，傳入不同資料。

### 程式碼範例

```jsx
// 在 App.jsx 或新檔案 Card.jsx 中定義
function Card({ title, content }) {
  // 這裡使用了物件解構 ({ title, content })
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', margin: '10px 0' }}>
      <h3 style={{ color: '#007bff' }}>{title}</h3>
      <p>{content}</p>
    </div>
  );
}

function App() {
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>課程列表</h1>
      <Card title="HTML/CSS 基礎" content="網頁結構與樣式設計入門。" />
      <Card title="JavaScript 進階" content="掌握 ES6+ 語法與非同步處理。" />
      <Card title="React 實戰" content="元件化開發與現代前端架構。" />
    </div>
  );
}

export default App;
```

---

## 練習 3: 讓畫面動起來 - useState (Counter)

**目標**: 體驗 State 改變觸發畫面更新的神奇效果。

### 步驟

1. 引入 `{ useState }`。
2. 建立計數器 state。
3. 綁定 `onClick` 事件。

### 程式碼範例

```jsx
import { useState } from 'react';

function Counter() {
  // [變數名稱, 更新變數的函式] = useState(初始值)
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>目前計數: {count}</h2>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button onClick={() => setCount(count - 1)}>減少 (-)</button>
        <button onClick={() => setCount(count + 1)}>增加 (+)</button>
        <button onClick={() => setCount(0)}>歸零 (Reset)</button>
      </div>
    </div>
  );
}

export default Counter; // 記得在 main.jsx 或 App.jsx 裡使用它
```

---

## 練習 4: 接串外部資料 (Side Effects & API)

**目標**: 學習使用 `useEffect` 在元件載入時呼叫 API 獲取資料。

### 步驟

1. 建立 `UserList` component。
2. 使用 `useState` 儲存使用者列表 (`users`)。
3. 使用 `useEffect` 搭配 `fetch` 呼叫 `jsonplaceholder` API。

### 程式碼範例

```jsx
import { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(callback, dependencyArray)
  // 空陣列 [] 代表只在「元件第一次掛載」時執行 (相當於 jQuery 的 $(document).ready)
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  if (loading) return <p>載入中...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>使用者列表 (API Demo)</h2>
      <ul>
        {users.map(user => (
          <li key={user.id} style={{ marginBottom: '10px' }}>
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
```

**別忘了在 `App.jsx` 中使用它：**

```jsx
import UserList from './UserList';

function App() {
  return (
    <div>
      <UserList />
    </div>
  )
}
```

---

## 專案實戰: 待辦事項清單 (Todo List)

**目標**: 整合 Props, State, List Rendering 完成一個功能完整的 App。

### 完整程式碼 (`App.jsx`)

```jsx
import { useState } from 'react';
import './App.css'; // 假設你有基本樣式

function App() {
  // 1. 定義 State: 待辦事項列表
  const [todos, setTodos] = useState([
    { id: 1, text: "學習 React", completed: true },
    { id: 2, text: "寫作業", completed: false }
  ]);
  const [inputValue, setInputValue] = useState("");

  // 2. 新增功能
  const handleAdd = () => {
    if (!inputValue.trim()) return; // 防止空字串
    const newTodo = {
      id: Date.now(), // 用時間戳記當作臨時 ID
      text: inputValue,
      completed: false
    };
    // 使用 Spread Operator (...) 建立新陣列
    setTodos([...todos, newTodo]);
    setInputValue(""); // 清空輸入框
  };

  // 3. 刪除功能
  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // 4. 切換完成狀態
  const handleToggle = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="container" style={{ maxWidth: '500px', margin: '2rem auto', border: '1px solid #ddd', padding: '2rem', borderRadius: '10px' }}>
      <h1 style={{ textAlign: 'center' }}>Todo List</h1>
    
      {/* 輸入區塊 */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="新增待辦事項..." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ flex: 1, padding: '8px' }}
        />
        <button onClick={handleAdd} style={{ padding: '8px 16px' }}>新增</button>
      </div>

      {/* 列表區塊 */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '10px',
            borderBottom: '1px solid #eee',
            textDecoration: todo.completed ? 'line-through' : 'none',
            color: todo.completed ? '#aaa' : '#333'
          }}>
            <span 
              onClick={() => handleToggle(todo.id)} 
              style={{ cursor: 'pointer', flex: 1 }}
            >
              {todo.completed ? '☑️' : '⬜️'} {todo.text}
            </span>
            <button 
              onClick={() => handleDelete(todo.id)}
              style={{ background: 'red', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}
            >
              刪除
            </button>
          </li>
        ))}
      </ul>
    
      {todos.length === 0 && <p style={{ textAlign: 'center', color: '#999' }}>目前沒有待辦事項 🎉</p>}
    </div>
  );
}

export default App;
```
