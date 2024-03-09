import { useEffect, useState } from "react"
import { UserAuth } from "../../context/AuthContext"
import { apiBase } from "../../constants"
import { HrtLn } from "../../components"

const Find = () => {
  const {auth} = UserAuth()
  const [data,setData] = useState([])

  useEffect(() => {
    fetch(`${apiBase}/api/user/getUsersByCollege`,{
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        college: auth.college,
        _id: auth._id
      })
    }).then(res => res.json()).then(data => {
      if (!data.message) setData(data)
      else setData([])
    })
  },[])


  return (
    <div className='flex py-2 w-full flex-col gap-2'>
      <h3 className="text-center font-[500] underline underline-offset-4">Students in {auth.college}</h3>
      {data?.map((item) => (
        <div key={item._id} className="bg-zinc-950 p-2 rounded-md flex flex-col gap-2">
          <h4 className="text-md">{item.username}</h4>
          <HrtLn/>
          <div className="flex justify-between">
            <p>Name: {item.name}</p>
            <p>Semester: {item.semester}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Find