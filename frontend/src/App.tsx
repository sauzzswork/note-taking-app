import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage'; // Import SignInPage
import DashboardPage from './pages/DashboardPage';
import AuthCallbackPage from './pages/AuthCallbackPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} /> {/* Add this route */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
      </Routes>
    </Router>
  );
}

export default App;
