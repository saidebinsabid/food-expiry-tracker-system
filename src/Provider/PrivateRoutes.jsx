import React, { use } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Pages/Loading';

const PrivateRoute = ({ children }) => {
    const { user, loading } = use(AuthContext);
    const location = useLocation();
    
    // If loading, show the loading spinner
    if (loading) {
        return <Loading />;
    }

    // If user is logged in, show the children (protected route)
    if (user && user?.email) {
        return children;
    }

    // If user is not logged in, redirect to login page
    return <Navigate 
    to='/auth/login' 
    state={{ from: location }} replace />;
};

export default PrivateRoute;