import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// 静态文件服务
app.use('/static', express.static(path.join(__dirname, 'themes')));
app.use('/static', express.static(path.join(__dirname, 'highlight')));
app.use('/static/css', express.static(path.join(__dirname, '.')));

// 设置模板引擎
app.use(express.urlencoded({ extended: true }));

// 主页 - 测试表单
app.get('/', (req, res) => {
  // 读取主题列表
  const themesPath = path.join(__dirname, 'themes');
  const themeFiles = fs.readdirSync(themesPath)
    .filter(file => file.endsWith('.css'))
    .map(file => file.replace('.css', ''));
  
  // 示例Markdown内容
  const exampleMarkdown = `---
title: Markdown渲染测试
description: 这是一个测试文档
---

# Markdown渲染测试

这是一个段落，包含**粗体**和*斜体*文本。

## 代码示例

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

## 数学公式

行内公式: $E=mc^2$

块级公式:

$$
\\frac{d}{dx}e^x = e^x
$$

## 列表

- 项目1
- 项目2
  - 子项目A
  - 子项目B

## 图片

![示例图片](https://picsum.photos/200/300)

## 表格

| 表头1 | 表头2 |
|-------|-------|
| 单元格1 | 单元格2 |
| 单元格3 | 单元格4 |
`;

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>文颜Markdown渲染测试</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 1000px; margin: 0 auto; padding: 20px; }
        .container { display: flex; }
        .form-container { flex: 1; padding-right: 20px; }
        .preview-container { flex: 2; }
        textarea { width: 100%; height: 400px; }
        select, button { margin: 10px 0; }
        iframe { width: 100%; height: 600px; border: 1px solid #ccc; }
      </style>
    </head>
    <body>
      <h1>文颜Markdown渲染测试工具</h1>
      <div class="container">
        <div class="form-container">
          <form id="renderForm">
            <div>
              <label for="theme">选择主题:</label>
              <select id="theme" name="theme">
                ${themeFiles.map(theme => `<option value="${theme}">${theme}</option>`).join('')}
              </select>
            </div>
            <div>
              <label for="markdown">Markdown内容:</label>
              <textarea id="markdown" name="markdown">${exampleMarkdown}</textarea>
            </div>
            <button type="submit">渲染预览</button>
          </form>
        </div>
        <div class="preview-container">
          <h2>渲染结果:</h2>
          <iframe id="preview" name="preview"></iframe>
        </div>
      </div>
      
      <script>
        document.getElementById('renderForm').addEventListener('submit', async function(e) {
          e.preventDefault();
          
          const markdown = document.getElementById('markdown').value;
          const theme = document.getElementById('theme').value;
          
          try {
            const response = await fetch('/render', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ 
                content: markdown, 
                themeId: theme
              })
            });
            
            const data = await response.json();
            
            // 更新iframe内容
            const iframe = document.getElementById('preview');
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            iframeDoc.open();
            iframeDoc.write(data.html);
            iframeDoc.close();
          } catch (error) {
            console.error('渲染错误:', error);
            alert('渲染失败: ' + error.message);
          }
        });
      </script>
    </body>
    </html>
  `);
});

// 渲染API
app.use(express.json());
app.post('/render', async (req, res) => {
  try {
    // 转发请求到实际的API
    const apiResponse = await fetch('http://localhost:3000/api/render', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });
    
    const data = await apiResponse.json();
    res.json(data);
  } catch (error) {
    console.error('API调用错误:', error);
    res.status(500).json({ error: '渲染失败', message: error.message });
  }
});

// 启动服务器
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`测试页面运行在 http://localhost:${PORT}`);
}); 