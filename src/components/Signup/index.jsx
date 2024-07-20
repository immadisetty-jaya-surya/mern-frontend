import { useState } from "react"
import { Link,/* useNavigate */ } from "react-router-dom"
import Verification from "../Verification"
import axios from "axios";
// import Login from "../Login"

const Signup = () => {
    // const history = useNavigate()
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [verified,setVerified] = useState(false)

    const sendRequest = async ()=>{
      try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/Signup`,{
          name:name,email:email,password:password
        })
        console.log('data',res.data);
        return res.data
      } catch (error) {
        console.log('error',error.response.data)
      }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        /* setVerified(true)
        // history.push('./verify-email')
        sendRequest() */
        sendRequest().then(()=>setVerified(true))
    }
  return (
  <div>
    {!verified ? (
      <div className="flex flex-col  border-solid border-gray-300 border-2 p-4 rounded-3xl w-[586px] h-[525px] mx-[480px] my-6">
        <h2 className=" text-2xl font-bold mx-[155px] my-1">Create your account</h2>
        <form onSubmit={handleSubmit} className=" py-1">
          <div className=" px-20 py-3">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter" value={name} onChange={(e) => setName(e.target.value)} className="flex flex-col border-gray-300 border-2 rounded-md w-[356px] h-[36px] my-1 p-4" required />
          </div>
          <div className="px-20 py-3">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter" value={email} onChange={(e) => setEmail(e.target.value)} className="flex flex-col border-gray-300 border-2 rounded-md w-[356px] h-[36px] my-1 p-4" required />
          </div>
          <div className="px-20 py-3">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter" value={password} onChange={(e) => setPassword(e.target.value)} className="flex flex-col border-gray-300 border-2 rounded-md w-[356px] h-[36px] my-1 p-4" required />
          </div>
          <button type="submit" className=" bg-black text-white w-[356px] h-[36px] rounded-md text-sm px-3 mx-20 my-4">CREATE ACCOUNT</button>
        </form>
        <p className="px-40 py-4">Have an Account? <Link to='../Login'>Login</Link> </p>
      </div>
    ):(<Verification email={email} />)}
  </div>
  )
}

export default Signup