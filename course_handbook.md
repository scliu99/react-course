# React 核心觀念學習手冊 (Course Handbook)

這份手冊是為了幫助大家從 jQuery/HTML/CSS 的思維，順利轉換到現代 React 開發而設計。不同於單純的語法速查表 (Cheatsheet)，我們將重點放在「為什麼要這樣寫」以及「背後的運作原理」。

---

## 1. 暖身：為什麼需要 Modern JavaScript (ES6+)？

React 開發非常依賴 JavaScript 的新特性。這不是為了炫技，而是為了讓程式碼更簡潔、更易讀。

### 1.1 `const` 與 `let` (變數宣告)
*   **以前的習慣**：到處用 `var`。
*   **現在的作法**：
    *   **`const` (常數)**：預設都用這個！這代表這個變數的「參照」不會被改變，保護資料不被意外覆寫。
    *   **`let` (變數)**：只有在「確定這個變數之後會被重新賦值 (reassigned)」時才用（例如迴圈計數器 `i`）。

### 1.2 箭頭函式 (Arrow Functions)
*   **為什麼要用？** 寫起來更短，而且在 React Component 中看起來更像一個乾淨的模組。
*   **範例**：
    ```javascript
    // 傳統寫法
    function add(a, b) {
        return a + b;
    }

    // 箭頭函式 (更像數學公式 f(x) = ...)
    const add = (a, b) => a + b;
    ```

### 1.3 解構賦值 (Destructuring)
*   **情境**：從一大包資料 (物件/陣列) 中，只取出我想要的幾個欄位。
*   **React 應用**：取出 `props` 屬性，或是取得 `useState` 的值。
    ```javascript
    // 雖然 user 物件有很多資料...
    const user = { name: "John", age: 20, email: "john@example.com" };
    
    // 我只想要拿 name 跟 age 來用
    const { name, age } = user; 
    // 現在可以直接用 name，不用一直打 user.name
    ```

---

## 2. 觀念轉換：從「命令」到「宣告」

這是學習 React 最重要的一關。請放下「操作 DOM」的習慣。

| jQuery / 傳統 JS (命令式) | React (宣告式) |
| :--- | :--- |
| **思維模式** | 「嘿瀏覽器，去找到 id='msg' 的元素，把它的文字改成 'Hello'」 | 「這個位置綁定了變數 `text`。當 `text` 改變時，畫面自己會變。」 |
| **程式碼** | `$('#msg').text('Hello')` | `<h1>{text}</h1>` |
| **操作對象** | 直接操作 **DOM 元素** | 操作 **資料 (State)** |
| **比喻** | 手動拿油漆去塗牆壁 | 或者是遙控器，按一下按鈕，電視畫面就變了 |

**口訣：不要想著怎麼「改畫面」，要想著怎麼「改資料」。資料一變，React 自動幫你重畫畫面。**

---

## 3. Component：自製的 HTML 標籤

React 允許你將 UI 拆解成獨立、可重複使用的積木，我們稱為 Component (元件)。

*   **本質**：就是一個**回傳 JSX (HTML)** 的 JavaScript 函式。
*   **命名**：首字母**一定要大寫** (例如 `App`, `Header`)，因為小寫是用來寫標準 HTML (`div`, `span`) 的。

```jsx
// 定義一個按鈕元件
function MyButton() {
  return <button>我是按鈕</button>;
}

// 在 App 中使用它 (像用積木一樣堆疊)
function App() {
  return (
    <div>
      <h1>歡迎光臨</h1>
      <MyButton />  {/*這就是我們剛剛做的元件*/}
      <MyButton />
    </div>
  );
}
```

---

## 4. Props：元件之間的溝通 (父子傳話)

如果 Component 是函式，那 **Props (Properties)** 就是函式的「參數」。

*   **方向**：單向資料流，永遠是**父元件傳給子元件**。
*   **特性**：**唯讀 (Read-only)**。子元件收到 Props 後，**不能修改它**（你看過兒子可以改變爸爸給的遺產嗎？不行，只能用）。

```jsx
// 爸爸 (Parent)
// 傳遞了 title 和 price 兩個資訊給卡片
<ProductCard title="iPhone 15" price={30000} />

// 子元件 (Child)
// 透過解構賦值接收資料
function ProductCard({ title, price }) {
  return (
    <div className="card">
      <h3>{title}</h3>  {/* 顯示 "iPhone 15" */}
      <p>價格: ${price}</p>  {/* 顯示 "價格: $30000" */}
    </div>
  );
}
```

