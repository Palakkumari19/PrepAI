import { useState } from 'react'
import axios from 'axios'

function MockInterviewPage() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [evaluation, setEvaluation] = useState('')

  const getQuestion = async () => {
    try {
      const response = await axios.get(
        'http://127.0.0.1:5000/mock-question'
      )

      setQuestion(response.data.question)
    } catch (error) {
      console.error(error)
    }
  }

  const evaluate = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/evaluate',
        {
          question,
          answer
        }
      )

      setEvaluation(response.data.evaluation)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='min-h-screen bg-slate-950 text-white p-8'>

      <h1 className='text-5xl font-bold mb-8'>
        Mock Interview
      </h1>

      <button
        onClick={getQuestion}
        className='bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-semibold'
      >
        Generate Question
      </button>

      {question && (
        <div className='mt-8 bg-slate-900 p-6 rounded-2xl'>
          <h2 className='text-2xl font-semibold mb-4'>
            Interview Question
          </h2>

          <p>{question}</p>
        </div>
      )}

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder='Write your answer...'
        className='w-full h-52 mt-8 bg-slate-900 rounded-2xl p-6 outline-none'
      />

      <button
        onClick={evaluate}
        className='mt-6 bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-semibold'
      >
        Evaluate Answer
      </button>

      {evaluation && (
        <div className='mt-8 bg-slate-900 p-6 rounded-2xl whitespace-pre-wrap'>
          {evaluation}
        </div>
      )}

    </div>
  )
}

export default MockInterviewPage