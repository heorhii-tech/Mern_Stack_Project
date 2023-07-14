import { Navigate } from 'react-router-dom';
import Cookie from 'js-cookie';

const PublicRoutes = ({ children }) => {
    const loggedToSystem = Cookie.get('userToken');
    console.log(loggedToSystem);
    return(
        loggedToSystem ? <Navigate to='/' /> : children
    )
}

const PrivateRoute = ({ children }) => {
    const loggedToSystem = Cookie.get('userToken');
    console.log(loggedToSystem);
    return(
        loggedToSystem ? children : <Navigate to="/login" />
    )
}

export {
    PublicRoutes,
    PrivateRoute
}