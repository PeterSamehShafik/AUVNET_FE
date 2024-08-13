import React, { createContext, useState } from 'react';

// Create the Auth Context
export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [cat, setCat] = useState({ slug: null, _id: 'all' }); // Initialize auth state

  return (
    <CategoryContext.Provider value={{ cat, setCat }}>
      {children}
    </CategoryContext.Provider>
  );
};
