# React 課程環境建置指引 (Environment Setup Guide)

在上課之前，請同學先確認電腦環境已經準備好以下工具。

## 1. 安裝 Node.js
React 開發環境依賴 Node.js。
- **檢查是否已安裝**: 打開終端機 (Terminal / Command Prompt) 輸入 `node -v`。
    - 如果出現版本號 (例如 `v18.17.0`)，代表已安裝。
    - 建議版本: **v18 (LTS)** 或以上。
- **安裝/更新**: 前往 [Node.js 官網](https://nodejs.org/) 下載 **LTS (Long Term Support)** 版本並安裝。

## 2. 程式碼編輯器 (VS Code)
推薦使用 Visual Studio Code。
### 推薦安裝 Extension (擴充套件)
請在 VS Code 左側 Extension 區搜尋並安裝：
1. **ES7+ React/Redux/React-Native snippets** (by dsznajder)
    - 提供快速語法 (Snippet)，例如打 `rafce` 可以快速產生 Component 結構。
2. **Prettier - Code formatter** (by Prettier)
    - 自動排版程式碼，保持整潔。
3. **Simple React Snippets** (by Burke Holland) - *Optional*

## 3. 建立 React 專案 (使用 Vite)
我們將在課堂上使用 Vite 來建立專案，它的速度比傳統 CRA 快非常多。

### 步驟 (課堂上會帶大家做一次)
1. 打開終端機，移動到你想放專案的資料夾 (例如 Desktop)。
   ```bash
   cd Desktop
   ```
2. 執行建立指令：
   ```bash
   npm create vite@latest my-react-app -- --template react
   ```
   *(註：我們這次課程使用 JavaScript，不使用 TypeScript)*

3. 進入專案資料夾並安裝依賴：
   ```bash
   cd my-react-app
   npm install
   ```

4. 啟動開發伺服器：
   ```bash
   npm run dev
   ```
   看到 `Local: http://localhost:5173/` 字樣代表成功！請用瀏覽器打開該網址。

## 4. 常見問題 (Troubleshooting)
- **錯誤: 'npm' 不是內部或外部命令...**
    - 原因：Node.js 沒安裝好或沒加入環境變數。
    - 解法：重新安裝 Node.js，安裝時勾選 "Add to PATH"。
- **權限錯誤 (EACCES)** (Mac/Linux)
    - 解法：在指令前加 `sudo` (不建議)，或是修復 npm 權限。通常重新安裝 Node.js 可以解決。
