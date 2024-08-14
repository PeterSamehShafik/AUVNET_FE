import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from '../common/Navbar.jsx';
import { allRoles, ProtectedCredentials, ProtectedRoute } from './ProtectedRoute.jsx';
import Login from '../Components/Credentials/Login/Login.jsx';
import Register from '../Components/Credentials/Register/Register.jsx';
import NotFound from '../Components/NotFound/NotFound.jsx';
import Home from '../Components/Home/Home.jsx';
import CPanelHome from '../Components/CPanel/CPanelHome.jsx';
import UsersControl from '../Components/CPanel/Controls/UsersControl';
import CategoriesControl from '../Components/CPanel/Controls/CategoriesControl';
import ProductsControl from '../Components/CPanel/Controls/ProductsControl';
import WishlistPage from '../Components/Wishlist/Wishlist';
import AddData from '../Components/CPanel/FormPage/Control/AddData';
import EditData from '../Components/CPanel/FormPage/Control/EditData.jsx';

const AppRouter = ({ logout, validateUser }) => (
    <BrowserRouter>
        <Navbar logout={logout} />
        <Routes>
            <Route path='' element={<Home />} />
            <Route path='login' element={<ProtectedCredentials> <Login validateUser={validateUser} /> </ProtectedCredentials>} />
            <Route path='register' element={<ProtectedCredentials> <Register /> </ProtectedCredentials>} />

            <Route path='cpanel'>
                <Route
                    index
                    element={<ProtectedRoute> <CPanelHome /></ProtectedRoute>}
                />
                <Route path="users">
                    <Route
                        index
                        element={<ProtectedRoute roles={[allRoles.A, allRoles.SA]}> <UsersControl /></ProtectedRoute>}
                    />
                    <Route
                        path="add"
                        element={<ProtectedRoute roles={[allRoles.SA]}> <AddData /></ProtectedRoute>}
                    />
                    <Route
                        path="edit/:id"
                        element={<ProtectedRoute roles={[allRoles.SA]}> <EditData /></ProtectedRoute>}
                    />
                    <Route
                        path="*"
                        element={<Navigate to="/404" />}
                    />
                </Route>
                <Route path="categories" element={<ProtectedRoute roles={[allRoles.A, allRoles.SA]} />}>
                    <Route
                        index
                        element={<CategoriesControl />}
                    />
                    <Route
                        path="add"
                        element={<AddData />}
                    />
                    <Route
                        path="edit/:id"
                        element={<EditData />}
                    />
                    <Route
                        path="*"
                        element={<Navigate to="/404" />}
                    />
                </Route>
                <Route path="products">
                    <Route
                        index
                        element={<ProtectedRoute roles={[allRoles.A, allRoles.SA, allRoles.U]}> <ProductsControl /></ProtectedRoute>}
                    />
                    <Route
                        path="add"
                        element={<ProtectedRoute roles={[allRoles.U]}> <AddData /></ProtectedRoute>}
                    />
                    <Route
                        path="edit/:id"
                        element={<ProtectedRoute roles={[allRoles.U]}> <EditData /></ProtectedRoute>}
                    />
                    <Route
                        path="*"
                        element={<Navigate to="/404" />}
                    />
                </Route>
                <Route path="*"
                    element={<Navigate to="/404" />}
                />
            </Route>

            <Route path='wishlist'
                element={<ProtectedRoute roles={[allRoles.U]}> <WishlistPage /></ProtectedRoute>}
            />

            <Route path='404' element={<NotFound />} />
            <Route path='*' element={<Navigate to='/404' />} />
        </Routes>
    </BrowserRouter>
);

export default AppRouter;
