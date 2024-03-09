import { useState, useEffect } from "react"
import {ProtectedRoute, Button, HrtLn, Question} from "../../components"
import {useNavigate} from 'react-router-dom'
import { apiBase } from "../../constants"
import { MdOutlineLibraryAdd } from "react-icons/md";
import { UserAuth } from "../../context/AuthContext"

const Ask = () => {
  const {auth} = UserAuth()
  const [question,setQuestion] = useState({question:""})
  const [questions,setQuestions] = useState([])
  const [userQuestions,setUserQuestions] = useState([])
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch(`${apiBase}/api/questions/new`,{
      method:'POST',
      headers:{
        "Content-Type":'application/json',
      },
      body: JSON.stringify({
        question: question.question,
        author: auth._id
      })
    }).then(res => res.json()).then(data => {
      navigate(`/question/${data.id}`)
    })
  }

  useEffect(() => {
    fetch(`${apiBase}/api/questions/user`,{
      headers: {
        'authorization': auth._id
      }
    }).then(res => res.json()).then(data => setUserQuestions(data))
  })
  useEffect(() => {
    fetch(`${apiBase}/api/questions`).then(res => res.json()).then(
      data => setQuestions(data)
    )
  },[])

  return (
    <ProtectedRoute>
      <div className='container p-4 flex gap-2'>
        <div className="flex flex-col w-8/12">
          <form className='flex flex-col justify-center gap-2 pb-2' onSubmit={handleSubmit}>
          <h2 className="text-3xl mb-2 bg-clip-text bg-gradient text-transparent max-xl:w-full font-[500] w-4/12">Ask a Question</h2>
            <textarea rows={10} placeholder='Write your question here' className='form__input inputdata bg-zinc-950'
              value={question.question}
              onChange={(e) => setQuestion({...question,question: e.target.value})}
            />
            <Button type="submit" text="Submit Question" variant="gradient" leftIcon={<MdOutlineLibraryAdd/>}/>
          </form>
          <HrtLn/>
          <div className="p-2 flex flex-col gap-2">
            <h4 className="text-[20px] underline underline-offset-8 pb-2">Recent Questions</h4>
            {questions.map((question) => (
              <Question question={question}/>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-4/12 gap-2">
        <h2 className="text-3xl bg-clip-text bg-gradient text-transparent max-xl:w-full font-[500] w-8/12 mb-3">Your Questions</h2>
            {userQuestions.map((question) => (
              <Question question={question}/>
            ))}
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Ask