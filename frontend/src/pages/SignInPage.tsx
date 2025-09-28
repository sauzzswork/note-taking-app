import React, { useState } from 'react';
import AuthLayout from '../components/AuthLayout';

const SignInPage = () => {
  const [formData, setFormData] = useState({ email: '', otp: '', keepLoggedIn: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add sign in logic here
  };

  return (
    <AuthLayout>
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-lg">
        <h2 className="text-4xl font-bold mb-1">Sign in</h2>
        <p className="text-gray-400 mb-8">Please login to continue to your account.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="username@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
              OTP
            </label>
            <input
              id="otp"
              name="otp"
              type="text"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center justify-between">
            <a href="#" className="text-blue-600 text-sm hover:underline">
              Resend OTP
            </a>
            <div className="flex items-center">
              <input
                id="keepLoggedIn"
                name="keepLoggedIn"
                type="checkbox"
                checked={formData.keepLoggedIn}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="keepLoggedIn" className="ml-2 block text-sm text-gray-500">
                Keep me logged in
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-indigo-700 transition"
          >
            Sign in
          </button>
        </form>

        <p className="text-center text-gray-500 mt-7">
          Need an account?{' '}
          <a
            href="https://note-taking-gsuijzjwd-saurav-mishras-projects.vercel.app/"
            className="text-blue-600 hover:underline"
            
          >
            Create one
          </a>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignInPage;