---

## 5. 資料逆流：子元件傳話給父元件 (Child to Parent)

這是 React 另一個重要的觀念單元。
我們前面說過 Props 是「單向」的 (父 -> 子)，那如果兒子想跟爸爸說話怎麼辦？

### 5.1 核心概念：父親給兒子一個「呼叫器」
父元件不能直接讀取子元件的資料。
解決方法是：**父元件將一個函式 (Function) 當作 Props 傳給子元件**。
當子元件發生事情時，就呼叫這個函式，把資料當作參數傳回去。

**比喻**：
*   **Props (資料)**：爸爸給兒子 100 元 (兒子只能花，不能改爸爸錢包)。
*   **Props (函式)**：爸爸給兒子一張信用卡。兒子刷卡 (呼叫函式)，扣的是爸爸的帳戶 (更新父元件 State)。

### 5.2 實作範例

**情境**：有一個 `Counter` (子元件) 裡面的按鈕被按了，要通知 `App` (父元件) 更新總數。

```jsx
// 父元件 (App)
function App() {
  const [total, setTotal] = useState(0);

  // 1. 定義一個函式，準備給兒子用
  const handleUpdate = (amount) => {
    setTotal(total + amount);
  };

  return (
    <div>
      <h1>總數: {total}</h1>
      {/* 2. 把這個函式當作 Props 傳下去 */}
      <Counter onUpdate={handleUpdate} />
    </div>
  );
}

// 子元件 (Counter)
// 3. 接收 props 裡的 onUpdate 函式
function Counter({ onUpdate }) {
  return (
    <div>
      {/* 4. 發生事件時，呼叫這個函式，並把 1 傳回去 */}
      <button onClick={() => onUpdate(1)}>+1</button>
    </div>
  );
}
```

---

## 6. State (狀態)：元件的記憶力

這是最關鍵的概念。

### 5.1 為什麼需要 `useState`？
初學者常問：「為什麼不能用普通變數 (`let count = 0`) 就好？」

**原因**：React 的 Component 是一個函式。當畫面重新渲染時，函式會**重新執行**。
如果你用 `let count = 0`，每次函式重跑，`count` 又會變回 `0`，它記不住上一次的值。而且，**普通變數的改變，不會「通知」React 更新畫面**。

### 5.2 語法解密
`useState` 是 React 給你的「外掛」，讓你的函式擁有「記憶能力」。

```javascript
/* 
  count: 目前記憶中的數值 (Read)
  setCount: 修改數值的唯一遙控器 (Write)
  useState(0): 設定初始值為 0
*/
const [count, setCount] = useState(0); 
```

### 5.3 如何修改？
**絕對不能**直接改 `count` (例如 `count = 5`)，這樣 React 完全不知道資料變了，畫面不會動。
**必須使用** `setCount(5)`，這就像按下了「重新整理」的開關，React 會更新資料，並觸發畫面重繪。

---

## 7. Component 的生命週期 (Lifecycle) 與 useEffect

若要真正聽懂 `useEffect`，我們必須了解 Component 的「一生」。就像人會生老病死，Component 也有三個階段：

1.  **出生 (Mount)**：第一次出現在畫面上。
2.  **變老 (Update)**：因為 `state` 或 `props` 改變，導致畫面重畫。
3.  **死亡 (Unmount)**：從畫面上被移除 (例如切換頁面)。

`useEffect` 就是用來處理這三個階段的「外掛」。

### 6.1 語法對照表

| 生命階段 | 發生時機 | `useEffect` 寫法 | 常見用途 |
| :--- | :--- | :--- | :--- |
| **Mount (出生)** | 畫面剛產生後 | `useEffect(() => { ... }, [])` <br> **(注意空陣列)** | 呼叫 API、設定全域監聽 |
| **Update (更新)** | 指定資料改變後 | `useEffect(() => { ... }, [count])` | 搜尋過濾、同步資料 |
| **Unmount (死亡)** | 畫面移除前 | `return () => { ... }` <br> **(回傳一個清除函式)** | 清除計時器、移除監聽 |

