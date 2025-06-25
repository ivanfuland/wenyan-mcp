FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY tsconfig.json ./
COPY src ./src
COPY scripts ./scripts

RUN npm config set registry https://registry.npmjs.org/
RUN npm install --production
RUN npm install typescript
RUN npx tsc -b && npm run copy-assets

# 设置环境变量
ENV PORT=3050

# 暴露API服务端口
EXPOSE 3050

# 启动API服务
CMD ["node", "dist/api-cli.js"]
