# 第一階段：建立與編譯環境
FROM node:18 AS builder

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json（如果有）
COPY package*.json ./

# 安裝所有依賴（包含 dev 依賴，因為我們使用 vite-node 執行 SSR）
RUN npm install

# 複製所有專案檔案
COPY . .

# 如果有需要進行額外 build 的步驟，可在此處加入
# 例如：RUN npm run build

# 第二階段：精簡運行環境
FROM node:18-slim

WORKDIR /app

# 從 builder 階段複製所有檔案，包括 node_modules
COPY --from=builder /app ./

# 暴露服務埠（與 server.ts 中預設的 3000 對應）
EXPOSE 3000

# 啟動 SSR 服務：使用 npx 執行 vite-node 指令啟動 server.ts
CMD ["npx", "vite-node", "src/server.ts"]
