// AI 服务配置文件
// 请将你的 API Key 填入下面的变量中

// 支持的 AI 服务类型
const AI_SERVICES = {
  KIMI: 'kimi',      // Moonshot AI (Kimi)
  OPENAI: 'openai',
  TONGYI: 'tongyi',  // 阿里云通义千问
  WENXIN: 'wenxin',  // 百度文心一言
  CLAUDE: 'claude'   // Anthropic Claude
}

// 当前使用的 AI 服务（可以修改）
const CURRENT_SERVICE = AI_SERVICES.KIMI

// API Key 配置（请在这里填入你的 API Key）
const API_KEYS = {
  [AI_SERVICES.KIMI]: import.meta.env.VITE_KIMI_API_KEY || '',
  [AI_SERVICES.OPENAI]: import.meta.env.VITE_OPENAI_API_KEY || '',
  [AI_SERVICES.TONGYI]: import.meta.env.VITE_TONGYI_API_KEY || '',
  [AI_SERVICES.WENXIN]: import.meta.env.VITE_WENXIN_API_KEY || '',
  [AI_SERVICES.CLAUDE]: import.meta.env.VITE_CLAUDE_API_KEY || ''
}

// Kimi (Moonshot AI) API 调用
async function callKimi(messages, petInfo = {}) {
  const apiKey = API_KEYS[AI_SERVICES.KIMI]
  
  if (!apiKey) {
    throw new Error('请配置 Kimi API Key！请在 .env 文件中设置 VITE_KIMI_API_KEY')
  }

  // 构建系统提示词，让 AI 专注于宠物相关的问题
  const systemMessage = {
    role: 'system',
    content: `你是一个专业的宠物护理助手。你的名字是宠物AI助手，专门帮助宠物主人解决关于宠物护理、健康、训练、饮食等方面的问题。

${petInfo.name ? `当前用户的宠物名字是：${petInfo.name}，类型是：${petInfo.type}。` : ''}

请用友好、专业、易懂的方式回答用户的问题。如果问题与宠物无关，可以礼貌地提醒用户你主要专注于宠物相关的问题。`
  }

  const response = await fetch('https://api.moonshot.cn/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'moonshot-v1-8k', // Kimi 模型，也可以使用 moonshot-v1-32k 或 moonshot-v1-128k
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 2000
    })
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: { message: 'API 调用失败' } }))
    throw new Error(error.error?.message || `API 调用失败 (状态码: ${response.status})`)
  }

  const data = await response.json()
  return data.choices[0].message.content
}

// OpenAI API 调用
async function callOpenAI(messages, petInfo = {}) {
  const apiKey = API_KEYS[AI_SERVICES.OPENAI]
  
  if (!apiKey) {
    throw new Error('请配置 OpenAI API Key！请在 .env 文件中设置 VITE_OPENAI_API_KEY')
  }

  // 构建系统提示词，让 AI 专注于宠物相关的问题
  const systemMessage = {
    role: 'system',
    content: `你是一个专业的宠物护理助手。你的名字是宠物AI助手，专门帮助宠物主人解决关于宠物护理、健康、训练、饮食等方面的问题。

${petInfo.name ? `当前用户的宠物名字是：${petInfo.name}，类型是：${petInfo.type}。` : ''}

请用友好、专业、易懂的方式回答用户的问题。如果问题与宠物无关，可以礼貌地提醒用户你主要专注于宠物相关的问题。`
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo', // 可以使用 gpt-4 或其他模型
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 1000
    })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error?.message || 'AI API 调用失败')
  }

  const data = await response.json()
  return data.choices[0].message.content
}

// 通义千问 API 调用（示例）
async function callTongyi(messages, petInfo = {}) {
  // TODO: 实现通义千问 API 调用
  throw new Error('通义千问 API 暂未实现，请使用 OpenAI')
}

// 文心一言 API 调用（示例）
async function callWenxin(messages, petInfo = {}) {
  // TODO: 实现文心一言 API 调用
  throw new Error('文心一言 API 暂未实现，请使用 OpenAI')
}

// Claude API 调用（示例）
async function callClaude(messages, petInfo = {}) {
  // TODO: 实现 Claude API 调用
  throw new Error('Claude API 暂未实现，请使用 OpenAI')
}

// 统一的 AI 调用接口
export async function callAI(userMessage, conversationHistory = [], petInfo = {}) {
  try {
    // 将对话历史转换为 API 格式
    const messages = conversationHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content
    }))

    // 添加当前用户消息
    messages.push({
      role: 'user',
      content: userMessage
    })

    let response

    // 根据当前服务类型调用对应的 API
    switch (CURRENT_SERVICE) {
      case AI_SERVICES.KIMI:
        response = await callKimi(messages, petInfo)
        break
      case AI_SERVICES.OPENAI:
        response = await callOpenAI(messages, petInfo)
        break
      case AI_SERVICES.TONGYI:
        response = await callTongyi(messages, petInfo)
        break
      case AI_SERVICES.WENXIN:
        response = await callWenxin(messages, petInfo)
        break
      case AI_SERVICES.CLAUDE:
        response = await callClaude(messages, petInfo)
        break
      default:
        throw new Error('未知的 AI 服务类型')
    }

    return response
  } catch (error) {
    console.error('AI API 调用错误:', error)
    throw error
  }
}

