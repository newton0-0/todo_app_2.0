// PrivateRoute.js
import { Route, useNavigate } from 'react-router-dom';
import * as authService from "./authHandler/AuthHandle"

const PrivateRoute = ({ element, ...rest }) => {
  const navigate = useNavigate();
  const isAuthenticated = authService.getToken() !== null;

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : 
    navigate("/session-timed-out")
  ;
};

export default PrivateRoute;
