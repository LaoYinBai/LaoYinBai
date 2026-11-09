# 维护说明

本目录生成 `LaoYinBai/LaoYinBai` 个人主页的所有自定义 SVG 资产。

## 文件职责

| 路径 | 说明 |
| --- | --- |
| `scripts/projects.json` | 精选作品数据源（唯一需要手动维护的内容） |
| `scripts/build-assets.mjs` | 生成横幅、作品卡片、邮箱按钮与开发活动统计（零依赖，Node 18+） |
| `assets/*.svg` | 生成产物，请勿手动编辑 |
| `assets/pacman/` | 由 GitHub Actions 从上游 Pac-Man 贡献热力图 Action 生成 |
| `.github/workflows/update-profile.yml` | 每日刷新统计与热力图 |

## 新增精选作品

1. 在 `scripts/projects.json` 的 `projects` 中追加一项，`id` 需唯一。
2. 运行 `node scripts/build-assets.mjs`（如需更高 API 限额，可设置 `GITHUB_TOKEN`，它不会写入文件）。
3. 在 `README.md` 的精选作品表格中加入对应的 `<picture>` 引用。

## 本地预览

```bash
node scripts/build-assets.mjs
```

直接用浏览器打开 `assets/*.svg` 即可检查动画与排版。
