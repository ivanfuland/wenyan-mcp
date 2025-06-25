import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const distDir = path.join(rootDir, 'dist');

// 确保目标目录存在
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 复制单个文件
function copyFile(src, dest) {
  console.log(`复制文件: ${src} -> ${dest}`);
  fs.copyFileSync(src, dest);
}

// 递归复制目录
function copyDir(src, dest) {
  console.log(`复制目录: ${src} -> ${dest}`);
  
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  }
}

// 复制主要的JavaScript文件
copyFile(path.join(srcDir, 'main.js'), path.join(distDir, 'main.js'));

// 复制CSS文件
copyFile(path.join(srcDir, 'mac_style.css'), path.join(distDir, 'mac_style.css'));

// 复制主题目录
copyDir(path.join(srcDir, 'themes'), path.join(distDir, 'themes'));

// 复制高亮样式目录
copyDir(path.join(srcDir, 'highlight'), path.join(distDir, 'highlight'));

console.log('资源文件复制完成！'); 