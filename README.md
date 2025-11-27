# 🐾 宠物AI助手 (PetAI)

一个智能的宠物护理助手应用，帮助宠物主人更好地照顾他们的宠物。

## ✨ 功能特点

- 🐕 宠物信息管理
- 🤖 AI智能对话咨询（支持 OpenAI）
- 💡 宠物护理建议
- 📱 现代化响应式设计

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置 API Key

**重要：** 在使用 AI 功能之前，需要配置 API Key。

#### 方法1：使用环境变量文件（推荐）

在项目根目录创建 `.env` 文件：

```env
VITE_OPENAI_API_KEY=你的_API_Key_在这里
```

#### 方法2：直接修改代码

打开 `src/services/aiService.js`，找到 `API_KEYS` 部分，直接填入你的 API Key。

⚠️ **安全提示**：`.env` 文件已被添加到 `.gitignore`，不会被提交到 Git。请妥善保管你的 API Key。

### 3. 启动开发服务器

```bash
npm run dev
```

应用将在 http://localhost:3000 打开

### 4. 构建生产版本

```bash
npm run build
```

## 📁 项目结构

```
PETAI/
├── src/
│   ├── services/
│   │   └── aiService.js    # AI API 服务
│   ├── App.jsx             # 主应用组件
│   ├── App.css             # 应用样式
│   ├── main.jsx            # 应用入口
│   └── index.css           # 全局样式
├── index.html              # HTML模板
├── package.json            # 项目配置
├── vite.config.js          # Vite配置
└── .env                    # API Key 配置（需要自己创建）
```

## 🔑 获取 API Key

### OpenAI（推荐）

1. 访问 [OpenAI Platform](https://platform.openai.com/)
2. 注册/登录账号
3. 进入 API Keys 页面
4. 创建新的 API Key
5. 复制 Key 并配置到 `.env` 文件中

### 其他 AI 服务

目前代码支持 OpenAI，其他服务（通义千问、文心一言、Claude）的接口已预留，但需要实现具体的 API 调用逻辑。

## 🛠️ 技术栈

- **React 18** - 前端框架
- **Vite** - 构建工具
- **OpenAI API** - AI 对话功能
- **CSS3** - 样式设计

## 📝 使用说明

1. **设置宠物信息**：在左侧输入宠物名字和类型
2. **开始对话**：在右侧输入框输入问题，AI 会根据你的宠物信息提供个性化建议
3. **查看回复**：AI 会以专业、友好的方式回答关于宠物护理、健康、训练等问题

## 🐛 常见问题

### API Key 配置后仍然报错？

1. 确保 `.env` 文件在项目根目录
2. 确保 API Key 格式正确（没有多余空格）
3. 重启开发服务器（停止后重新运行 `npm run dev`）
4. 检查 API Key 是否有效（账户余额是否充足）

### 网络请求失败？

- 检查网络连接
- 如果在中国大陆，可能需要配置代理或使用国内 AI 服务
- 检查 OpenAI API 服务状态

## 📄 许可证

ISC
