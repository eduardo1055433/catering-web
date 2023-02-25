import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./authProvider";
import jwt from 'jwt-decode' // import dependency
import React from 'react'


const Auth = ({ allowedRoles }) => {
    const {auth} = useContext(AuthContext);
    const location = useLocation();
    let rol = '';
    let usuario = '';
    const userToken = sessionStorage.getItem('user-token');
    console.log(userToken);
    if(userToken !== null){
      if(userToken !== ''){
        var decoded = jwt(userToken);
        rol = decoded.role;
        usuario = decoded.user.nombre;
        
      }
    }    

     
  return (
    rol !== undefined && rol !== undefined?
      allowedRoles.find(role => rol.includes(role))
        // auth.role.find(role => allowedRoles?.includes(role))
        ? <Outlet/>
        : usuario
          ? <Navigate to="/unauthorized" state={{ from: location}} replace/>
          : <Navigate to="/login" state={{from: location}} replace/>
    :
      <Navigate to="/unauthorized" state={{ from: location}} replace/>
  )
}

export default Auth;

//          <Route path='unauthorized' element={<Unauthorized/>} />
