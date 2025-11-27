import React, { useState } from 'react'
import './App.css'
import { callAI } from './services/aiService'

function App() {
  const [petName, setPetName] = useState('')
  const [petType, setPetType] = useState('')
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessageContent = inputMessage.trim()
    const userMessage = {
      role: 'user',
      content: userMessageContent,
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages([...messages, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      // 调用真实的 AI API
      const aiResponse = await callAI(
        userMessageContent,
        messages,
        { name: petName, type: petType }
      )

      const aiMessage = {
        role: 'ai',
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('AI 调用失败:', error)
      const errorMessage = {
        role: 'ai',
        content: `❌ 抱歉，AI 服务暂时无法使用。错误信息：${error.message}\n\n请检查：\n1. API Key 是否正确配置\n2. 网络连接是否正常\n3. API 服务是否可用`,
        timestamp: new Date().toLocaleTimeString()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🐾 宠物AI助手</h1>
        <p>智能陪伴，贴心照顾</p>
      </header>

      <main className="main-content">
        {/* 宠物信息设置区域 */}
        <section className="pet-info-section">
          <h2>我的宠物信息</h2>
          <div className="pet-form">
            <input
              type="text"
              placeholder="宠物名字（如：小白）"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              className="input"
            />
            <select
              value={petType}
              onChange={(e) => setPetType(e.target.value)}
              className="select"
            >
              <option value="">选择宠物类型</option>
              <option value="dog">🐕 狗狗</option>
              <option value="cat">🐱 猫咪</option>
              <option value="bird">🐦 鸟类</option>
              <option value="other">🐾 其他</option>
            </select>
          </div>
          {petName && petType && (
            <div className="pet-display">
              <p>你好！我是 <strong>{petName}</strong>，我是一只可爱的{petType === 'dog' ? '🐕 狗狗' : petType === 'cat' ? '🐱 猫咪' : petType === 'bird' ? '🐦 小鸟' : '🐾 小宠物'}！</p>
            </div>
          )}
        </section>

        {/* AI对话区域 */}
        <section className="chat-section">
          <h2>AI智能对话</h2>
          <div className="chat-messages">
            {messages.length === 0 ? (
              <div className="welcome-message">
                <p>👋 欢迎使用宠物AI助手！</p>
                <p>你可以问我关于宠物护理、健康、训练等问题。</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className={`message ${msg.role}`}>
                  <div className="message-content">
                    <span className="message-role">{msg.role === 'user' ? '👤 你' : '🤖 AI'}</span>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</p>
                    <span className="message-time">{msg.timestamp}</span>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="message ai">
                <div className="message-content">
                  <span className="message-role">🤖 AI</span>
                  <p>正在思考中...</p>
                </div>
              </div>
            )}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="输入你的问题..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="input"
            />
            <button 
              onClick={handleSendMessage} 
              className="send-button"
              disabled={isLoading}
            >
              {isLoading ? '发送中...' : '发送'}
            </button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Made with ❤️ for pet lovers</p>
      </footer>
    </div>
  )
}

export default App

