import { useState } from 'react';

function TodoApp() {
    const [todos, setTodos] = useState([
        { id: 1, text: "學習 React", completed: true },
        { id: 2, text: "寫作業", completed: false }
    ]);
    const [inputValue, setInputValue] = useState("");

    const handleAdd = () => {
        if (!inputValue.trim()) return;
        const newTodo = {
            id: Date.now(),
            text: inputValue,
            completed: false
        };
        setTodos([...todos, newTodo]);
        setInputValue("");
    };

    const handleDelete = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleToggle = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    return (
        <div className="todo-container" style={{ maxWidth: '500px', margin: '2rem auto', border: '1px solid #646cff', padding: '2rem', borderRadius: '10px' }}>
            <h1 style={{ textAlign: 'center' }}>Todo List Final Project</h1>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="新增待辦事項..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button onClick={handleAdd}>新增</button>
            </div>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {todos.map(todo => (
                    <li key={todo.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px',
                        borderBottom: '1px solid #eee',
                        marginBottom: '5px',
                        background: todo.completed ? '#f0f0f0' : '#fff',
                        color: todo.completed ? '#888' : '#333',
                        borderRadius: '4px'
                    }}>
                        <span
                            onClick={() => handleToggle(todo.id)}
                            style={{ cursor: 'pointer', flex: 1, textAlign: 'left' }}
                        >
                            {todo.completed ? '☑️' : '⬜️'} {todo.text}
                        </span>
                        <button
                            onClick={() => handleDelete(todo.id)}
                            style={{ background: '#ff4444', color: 'white', border: 'none', marginLeft: '10px', fontSize: '0.8em' }}
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

export default TodoApp;
