import { useState } from "react"
import { UserAuth } from "../../context/AuthContext"
import { Button } from '../../components'
import { MdEditDocument } from "react-icons/md";
import { profileSemesters, profileColleges, apiBase } from "../../constants";

const EditProfile = () => {
  const {auth,setAuth} = UserAuth()
  const [user,setUser] = useState(auth)

  const handleChange = (e) => {
    setUser({...user, 
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`${apiBase}/api/user/update`,{
      method:'PATCH',
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify(user)
    })
    setAuth({...auth, user})
    localStorage.setItem('auth', JSON.stringify(user))
  }

  return (
    <div className="flex w-full flex-col py-1">
      <h3 className="text-2xl underline underline-offset-4">Edit Profile</h3>
      <form className='flex gap-2 py-1' onSubmit={handleSubmit}>
        <div className="flex flex-col w-full gap-2">
          <input
            type="text"
            name="name"
            autoComplete="off"
            placeholder="Your Name"
            className="inputdata bg-zinc-950"
            value={user.name}
            onChange={handleChange}
          />
          <select
            type="text"
            name="college"
            autoComplete="off"
            placeholder="College"
            className="inputdata bg-zinc-950"
            defaultValue={user?.college}
            onChange={handleChange}
          >
            {profileColleges.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="flex w-full flex-col gap-2">
          <select
            type="text"
            name="semester"
            autoComplete="off"
            placeholder="Semester"
            className="inputdata bg-zinc-950"
            defaultValue={user?.semester}
            onChange={handleChange}
          >
          {profileSemesters.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
          <Button text="Update Profile" variant="gradient" rightIcon={<MdEditDocument/>}/>
        </div>
      </form>
    </div>
  )
}

export default EditProfile