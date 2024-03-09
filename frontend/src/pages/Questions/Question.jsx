import { CommentCard, ProtectedRoute, Button, HrtLn } from "../../components"
import {useParams} from 'react-router-dom'
import { useEffect, useState } from "react"
import getAuth from "../../utils/getAuth"
import { apiBase } from "../../constants"
import { MdOutlineLibraryAdd } from "react-icons/md";

const Question = () => {
  const [question,setQuestion] = useState({question:'',comments:[],author:[]})
  const [comment,setComment] = useState({comment:''})
  const {slug} = useParams()
  const auth = getAuth()
 
  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`${apiBase}/api/questions/${slug}`,{
      method:'PATCH',
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        comment:comment.comment,
        author: auth._id
      })
    }).then(res => res.json()).then(data => {
      setQuestion({...question,comments:data.comments})
    })
  }

  useEffect(() => {
    fetch(`${apiBase}/api/questions/${slug}`)
    .then(res => res.json())
    .then(data => setQuestion({
      question: data.question,
      comments: data.comments,
      author: data.author
    }))
    console.log(question)
  },[slug])

  return (
    <ProtectedRoute>
      <div className="container p-4">
          <div className="bg-zinc-950 p-2 rounded-md w-full flex gap-3 flex-col">
            <h3 className="text-xl">Question</h3>
            <div className="bg-gradient p-[1px] rounded-lg">
              <p className="whitespace-pre-wrap bg-zinc-950 p-2 rounded-lg">{question.question}</p>
            </div>
            <span className="text-sm">Asked by : <span className="font-[700]">{question?.author?.username}</span></span>
          </div>
          <form className="flex py-4 flex-col gap-3" onSubmit={handleSubmit}>
            <h4 className="text-md">Add a comment</h4>
            <textarea placeholder="Type your comment here..." className="form__input inputdata bg-zinc-950 w-full h-40 whitespace-pre-wrap" onChange={(e) => setComment({...comment,comment:e.target.value})} value={comment.comment}/>
            <Button type="submit" text="Add comment" variant="gradient" extraClasses="max-sm:w-full" leftIcon={<MdOutlineLibraryAdd/>}/>
          </form>
          <HrtLn/>
          <div className="py-4 px-2 flex flex-col gap-2">
            {question.comments.length != 0 ? question.comments.map((comment) => (
              <CommentCard key={comment.comment} comment={comment} />
            )) : (
              <h5 className="text-md">No comments yet</h5>
            )}
          </div>
      </div>
    </ProtectedRoute>
  )
}

export default Question