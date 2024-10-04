import React from 'react';

export const Button = ({ className, onClick, children }) => {
  return (
    <button
      className={`bg-blue-500 text-white py-2 px-4 rounded ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
