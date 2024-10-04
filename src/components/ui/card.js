import React from 'react';

export const Card = ({ className, children }) => (
  <div className={`card ${className}`}>
    <div className="card-content">
      {children}
    </div>
  </div>
);

export const CardHeader = ({ children }) => (
  <div className="card-header">{children}</div>
);

export const CardTitle = ({ children }) => (
  <h3 className="card-title">{children}</h3>
);

export const CardContent = ({ children }) => (
  <div className="card-body">{children}</div>
);
