# React 2.5小時 課程重點筆記 (Cheatsheet)

## 0. 必備 Modern JavaScript (ES6+) 語法
React 大量使用了現代 JS 語法，以下是開發時最常用到的功能：

### A. 箭頭函式 (Arrow Functions)
更簡潔的函式寫法，且自動綁定 `this` (雖然在 Function Component 中較少遇到 `this` 問題)。
```javascript
// 傳統寫法
function add(a, b) { return a + b; }

// 箭頭函式
const add = (a, b) => a + b;
const Component = () => <div>Hello</div>;
```

### B. 解構賦值 (Destructuring)
快速從物件或陣列中取出值 -> **Props 和 State 非常常用！**
```javascript
// 物件解構 (常用於 Props)
const user = { name: "John", age: 20 };
const { name, age } = user; // name="John", age=20

// 陣列解構 (常用於 useState)
const numbers = [1, 2];
const [first, second] = numbers;
```

### C. 展開運算子 (Spread Operator `...`)
**千萬不要直接修改 (Mutate) 舊資料！** 用 `...` 複製一份新的。
```javascript
// 複製並修改物件
const oldObj = { a: 1, b: 2 };
const newObj = { ...oldObj, b: 3 }; // { a: 1, b: 3 }

// 複製並新增陣列
const oldArr = [1, 2];
const newArr = [...oldArr, 3]; // [1, 2, 3]
```

### D. 樣板字面值 (Template Literals)
字串拼接不再用 `+` 號。
```javascript
const name = "React";
const greeting = `Hello, ${name}!`; // "Hello, React!"
```

### E. 常用陣列方法 (map, filter)
取代 `for` 迴圈處理列表渲染與資料操作。
```javascript
// 轉換資料 (Render List)
items.map(item => <li key={item.id}>{item.name}</li>)

// 刪除資料
items.filter(item => item.id !== idToDelete)
```

### F. Optional Chaining (`?.`) & Nullish Coalescing (`??`)
ES2020 新語法，處理 API 資料神器。
```javascript
// user 存在才取 name，否則回傳 undefined (不會報錯 crash)
const userName = user?.name; 

// 如果左邊是 null/undefined，就回傳右邊預設值 (比 || 更精準)
const count = data.count ?? 0;
```

---

## 1. 觀念轉換：jQuery vs React

| 功能 | jQuery (Imperative - 命令式) | React (Declarative - 宣告式) |
| :--- | :--- | :--- |
| **思維** | 「找到那個元素，然後改變它」 | 「改變資料 (State)，畫面自動更新」 |
| **更新文字** | `$('#count').text(newCount)` | `setCount(newCount)` (畫面自動綁定 `{count}`) |
| **監聽事件** | `$('#btn').on('click', fn)` | `<button onClick={fn}>` |
| **新增列表** | `$('ul').append('<li>...</li>')` | 更新陣列資料 `setList([...list, newItem])` |

---

## 2. 基本 Component 結構
```jsx
// 1. 引入 React (React 17+ 可省略，但 useState 需要引入)
import { useState } from 'react'
// 引入 CSS (如果是全域樣式)
import './App.css'

// 2. 定義 Component (首字母大寫的 Function)
function App() {
  // --- 邏輯區 (JavaScript) ---
  const title = "Hello React"
  
  const handleClick = () => {
    alert("Clicked!")
  }

  // --- 視圖區 (JSX) ---
  return (
    <div className="container">
      <h1>{title}</h1>
      <button onClick={handleClick}>Click Me</button>
    </div>
  )
}

// 3. 匯出 Component Let others use it
export default App
```

---

## 3. JSX 語法速查
- **Class**: 使用 `className` 代替 `class`。
- **變數/表達式**: 用 `{ }` 包起來。
- **樣式 (Inline Style)**: 需傳入物件，屬性用駝峰式命名 (camelCase)。
  ```jsx
  <div style={{ color: 'red', fontSize: '20px' }}>Red Text</div>
  ```
- **單一根節點**: 只能回傳一個父元素。不想多一層 `div` 可用 Fragment `<> ... </>`。

---

## 4. Props (傳遞資料)
父母 (`Parent`) 傳給小孩 (`Child`)，**唯讀 (Read-only)**。

**Parent:**
```jsx
<Card title="React 課程" price={100} />
```

**Child (Card):**
```jsx
// 解構賦值 (Destructuring) 接收 props
function Card({ title, price }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>價格: ${price}</p>
    </div>
  )
}
```

---

## 5. State (狀態) - `useState`
元件的「記憶體」，資料改變會觸發畫面重新渲染 (Re-render)。

```jsx
const [count, setCount] = useState(0) // 0 是初始值

// 修改方式
setCount(1)       // 直接設定值
setCount(n => n + 1) // 依據舊值更新 (Safe update)
```

**重要規則**: **永遠不要直接修改 state** (例如 `count = 1`)，一定要用 `setCount`。

---

## 6. 陣列處理 (Lists)
React 中幾乎都用 `map` 來產生列表。

```jsx
const fruits = ['Apple', 'Banana', 'Orange']

// 記得要加 key 屬性 (唯一值)
const listItems = fruits.map((fruit, index) => (
  <li key={index}>{fruit}</li>
))

return <ul>{listItems}</ul>
```

---

## 7. 常用陣列操作 (Immutable)
React 狀態更新需要產生「新的陣列/物件」，不能直接 `push` 或 `splice`。

| 動作 | 傳統 Mutable (不推薦) | React Immutable (推薦) |
| :--- | :--- | :--- |
| **新增** | `arr.push(newItem)` | `[...arr, newItem]` |
| **刪除** | `arr.splice(index, 1)` | `arr.filter(item => item.id !== targetId)` |
| **修改** | `arr[0].done = true` | `arr.map(item => item.id === targetId ? {...item, done: true} : item)` |

---

## 8. 輸入表單 (Controlled Components)
讓 React State 成為表單的「唯一真理來源」。

```jsx
const [text, setText] = useState('')

<input 
  value={text} 
  onChange={(e) => setText(e.target.value)} 
/>
```

---

## 9. 副作用 (Side Effects) - `useEffect`
處理「與畫面渲染無關」的事情，例如：呼叫 API、計時器、手動更改 DOM。

```jsx
import { useEffect } from 'react'

useEffect(() => {
  // 這裡的程式碼會在元件「掛載 (Mount)」後執行
  console.log('Component Mounted!')

  // 呼叫 API
  fetch('https://api.example.com/data')
    .then(res => res.json())
    .then(data => setData(data))

}, []) // 空陣列 [] 表示只執行一次
```

| 依賴陣列 `[]` | 執行時機 |
| :--- | :--- |
| `[]` (Empty) | 只在 **第一次掛載** 時執行一次 |
| `[count]` | 第一次掛載 + 當 `count` **改變時** 執行 |
| (省略) | **每次** 渲染都會執行 (危險！易造成無窮迴圈) |

