import { useState } from 'react'
import Header from './components/Header'
import Card from './components/Card'
import Counter from './components/Counter'
import UserList from './components/UserList'
import TodoApp from './components/TodoApp'

function App() {
    const [activeTab, setActiveTab] = useState('all');

    return (
        <>
            <div style={{ marginBottom: '2rem' }}>
                <button onClick={() => setActiveTab('all')} style={{ marginRight: '10px' }}>全部展示 (All)</button>
                <button onClick={() => setActiveTab('components')}>1. Components</button>
                <button onClick={() => setActiveTab('state')}>2. State</button>
                <button onClick={() => setActiveTab('api')}>3. API</button>
                <button onClick={() => setActiveTab('todo')}>4. Final Project</button>
            </div>

            <hr />

            {/* 練習 1 & 2 */}
            {(activeTab === 'all' || activeTab === 'components') && (
                <section>
                    <h2>Exercise 1 & 2: Components & Props</h2>
                    <Header />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                        <Card title="HTML/CSS" content="基礎結構" />
                        <Card title="JavaScript" content="邏輯控制" />
                        <Card title="React" content="元件化開發" />
                    </div>
                </section>
            )}

            {/* 練習 3 */}
            {(activeTab === 'all' || activeTab === 'state') && (
                <section>
                    <hr />
                    <h2>Exercise 3: State & Events</h2>
                    <Counter />
                </section>
            )}

            {/* 練習 4 */}
            {(activeTab === 'all' || activeTab === 'api') && (
                <section>
                    <hr />
                    <h2>Exercise 4: useEffect & API</h2>
                    <UserList />
                </section>
            )}

            {/* Final Project */}
            {(activeTab === 'all' || activeTab === 'todo') && (
                <section>
                    <hr />
                    <h2>Final Project: Todo List</h2>
                    <TodoApp />
                </section>
            )}
        </>
    )
}

export default App
