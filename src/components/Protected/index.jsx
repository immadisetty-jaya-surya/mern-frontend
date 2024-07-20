import axios from 'axios';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({children}) => {
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        const verifyToken = async () =>{
            try {
                const token = localStorage.getItem('token');
                console.log(token);
                if(!token) throw new Error('no token found')
                const res = await axios.get('http://localhost:5000/api/verifyToken',{
                    headers:{Authorization:`Bearer ${token}`},
                    // withCredentials:true,
                });
                if (res.status === 200) {
                    setIsAuthenticated(true)
                }
            } catch (error) {
                console.error('Error verifying Token',error);
                if (error?.response?.data) {
                    console.error('Backend error message:', error.response.data);
                }
                navigate('/Login');
            }
        }
        verifyToken()
    },[navigate])
  return isAuthenticated ? children : null
}

export default ProtectedRoute;