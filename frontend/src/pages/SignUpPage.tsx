import React, { useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api';

const SignUpPage = () => {
  const [formData, setFormData] = useState({ fullName: '', dateOfBirth: '', email: '', otp: '' });
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (!isOtpSent) {
        await axios.post(`${API_URL}/auth/signup`, {
          fullName: formData.fullName,
          email: formData.email,
          dateOfBirth: formData.dateOfBirth,
        });
        setIsOtpSent(true);
      } else {
        const { data } = await axios.post(`${API_URL}/auth/verify`, {
          email: formData.email,
          otp: formData.otp,
        });
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
     

      <h2 className="text-3xl font-bold mb-1">Sign up</h2>
      <p className="text-gray-400 mb-8">Sign up to enjoy the feature of HD</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Your Name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            disabled={isOtpSent}
            value={formData.fullName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          />
        </div>

        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            required
            disabled={isOtpSent}
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            disabled={isOtpSent}
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          />
        </div>

        {isOtpSent && (
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
            <input
              id="otp"
              name="otp"
              type="text"
              required
              value={formData.otp}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
          </div>
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? 'Loading...' : isOtpSent ? 'Verify & Sign Up' : 'Get OTP'}
        </button>
        <a
  href="http://localhost:5000/api/auth/google"
  className="mt-6 w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
>
  <img src="/google.png" alt="Google" className="w-5 h-5 mr-2" />
  Sign in with Google
</a>
      </form>

      <p className="mt-6 text-gray-500 text-center">
        Already have an account?? <Link to="/signin" className="text-blue-600 hover:underline">Sign in</Link>
      </p>
    </AuthLayout>
  );
};

export default SignUpPage;
