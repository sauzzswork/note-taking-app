import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const AuthCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const userParam = searchParams.get('user');
    if (userParam) {
      // Save the user data to local storage
      localStorage.setItem('user', decodeURIComponent(userParam));
      // Redirect to the dashboard
      navigate('/dashboard');
    } else {
      // Handle login error, maybe redirect to login page
      navigate('/');
    }
  }, [searchParams, navigate]);

  return <div>Loading...</div>;
};

export default AuthCallbackPage;