# Yanyao's GitHub Pages

个人项目集合站，基于 GitHub Pages 部署。

## 项目列表

### 🎨 [Art Market Pulse](./art-market-viz/)
艺术市场动态可视化工具 - 纽约/中国双城艺术事件地图

**访问地址：** https://yanyao-shen.github.io/art-market-viz/art-market-viz/

---

## 添加新项目

1. 在仓库根目录创建新文件夹（如 `project-2/`）
2. 放入项目的 `index.html` 及相关文件
3. 在根目录 `index.html` 中添加项目卡片
4. 推送到 GitHub，自动部署

**新项目访问地址：** `https://yanyao-shen.github.io/art-market-viz/[project-folder]/`

## 本地开发

```bash
# 进入项目目录
cd art-market-viz

# 启动本地服务器
python3 -m http.server 8000

# 浏览器访问
open http://localhost:8000
```

## 部署

直接推送到 GitHub 仓库即可自动部署：

```bash
git add .
git commit -m "Restructure: move art-market-viz to subdirectory"
git push origin main
```

部署后访问：
- 项目导航页：https://yanyao-shen.github.io/art-market-viz/
- 艺术市场网站：https://yanyao-shen.github.io/art-market-viz/art-market-viz/
