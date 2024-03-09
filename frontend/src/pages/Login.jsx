import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiBase } from "../constants";
import { Button } from "../components";
import { PiSignInBold } from "react-icons/pi";
import getAuth from "../utils/getAuth";
import { UserAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const {auth, setAuth} = UserAuth()
  const [user, setUser] = useState({ username: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${apiBase}/api/auth/login`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ username: user.username }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth(data)
        navigate("/dashboard")
      });
  };

  useEffect(() => {
    if (auth._id) {
      navigate("/dashboard");
    }
  },[])

  return (
    <div className="container p-4">
      <div className="flex justify-center items-center">
        <div className="w-4/12 max-md:w-full bg-gradient p-[1px] rounded-md">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex justify-center items-center bg-zinc-950 rounded-md p-4 w-full flex-col gap-3"
          >
            <h3 className="text-3xl max-md:text-xl bg-gradient bg-clip-text text-transparent">
              Login | Signup
            </h3>
            <input
              type="username"
              placeholder="Username"
              className="form__input inputdata bg-zinc-900"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <input type="password" className="form__input inputdata bg-zinc-900" placeholder="Password"/>
            <Button type="submit" text="Submit" variant="gradient" leftIcon={<PiSignInBold/>}/>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
