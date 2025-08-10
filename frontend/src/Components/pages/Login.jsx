import React, { useEffect,useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import useUserAuth from '../lib/userAuth';
import { toast } from 'react-toastify';


function Login() {
  const navigate=useNavigate()
  const token = useUserAuth((state) => state.token);

  const loginUSer = useUserAuth((state) => state.loginUSer);
  const success = useUserAuth((state) => state.success);
  const setSuccess = useUserAuth((state) => state.setSuccess);
  const [showLoading, setShowLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  useEffect(()=>{
    token&&navigate('/')
   if (success === true) {
  toast.success("Login successful!", {
    position: "top-right",
    autoClose: 3000, // 3 seconds
     hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
  });
  setSuccess()
  // Navigate after showing toast
  navigate('/');
}
    else if(success===false){
      console.log('Invalid email or password')
      setError('Invalid email or password')
      setSuccess(null)
      setShowLoading(false)
    }
    else if(success==null)
    {
       console.log('Ird')
    }
  },[success])
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg" style={{ background: '#111' }}>
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6" style={{ color: '#FFA500' }}>
          Login to Your Account
        </h2>

        {/* Form */}
        <form className="space-y-5" onSubmit={(e) => {e.preventDefault()
        loginUSer(email,password);  setShowLoading(true);}
         
        }>
          <div style={{ color: 'red' }}>{error}</div>
          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold" style={{ color: '#FFA500' }}>
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
              style={{ borderColor: '#111', backgroundColor: '#fff' }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-semibold" style={{ color: '#FFA500' }}>
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
              style={{ borderColor: '#111', backgroundColor: '#fff' }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          {
            showLoading ? (
               <button
               readonly
            type="submit"
            className="w-full font-bold py-2 rounded-lg"
            style={{
              backgroundColor: '#aaa49bff',
              color: '#ffffffff',
              border: 'none',
            }}
          >
            Loading
          </button>
            ):(  <button
            type="submit"
            className="w-full font-bold py-2 rounded-lg"
            style={{
              backgroundColor: '#ffa500',
              color: '#111',
              border: 'none',
            }}
          >
            Login
          </button>)
          }
        
        </form>

        {/* Signup Link */}
        <p className="text-center mt-4" style={{ color: '#fff' }}>
          Don’t have an account?{' '}
          <Link to="/register" className="font-semibold" style={{ color: '#FFD700', textDecoration: 'none' }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
