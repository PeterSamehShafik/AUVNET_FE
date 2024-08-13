import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useChangeTitle from '../../hooks/useChangeTitle.jsx';
import { allRoles } from '../../Routes/ProtectedRoute.jsx';
import { AuthContext } from '../../context/AuthProvider.jsx';
import { FaUser, FaTags, FaBox } from 'react-icons/fa'; // Import icons

const CPanelHome = () => {
  useChangeTitle('Control Panel');
  const { auth } = useContext(AuthContext);

  const location = useLocation();
  const data = [
    {
      name: 'Users Control',
      description: 'View, edit, and manage users in the system.',
      route: 'users',
      roles: [allRoles.SA, allRoles.A],
      icon: <FaUser size={100} className="text-indigo-500 dark:text-indigo-400" />
    },
    {
      name: 'Categories Control',
      description: 'Organize, add, and manage product categories.',
      route: 'categories',
      roles: [allRoles.SA, allRoles.A],
      icon: <FaTags size={100} className="text-green-500 dark:text-green-400" />
    },
    {
      name: 'Products Control',
      description: 'Manage products, add new items, and update stock.',
      route: 'products',
      roles: [allRoles.SA, allRoles.A, allRoles.U],
      icon: <FaBox size={100} className="text-blue-500 dark:text-blue-400" />
    },
  ];

  return (
    <div className="py-10">
      <div className="container mx-auto px-6">
        <div className="flex justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">CPanel Dashboard</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 bg-gray-200 dark:bg-slate-900 p-6">
          {data.map((ele, idx) => {
            if (ele.roles.includes(auth.role)) {
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-xl"
                >
                  <div className="mb-4 text-3xl">
                    {ele.icon}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2 text-center">{ele.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-center">{ele.description}</p>
                  <Link to={`${location.pathname}/${ele.route}`}>
                    <button className="w-full bg-indigo-500 dark:bg-indigo-700 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 dark:hover:bg-indigo-800 transition-colors duration-300">
                      Go to {ele.name}
                    </button>
                  </Link>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default CPanelHome;
