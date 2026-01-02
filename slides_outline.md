# React 2.5小時體驗課程 - 投影片大綱

## Slide 1: 課程標題
- **標題**: 從 jQuery 到 React：現代前端開發極速入門
- **副標**: 2.5 小時打造你的第一個 React App
- **講師**: [Your Name]

## Slide 2: 今日目標
1. 搞懂 React 在紅什麼？與 jQuery 差在哪？
2. 學會 React 核心三大將：Component, Props, State
3. 實戰：做出一個 Todo List 待辦清單

---

## Section 1: 觀念篇 (Why React?)

## Slide 3: 以前我們怎麼寫網頁 (jQuery 時代)
- HTML 寫結構，CSS 寫樣式，JS 寫邏輯。
- **針對 DOM 操作**: `$('.box').show()`, `$('#btn').click(...)`
- **問題**: 當網頁變複雜 (例如 Facebook)，到處都在改 DOM，程式碼變成義大利麵 (Spaghetti Code)，難以維護。

## Slide 4: React 的出現與思維革命
- Created by Facebook (Meta)。
- **核心概念**: 
  - **Component (元件化)**: 網頁像樂高積木一樣組裝。
  - **Declarative (宣告式)**: 告訴 React 你要什麼畫面 (State -> UI)，而不是告訴它怎麼改 DOM。
  - **Virtual DOM**: 效能優化，只更新需要變動的地方。

## Slide 5: Demo - jQuery vs React
- (圖示或簡單代碼對比)
- jQuery: 手動加上 class, 手動改 text。Focus on "How"。
- React: 改變資料 `isActive = true`，畫面自動變。Focus on "What"。

## Slide 5.5: 暖身 - Modern JS (ES6+)
React 大量使用現代 JS 語法，你必須知道：
- **const / let**: 別再用 var。
- **Arrow Function**: `() => {}`。
- **Destructuring**: `const { name } = user` (取 Props 好用)。
- **Spread**: `[...list, newItem]` (不可變數據的關鍵)。

---

## Section 2: 語法與 Components

## Slide 6: JSX - 在 JS 裡寫 HTML?
- 看起來像 HTML，骨子裡是 JavaScript。
- 強大的表達力：`{ variable }` 直接嵌入變數。
- 只有一個根節點 (Parent)。

## Slide 7: 第一個 Component
- Component 就是一個回傳 JSX 的 Function。
- 命名首字母大寫 (e.g., `App`, `Header`)。
- 像自訂 HTML 標籤一樣使用它: `<Header />`。

## Slide 8: Props - 元件溝通的橋樑
- 就像 HTML 的屬性 (attribute)。
- `<Welcome name="John" />`
- 父傳子，單向資料流，不可修改 (Read-only)。

---

## Section 3: 互動的核心 - State

## Slide 9: 什麼是 State (狀態)?
- Component 自己的私有資料 (Memory)。
- 一般變數改變 -> 畫面**不會**變。
- State 改變 -> 觸發 **Re-render** (畫面更新)。

## Slide 10: useState Hook
- `const [count, setCount] = useState(0)`
- `count`: 當前的數值。
- `setCount`: 用來更新數值的 function (魔法開關)。
- **Rule**: 永遠用 `setCount`，不要直接 `count = 5`。

---

## Section 4: 實戰 - Todo List 邏輯

## Slide 11: 陣列渲染 (List Rendering)
- 不要再寫 `for` 迴圈拼 HTML 字串了！
- 使用 `array.map()` 將資料轉換成 UI。
- 記得加上 `key` (React 識別用)。

## Slide 12: 實戰專案架構
- **App**: 主容器。
- **Header**: 標題與輸入框。
- **TodoList**: 列表容器。
- **TodoItem**: 單一待辦事項。

## Slide 13: Let's Code!
- (切換到編輯器畫面，開始 Live Coding)

---

## Section 5: 進階功能 - 接串 API

## Slide 14: useEffect 與 API
- React 元件是純淨的 (Pure)，不應該在 render 過程中直接呼叫 API。
- 使用 `useEffect` 處理「副作用」(Side Effects)。
- 範例：從後端抓取使用者列表。
- 依賴陣列 `[]`: 確保只抓一次，不會造成無窮迴圈。

---

## Slide 15: 總結 (Recap)
- **Component**: 拆分 UI，重複利用。
- **Props**: 傳遞資料 (Parent -> Child)。
- **State**: 管理資料與互動 (UI = f(State))。
- **useEffect**: 處理外部資料/API。

## Slide 16: 下一步？
- 樣式解決方案 (Tailwind CSS, Styled Components)。
- 路由 (React Router)。
- 部署 (Vercel / Netlify)。
- 謝謝大家！Q&A。
