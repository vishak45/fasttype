import React from 'react';
import { Link } from 'react-router-dom';
function AboutUS() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">About Us</h1>

      <p className="text-lg text-gray-700 mb-4 leading-relaxed">
        Welcome to <span className="font-semibold text-orange-500">TypeGearUp</span>, your ultimate platform to improve your typing skills with fun, engaging challenges and detailed analytics. Our mission is to help people enhance their typing speed and accuracy while enjoying the learning process.
      </p>

     

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">Our Features</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>Wide range of typing tests from easy to hard.</li>
        <li>Real-time speed and accuracy tracking.</li>
        <li>Detailed statistics and progress graphs.</li>
        <li>Fun badges and animal speed rankings.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">Get In Touch</h2>
      <p className="text-gray-700">
        Have questions or suggestions? Feel free to <Link to="/contactus" className="text-orange-500 underline hover:text-orange-600">contact us</Link>. We’d love to hear from you!
      </p>
    </div>
  );
}

export default AboutUS;
