import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div className='min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center px-6'>
      
      <h1 className='text-6xl font-bold mb-6 text-center'>
        PrepAI
      </h1>

      <p className='text-slate-400 text-xl text-center max-w-2xl mb-10'>
        RAG-Based AI Interview Preparation Assistant powered by
        semantic search and AI generation.
      </p>

      <div className='flex gap-4'>
        <Link
          to='/chat'
          className='bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-semibold transition'
        >
          Start Chatting
        </Link>

        <Link
          to='/mock'
          className='border border-cyan-500 px-6 py-3 rounded-xl hover:bg-cyan-500/10 transition'
        >
          Mock Interview
        </Link>
      </div>
    </div>
  )
}

export default LandingPage