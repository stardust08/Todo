import React from 'react';
const logo = 'https://www.superceuticals.in/src/img/logo.png';

const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img src={logo} alt="Logo" className="w-48 h-auto" />
      <div className="mt-8 w-8 h-8 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
