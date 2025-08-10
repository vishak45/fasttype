import React from 'react';

function ContactUs() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 min-h-screen bg-gray-50 flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Contact Us</h1>
      <p className="text-lg text-gray-700 mb-4">
        Have questions or want to get in touch? We'd love to hear from you!
      </p>
      <p className="text-lg text-orange-600 font-semibold">
        Email us at{' '}
        <a href="mailto:support@example.com" className="underline hover:text-orange-700">
          TypeGearUpsupport@gmail.com
        </a>
      </p>
    </div>
  );
}

export default ContactUs;
