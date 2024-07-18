import axios from "axios"
import { useState } from "react"
import { Link,useNavigate } from "react-router-dom"
// import Signup from "../Signup"

const Login = () => {
  const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const sendRequest = async ()=>{
    try {
      const res = await axios.post("http://localhost:5000/api/Login",{
        email:email,password:password,
      })
      console.log('Login response:',res.data)
      return res.data
    } catch (error) {
      // console.log('error:',error);
      console.log('Error:',error.response.data);
    }
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    sendRequest().then((data) => {
      if (data?.message.toLowerCase() === 'successfully logged in') {
        localStorage.setItem('token',data.token)
        navigate('/Categories')
      }
    })
  }
  return (
    <div className="flex flex-col  border-solid border-gray-300 border-2 p-4 rounded-3xl w-[586px] h-[525px] mx-[480px] my-6">
      <h1 className="text-2xl font-bold px-[220px] py-[10px]">Login</h1>
      <h2 className=" text-xl font-bold mx-[125px] my-1">Welcome back to ECOMMERCE</h2>
      <p className="text-sm font-medium px-36">The next gen business marketplace</p>
      <form onSubmit={handleSubmit}>
        <div className="px-20 py-3">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter" value={email} onChange={(e) => setEmail(e.target.value)} className="flex flex-col border-gray-300 border-2 rounded-md w-[356px] h-[36px] my-1 p-4" required />
        </div>
        <div className="px-20 py-3">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter" value={password} onChange={(e) => setPassword(e.target.value)} className="flex flex-col border-gray-300 border-2 rounded-md w-[356px] h-[36px] my-1 p-4" required />
        </div>
        <button type="submit" className=" bg-black text-white w-[356px] h-[36px] rounded-md text-sm px-3 mx-20 my-4">LOGIN</button>
      </form>
      <p className="px-40 py-4">Have an Account? <Link to='../Signup'>Signup</Link> </p>
    </div>
  )
}

export default Login