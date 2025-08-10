import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useUserAuth from '../lib/userAuth';
import { toast } from 'react-toastify';

function Register() {
  const navigate = useNavigate();
  const success = useUserAuth((state) => state.success);
  const registerUSer = useUserAuth((state) => state.regiserUser);
  const setSuccess = useUserAuth((state) => state.setSuccess);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (success === true) {
      toast.success("Registration successful!", {
        position: "top-right",
        autoClose: 3000, // 3 seconds
        hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
      })
      navigate('/login');
      setSuccess()
    }
    if (success === false) {
      setError('Email already exists');
        setSuccess()

    }
  }, [success]);

  const validateEmail = (email) => {
    // Simple email regex validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Name is required.');
      return;
    }

    if (!email.trim()) {
      setError('Email is required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setError('Password is required.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    // All validations passed — call register function
    registerUSer(name, email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div
        className="w-full max-w-md p-8 rounded-lg shadow-lg"
        style={{ background: '#111' }}
      >
        
        {/* Title */}
        <h2
          className="text-2xl font-bold text-center mb-6"
          style={{ color: '#FFA500' }}
        >
          Create Your Account
        </h2>
<div className="text-red-600 mb-4">{error}</div>
        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label
              className="block mb-1 font-semibold"
              style={{ color: '#FFA500' }}
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
              style={{ borderColor: '#111', backgroundColor: '#fff' }}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label
              className="block mb-1 font-semibold"
              style={{ color: '#FFA500' }}
            >
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
            <label
              className="block mb-1 font-semibold"
              style={{ color: '#FFA500' }}
            >
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
          <button
            type="submit"
            className="w-full font-bold py-2 rounded-lg"
            style={{
              backgroundColor: '#FFA500',
              color: '#111',
              border: 'none',
            }}
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center mt-4" style={{ color: '#fff' }}>
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold"
            style={{
              color: '#FFD700',
              textDecoration: 'none',
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
