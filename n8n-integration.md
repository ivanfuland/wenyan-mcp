# Markdown渲染API在n8n中的使用指南

## 部署服务

### 方法一：使用Docker Compose（推荐）

1. 确保您的n8n已经在Docker中运行，并且有一个名为`n8n-network`的网络

2. 在项目根目录下运行：
```bash
docker-compose up -d
```

3. 服务将在后台启动，并自动连接到n8n网络

### 方法二：直接构建Docker镜像

1. 构建Docker镜像：
```bash
docker build -t markdown-renderer .
```

2. 运行容器并连接到n8n网络：
```bash
docker run -d --name markdown-renderer --network n8n-network -p 3000:3000 markdown-renderer
```

## 在n8n中使用

### 1. 使用HTTP Request节点调用API

#### 获取主题列表

1. 添加一个HTTP Request节点
2. 配置如下：
   - 方法：GET
   - URL：http://markdown-renderer:3000/api/themes
   - 认证：无

#### 渲染Markdown内容

1. 添加一个HTTP Request节点
2. 配置如下：
   - 方法：POST
   - URL：http://markdown-renderer:3000/api/render
   - Body：JSON
   - 内容示例：
   ```json
   {
     "content": "# 标题\n\n正文内容",
     "themeId": "default"
   }
   ```

### 2. 工作流示例

以下是一个简单的工作流示例：

1. 触发节点（如Webhook）
2. Function节点（准备Markdown内容）
3. HTTP Request节点（调用渲染API）
4. 后续处理（如发送邮件、保存到数据库等）

### 注意事项

- 确保n8n容器可以通过`markdown-renderer`主机名访问渲染服务
- 如果遇到网络问题，可以尝试使用服务器IP地址替代主机名
- 渲染结果中的HTML可以直接用于邮件发送等场景 