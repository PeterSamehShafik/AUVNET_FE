# SysCommerce

## Overview

This is the frontend of **SysCommerce**, a full-stack web application designed for managing products, categories, and user roles with distinct access levels. The frontend provides an intuitive user experience with features for users, admins, and super admins, integrated with secure authentication and role-based authorization mechanisms.

## Live Demo

🎉 [Demo Link](https://syscommerce.netlify.app)

## Repositories
- **Backend Repo**: [Backend Repo Link](https://github.com/ahmedessamrizk/SysCommerce_BE)

## Features

### User
- Perform CRUD operations on products.
- Add, view, and remove items from the wishlist.
- Toggle dark mode for better user experience.

### Admin
- View and delete user accounts.
- View and delete products.
- Perform CRUD operations on categories.

### Super Admin
- Manage admin accounts with full CRUD capabilities.
- View and delete products.
- Perform CRUD operations on categories.
- View and delete user accounts.

## Tech Stack

- **React**: Component-based architecture for building dynamic user interfaces.
- **Tailwind CSS**: For responsive and modern styling.
- **MUI**: Pre-built, customizable UI components.
- **Axios**: For handling API requests.
- **React Router**: For seamless navigation and routing.
- **React Context API**: Used for global state management across components.
- **Formik & Yup**: For form handling and data validation.

## Security

- **Role-based Authorization**: Users, admins, and super admins have different access levels, with distinct views and actions.
- **Form Validation**: Forms are validated using Formik and Yup to ensure input accuracy and security.


---

Feel free to open issues or submit pull requests if you find any bugs or have suggestions for improvements!
