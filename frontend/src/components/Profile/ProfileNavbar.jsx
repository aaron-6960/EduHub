import { NavLink } from "react-router-dom"
import { MdEdit } from "react-icons/md";
import { FiSearch } from "react-icons/fi";

const navitems = [
  {title:"Find People",path:"",icon: <FiSearch/>},
  {title:"Edit Profile",path:"/profile",icon: <MdEdit/>}
]

const isActiveLink = (isActive) => {
  const common = 'flex gap-2'
  if(isActive) {
    return `bg-zinc-900 py-1 px-2 flex items-center rounded-md font-[600] text-[#681faa] ${common}`
  } else {
    return `white flex items-center hover:bg-zinc-900 font-[500] py-1 px-2 rounded-md ${common}`
  }
}

const ProfileNavbar = () => {
  return (
    <div className='flex flex-col p-2 bg-zinc-950 mt-2 rounded-md gap-2'>
      {navitems.map((item) => (
        <NavLink to={item.path} className={({isActive}) => isActiveLink(isActive)}>
            {item.icon}{item.title}
        </NavLink>
      ))}
    </div>
  )
}

export default ProfileNavbar