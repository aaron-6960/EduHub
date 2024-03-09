import { Link, NavLink, useNavigate } from "react-router-dom"
import { navbarLinks } from "../constants"
import { Button } from  '.'
import { PiSignOutBold, PiSignInBold } from "react-icons/pi";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate()
  const {auth,setAuth} = UserAuth()

  const logOut = () => {
    localStorage.removeItem('auth')
    setAuth({
      _id: "",
      username: "",
      chatgrps: [],
  })
    navigate('/')
  }

  return (
    <div className="bg-gradient justify-center flex pb-1">
      <div className='container text-white p-2 flex justify-between items-center'>
        <div className="flex gap-3 align-middle items-center text-black">
            <Link to="/">
              <img src="/logo.png" width="140px"/>
            </Link>
          <div className='flex gap-1 items-center mt-3'>
            {navbarLinks.map((link) => (
              <NavLink to={link.link} key={link.link}
                className={({isActive}) => {
                  if(isActive) {
                    return 'bg-zinc-950 py-1 px-2 flex items-center rounded-full font-[600] focus:rounded-full text-[#681faa]'
                  } else {
                    return 'text-purple-200 flex items-center hover:text-zinc-900 font-[500] py-1 px-2 rounded-full focus:rounded-full'
                  }
              }}
              >
                {link.title}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="mt-2 mb-1">
          {auth._id ? (
            <>
              <Button variant="black" handleClick={logOut} text="Logout" extraClasses="border border-black hover:border hover:border-black"
                rightIcon={<PiSignOutBold/>}
              />
            </>
          ) : (
            <>
              <Button variant="black" handleClick={() => navigate('/login')} text="Login" extraClasses="border border-black hover:border hover:border-black"
                leftIcon={<PiSignInBold/>}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar