import React from 'react';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left side: Main Content (Logo + Form) */}
      <div className="flex flex-1 items-center justify-center p-6 md:w-1/2">
        {/* Center the logo and content on both mobile and desktop */}
        <div className="w-full max-w-xs md:max-w-md bg-white rounded-2xl shadow-lg flex flex-col items-center px-4 py-8">
          <img src="/logo.png" alt="HD Logo" className="mb-6 w-14 md:w-16" />
          {children}
        </div>
      </div>

      {/* Right side: Large full-height background image, hidden on mobile */}
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url(/bottom-decoration.png)" }}
      />
    </div>
  );
};

export default AuthLayout;
