import React from 'react';

export const Input = ({ className, value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      className={`border border-gray-300 rounded px-2 py-1 w-full ${className}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
