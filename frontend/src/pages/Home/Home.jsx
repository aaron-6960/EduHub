import { HrtLn, ProtectedRoute } from "../../components"
import {ProfileNavbar} from "../../components"
import { Outlet } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

const Profile = () => {
  const {auth} = UserAuth()

  const genName = (name) => {
    if(!name) return ''
    return name.split(' ')[0]
  }

  return (
    <ProtectedRoute>
      <div className="container mt-4 px-2">
        <h2 className="text-4xl mb-2 bg-clip-text bg-gradient text-transparent max-xl:w-full font-[500]">Welcome {genName(auth?.name)}</h2>
        <HrtLn/> 
        <div className="flex gap-2">
          <div className="w-3/12"><ProfileNavbar/></div>
          <div className="w-9/12">
            <Outlet />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Profile