### 6.2 完整範例 (包含清除副作用)

這是初學者最容易忽略的重點：**「當 Component 消失時，記得把垃圾帶走」**。
例如你設定了一個 `setInterval` 每秒計時，如果 Component 移除了你沒把它關掉，它會在背景一直跑，最後導致當機。

```javascript
import { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // 1. Mount (出生): 設定計時器
    console.log("時鐘開始運作");
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // 2. Unmount (死亡): 清除計時器 (Return function)
    // 這一行只有在 Component 要消失前會執行
    return () => {
      console.log("時鐘被移除了，停止計時");
      clearInterval(timerId); // 重要！記得清除
    };
  }, []); // [] 代表只在出生時設定一次計時器

  return <h2>現在時間：{time.toLocaleTimeString()}</h2>;
}
```

### 6.3 依賴陣列 `[]` 大解密 (重要！)

這是新手最容易「踩雷」的地方。請務必搞懂這三種寫法的差異：

#### 情境 1：`[]` 空陣列 (只做一次)
**翻譯**：「我只想要在元件**剛出生的時候**做一次，之後都不要煩我。」
**適用**：API 呼叫、初始設定。

```javascript
useEffect(() => {
  console.log("這行只會印出一次 (Mount)");
  
  fetch('/api/user').then(data => setUser(data));
}, []); // <--- 關鍵在這！空陣列
```

#### 情境 2：`[count]` 指定變數 (監聽模式)
**翻譯**：「請幫我盯著 `count`，**只有當它改變時**，才執行這裡的程式。」
**適用**：資料連動、搜尋過濾、儲存設定。

```javascript
useEffect(() => {
  console.log(`count 變成了 ${count}，同步儲存到 LocalStorage...`);
  
  localStorage.setItem('my-count', count);
}, [count]); // <--- 只要 count 一變，這裡就會跑
```

#### 情境 3：沒有陣列 (每次都做 - 危險區)
**翻譯**：「不管發生什麼事，**每一次**畫面重畫，都給我執行這段程式！」
**風險**：效能最差，且容易造成「無限迴圈 (Infinite Loop)」死機。

```javascript
useEffect(() => {
  console.log("我會一直跑一直跑...救命啊！");
}); // <--- 完全沒寫陣列，只要 state 一改，這裡就重跑
```

### 6.4 完整範例 (包含清除副作用)

這是初學者最容易忽略的重點：**「當 Component 消失時，記得把垃圾帶走」**。
例如你設定了一個 `setInterval` 每秒計時，如果 Component 移除了你沒把它關掉，它會在背景一直跑，最後導致當機。

```javascript
import { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // 1. Mount (出生): 設定計時器
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // 2. Unmount (死亡): 清除計時器 (Return function)
    return () => {
      clearInterval(timerId); // 重要！記得清除
    };
  }, []); 

  return <h2>現在時間：{time.toLocaleTimeString()}</h2>;
}
```

### 6.5 觀念總結
*   `[]` = **只會做一次** (Init)。
*   `[var]` = **針對數據變化做反應** (Reactive)。
*   `不寫` = **跟著 Render 狂跑** (Be Careful)。
*   `return` = **清理戰場** (Cleanup)。

---

## 8. 列表渲染 (Lists)

在 HTML 我們要寫五個 `<li>` 就要複製貼上五次。
在 React，我們用 JavaScript 的陣列方法 `map` 來自動產生。

*   **概念**：把「資料陣列」轉換成「HTML 陣列」。
*   **Key 的重要性**：React 需要一個唯一的識別證 (`key`) 來追蹤每一筆資料，這樣當順序改變或刪除時，效能才會好。

```javascript
const fruits = ["蘋果", "香蕉", "橘子"];

return (
  <ul>
    {fruits.map((fruit, index) => (
      <li key={index}>{fruit}</li>
    ))}
  </ul>
);
```

---

## 9. 總結

1.  **React 是宣告式的**：你負責改資料，React 負責更新畫面。
2.  **Component**：把 UI 切成小積木。
3.  **Props**：積木之間的溝通線 (唯讀)。
4.  **Callback**：子元件透過函式呼叫與父元件溝通。
5.  **useState**：積木自己的記憶體 (可修改，會驅動畫面更新)。
6.  **useEffect**：與外界溝通的自動化腳本 (API、計時器)。
