import { useState } from "react";
import {useNavigate} from "react-router-dom";
import OtpInput from 'react-otp-input'
import axios from "axios";

// eslint-disable-next-line react/prop-types
const Verification = ({email}) => {
    const history = useNavigate()
    const[code,setCode]= useState('')
    const handleChange = (code) =>{
        setCode(code)
    }

    const sendRequest = async ()=>{
      try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/verifyOtp`,{
          email:email,otp:code
        })
        console.log(res.data);
        return res.data
      } catch (error) {
        console.log(error)
      }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        sendRequest().then(() => history("/Login"))
    }
  return (
  <div className="flex flex-col  border-solid border-gray-300 border-[1px] p-4 rounded-3xl w-[586px] h-[400px] mx-[480px] my-6">
    <h1 className="text-2xl font-bold px-[170px] py-[20px]">Verify your email</h1>
    <p className="text-sm font-medium px-32">Enter the 8 digit code you have received on</p>
    <form onSubmit={handleSubmit} className=" py-8">
      <div className=" px-20 py-3">
        <label htmlFor="code">Code</label>
        <OtpInput 
          numInputs={8} 
            inputStyle={{
              width: '46px',  
              height: '48px',  
              margin: '2px 1px',  
              fontSize: '1rem',  
              borderRadius: 6,  
              border: '1px solid rgba(193,193,193,1)'
            }} 
            renderSeparator={<span className="mx-1"></span>} 
            renderInput={(props) => <input {...props} />}
            value={code} 
            onChange={handleChange}  />
            </div>
            <button type="submit" className=" bg-black text-white w-[440px] h-[50px] rounded-md text-sm px-3 mx-20 my-10">VERIFY</button>
        </form>
    </div>
  )
}

export default Verification