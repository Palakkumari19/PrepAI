import { useState } from 'react'
import axios from 'axios'
import FileUpload from '../components/FileUpload'
import ReactMarkdown from 'react-markdown'

function ChatPage() {
  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState([])
  const [sources, setSources] = useState([])
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!query.trim()) return

    setLoading(true)

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/chat',
        {
          query,
          top_k: 3,
          temperature: 0.5
        }
      )

      setMessages(prev => [
        ...prev,
        {
          question: query,
          answer: response.data.answer
        }
      ])

      setSources(response.data.sources)

      setQuery('')
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }

  return (
    <div className='min-h-screen bg-slate-950 text-white flex'>

      {/* Sidebar */}
      <div className='w-72 bg-slate-900 p-6 border-r border-slate-800'>
        <h2 className='text-2xl font-bold mb-6'>
          PrepAI
        </h2>

        <div className='space-y-4'>
          <div className='bg-slate-800 p-4 rounded-xl'>
            <h3 className='font-semibold mb-2'>
              Experimentation
            </h3>

            <p className='text-sm text-slate-400'>
              Top-K: 3
            </p>

            <p className='text-sm text-slate-400'>
              Temperature: 0.5
            </p>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className='flex-1 flex flex-col'>

        {/* Header */}
        <div className='border-b border-slate-800 p-6'>
          <h1 className='text-3xl font-bold'>
            AI Interview Chat
          </h1>
        </div>

        <div className='p-6 border-b border-slate-800'>
            <FileUpload />
        </div>

        {/* Messages */}
        <div className='flex-1 overflow-y-auto p-6 space-y-6'>

          {messages.map((msg, index) => (
            <div key={index}>

              <div className='bg-cyan-500 text-black p-5 rounded-2xl max-w-xl ml-auto font-medium'>
                {msg.question}
              </div>

              <div className='bg-slate-800 p-5 rounded-2xl max-w-2xl mt-4 leading-8 text-slate-200'>
                <ReactMarkdown>
                    {msg.answer}
                </ReactMarkdown>
              </div>

            </div>
          ))}

          {loading && (
            <div className='bg-slate-800 p-4 rounded-2xl w-fit'>
              Thinking...
            </div>
          )}

        </div>

        {/* Input */}
        <div className='p-6 border-t border-slate-800 flex gap-4'>

          <input
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Ask interview questions...'
            className='flex-1 bg-slate-800 rounded-xl p-4 outline-none'
          />

          <button
            onClick={sendMessage}
            className='bg-cyan-500 hover:bg-cyan-600 px-6 rounded-xl font-semibold'
          >
            Send
          </button>

        </div>

      </div>

      {/* Sources */}
      <div className='w-80 bg-slate-900 border-l border-slate-800 p-6 overflow-y-auto'>

        <h2 className='text-2xl font-bold mb-6'>
          Retrieved Sources
        </h2>

        <div className='space-y-4'>
          {sources.map((source, index) => (
            <div
              key={index}
              className='bg-slate-800 p-4 rounded-xl text-sm text-slate-300'
            >
              {source.slice(0, 300)}
            </div>
          ))}
        </div>

      </div>

    </div>
  )
}

export default ChatPage