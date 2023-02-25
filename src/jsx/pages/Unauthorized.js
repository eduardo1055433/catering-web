import React from "react";
import { Link } from "react-router-dom";


const Unauthorized = () => {
   return (
      <div className="authincation">
         <div className="container">
            {" "}
            <div className="row justify-content-center h-100 align-items-center">
               <div className="col-md-7">				
                  <div className="form-input-content text-center error-page">
                     <h1 className="error-text font-weight-bold">999</h1>
                     <h4>
                        <i className="fa fa-thumbs-down text-danger" /> No Autorizado
                     </h4>
                     <p>No tienes los permisos suficientes , comunicate con tu Administrador</p>
                     <div>
                        <Link className="btn btn-primary" to="/dashboard">
                           Back to Home
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Unauthorized;
