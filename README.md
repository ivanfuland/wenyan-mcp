# Markdown 渲染器 API

## 概述

Markdown 渲染器是一个简单的服务，支持将 Markdown 格式的文章使用优雅的内置主题进行排版，生成美观的 HTML 代码。本项目提供 RESTful API 接口，适合集成到各种应用场景中。

## 功能特点

- 列出并选择支持的文章主题
- 使用内置主题对 Markdown 内容排版
- 支持代码高亮、数学公式和自定义图片属性
- 提供 RESTful API 接口

---

## 使用方式

### 安装依赖

确保已安装 [Node.js](https://nodejs.org/) 环境：

```bash
git clone https://github.com/your-username/markdown-renderer.git
cd markdown-renderer

npm install
```

### 启动 API 服务

```bash
npm start
```

服务将在 http://localhost:3000 启动。

### API 接口说明

#### 1. 获取可用主题列表

**请求**：
```
GET /api/themes
```

**响应**：
```json
[
  {
    "id": "default",
    "name": "Default",
    "description": "A clean, classic layout ideal for long-form reading."
  },
  {
    "id": "orangeheart",
    "name": "OrangeHeart",
    "description": "A vibrant and elegant theme in warm orange tones."
  },
  ...
]
```

#### 2. 渲染 Markdown 内容

**请求**：
```
POST /api/render
Content-Type: application/json

{
  "content": "# 标题\n\n正文内容",
  "themeId": "default"
}
```

**参数说明**：
- `content`：Markdown 内容（必填）
- `themeId`：主题 ID（可选，默认为 "default"）

**响应**：
```json
{
  "title": "标题",
  "html": "<div id=\"wenyan\">...</div>"
}
```

### 验证渲染效果

我们提供了一个可视化测试工具，方便您验证渲染效果：

1. 首先启动API服务：
```bash
npm start
```

2. 在另一个终端中启动测试页面：
```bash
npm run test-page
```

3. 在浏览器中访问 http://localhost:3001 即可打开测试工具

测试工具提供了以下功能：
- 选择不同主题
- 编辑Markdown内容
- 实时预览渲染效果

这样您可以直观地看到不同主题下的渲染效果，以及验证各种Markdown语法的支持情况。

---

## 配置说明（Frontmatter）

可以在 Markdown 文章的开头添加一段 `frontmatter`，提供 `title` 等信息：

```md
---
title: 文章标题
description: 文章描述
---

正文内容...
```

---

## 支持的特性

### 1. 代码高亮

```python
def hello_world():
    print("Hello, World!")
```

### 2. 数学公式

行内公式：$E=mc^2$

块级公式：
$$
\frac{d}{dx}e^x = e^x
$$

### 3. 自定义图片属性

```markdown
![alt文本](图片链接){width=300 height=200}
```

---

## License

Apache License Version 2.0
