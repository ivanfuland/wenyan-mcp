import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
// @ts-ignore
import { initMarkdownRenderer, renderMarkdown, handleFrontMatter } from "./main.js";
import { themes } from "./theme.js";

// 初始化Express应用
const app = express();
app.use(cors());
app.use(bodyParser.json());

// 初始化Markdown渲染器
initMarkdownRenderer();

// 定义API路由
const router = express.Router();

// @ts-ignore - 忽略Express路由类型错误
router.post('/render', (req, res) => {
  try {
    const { content, themeId = 'default' } = req.body;
    
    if (!content) {
      return res.status(400).json({ error: '缺少content参数' });
    }
    
    // 获取主题
    let theme = themes[themeId];
    if (!theme) {
      theme = themes['default'];
    }
    
    // 处理frontmatter
    const preHandlerContent = handleFrontMatter(content);
    
    // 渲染Markdown为HTML
    renderMarkdown(preHandlerContent.body, theme.id)
      .then((html: string) => {
        // 返回结果
        res.json({
          title: preHandlerContent.title || '',
          html: html
        });
      })
      .catch((error: any) => {
        console.error('渲染错误:', error);
        res.status(500).json({ error: '渲染失败', message: error.message || '未知错误' });
      });
  } catch (error: any) {
    console.error('处理错误:', error);
    res.status(500).json({ error: '处理失败', message: error.message || '未知错误' });
  }
});

// @ts-ignore - 忽略Express路由类型错误
router.get('/themes', (req, res) => {
  const themeList = Object.entries(themes).map(([id, theme]) => ({
    id,
    name: theme.name,
    description: theme.description
  }));
  
  res.json(themeList);
});

// 使用路由
app.use('/api', router);

// 启动服务器
const PORT = process.env.PORT || 3000;
export function startApiServer() {
  app.listen(PORT, () => {
    console.log(`API服务器运行在 http://localhost:${PORT}`);
  });
}

// 如果直接运行此文件
if (import.meta.url.endsWith('api.js')) {
  startApiServer();
} 