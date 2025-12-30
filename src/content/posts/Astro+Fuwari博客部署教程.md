---
title: Astro + Fuwari + GitHub + Vercel + Cloudflare 博客部署教程
published: 2026-01-01
tags: [博客, Astro, Vercel, 教程]
category: 技术教程
---

# Astro + Fuwari + GitHub + Vercel + Cloudflare 博客部署教程

## 架构说明

```
本地 Fuwari → GitHub 仓库 → Vercel 自动构建 → Cloudflare DNS → 用户访问
```

---

## 一、环境准备

### 需要安装
- Node.js 18+ （https://nodejs.org/）
- pnpm（`npm install -g pnpm` 或 `scoop install pnpm`）
- Git（https://git-scm.com/）

### 需要的账号
- GitHub（https://github.com）
- Vercel（https://vercel.com）
- Cloudflare（https://cloudflare.com）
- 一个域名（NS 指向 Cloudflare）

---

## 二、本地搭建

### 1. 下载 Fuwari 模板

从 https://github.com/saicaca/fuwari 下载 ZIP 解压到 `D:\Blog`

或用 git clone：
```bash
git clone https://github.com/saicaca/fuwari D:\Blog
```

### 2. 安装依赖

```bash
cd /d D:\Blog
pnpm install
pnpm add sharp
```

### 3. 本地预览

```bash
pnpm dev
```

访问 `http://localhost:4321` 查看效果

---

## 三、配置博客

### 修改 `src/config.ts`

```typescript
export const siteConfig: SiteConfig = {
  title: "博客标题",
  subtitle: "副标题",
  lang: "zh_CN",
  // ...
};

export const profileConfig: ProfileConfig = {
  avatar: "assets/images/demo-avatar.png",
  name: "你的名字",
  bio: "个人简介",
  links: [],
};

export const licenseConfig: LicenseConfig = {
  enable: false,  // 关闭许可协议显示
  name: "",
  url: "",
};
```

---

## 四、写文章

### 文章位置
`src/content/posts/` 目录下，`.md` 格式

### 文章格式（frontmatter 必须）

```markdown
---
title: 文章标题
published: 2025-12-30
tags: []
---

正文内容，支持 Markdown 语法...
```

### 必填字段
- `title`: 文章标题
- `published`: 发布日期（YYYY-MM-DD 格式）
- `tags`: 标签数组（可以为空 `[]`）

### 可选字段
- `description`: 文章描述
- `category`: 分类
- `image`: 封面图
- `draft: true`: 草稿（不会显示）

---

## 五、推送到 GitHub

### 首次推送

1. 在 GitHub 创建新仓库（不勾选 README）

2. 执行命令：
```bash
cd /d D:\Blog
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/你的用户名/仓库名.git
git branch -M main
git push -u origin main
```

---

## 六、Vercel 部署

1. 登录 Vercel（用 GitHub 账号）
2. 点击 **Add New** → **Project**
3. 导入 GitHub 仓库
4. Framework Preset 选择 **Astro**
5. 点击 **Deploy**

部署完成后会得到 `xxx.vercel.app` 域名

---

## 七、Cloudflare DNS 配置

### Vercel 添加自定义域名
项目 → Settings → Domains → 输入域名 → Add

### Cloudflare 添加 DNS 记录

| 类型 | 名称 | 内容 | 代理状态 |
|------|------|------|----------|
| CNAME | blog | cname.vercel-dns.com | DNS only（灰云）|

### 如果开橙云代理
Cloudflare → SSL/TLS → 加密模式改为 **Full**

---

## 八、常用命令

### 本地开发
```bash
cd /d D:\Blog

# 启动本地预览
pnpm dev

# 停止预览
Ctrl + C
```

### 更新推送
```bash
# 添加所有更改
git add .

# 提交（引号里写本次改动说明）
git commit -m "更新说明"

# 推送到 GitHub（Vercel 自动部署）
git push
```

### 一键推送（三条合一）
```bash
git add . && git commit -m "更新" && git push
```

### 清除本地 DNS 缓存（访问不了时试试）
```bash
ipconfig /flushdns
```

---

## 九、日常更新流程

1. 在 `src/content/posts/` 新建 `.md` 文件
2. 写好 frontmatter 和正文
3. `pnpm dev` 本地预览
4. 满意后推送：
```bash
git add .
git commit -m "新文章：xxx"
git push
```
5. 等 1-2 分钟 Vercel 自动部署完成

---

## 常见问题

### Q: 文章不显示
检查 frontmatter 是否完整，`title`、`published`、`tags` 必须有

### Q: 构建失败
查看 Vercel → Deployments → Build Logs 错误信息

### Q: 自定义域名访问不了
1. 检查 DNS 记录是否正确
2. 清除浏览器缓存或用无痕模式
3. 执行 `ipconfig /flushdns`

### Q: 部署到错误分支
Vercel → Settings → Git → Production Branch 改为 `main`
