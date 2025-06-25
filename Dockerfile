FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY tsconfig.json ./
COPY src ./src
COPY scripts ./scripts

RUN npm config set registry https://mirrors.cloud.tencent.com/npm/
RUN npm install --production
RUN npm install typescript
RUN npx tsc -b && npm run copy-assets

# 暴露API服务端口
EXPOSE 3000

# 启动API服务
CMD ["node", "dist/api-cli.js"]
