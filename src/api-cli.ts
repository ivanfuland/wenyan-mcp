#!/usr/bin/env node

import { startApiServer } from './api.js';

console.log('启动 Markdown 渲染 API 服务...');
console.log('API服务将在 http://0.0.0.0:3050 运行');
console.log('可以使用以下接口:');
console.log('- GET /api/themes - 获取所有可用主题');
console.log('- POST /api/render - 渲染Markdown内容');
console.log('启动测试页面请运行: npm run test-page');

startApiServer(); 