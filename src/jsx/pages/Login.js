import React, { useState,useContext,useEffect } from 'react'
import { useNavigate, useLocation } from "react-router";
import { Link } from 'react-router-dom'
import AuthContext from "../../services/authProvider";
import axios from "axios"
//
import logo from '../../images/logo-2.png'
import login from "../../images/bg-login2.png";
import loginbg from "../../images/bg-login.jpg";
import jwt from 'jwt-decode' // import dependency

const url = "http://localhost:8881/Login";//"https://api-catering.sisplani.com/auth/login";

function Login (props) {
  const navigate = useNavigate();
  const location = useLocation();
  let errorsObj = { email: '', password: '' };
  const from = "/VentasTicket";
  const { auth, setAuth } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errors, setErrors] = useState(errorsObj);
  
    function onLogin(e) {
        e.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };
        if (name === '') {
            errorObj.name = 'Email is Required';
            error = true;
        }
        if (password === '') {
            errorObj.password = 'Password is Required';
            error = true;
        }
        setErrors(errorObj);
        console.log(error);

        if (error) {

          return ;
        }
        var data = JSON.stringify({
          "username": "eroque",
          "password": "1033156"
        });

        var config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://api-catering.sisplani.com/auth/login",
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };

        axios(config)
        .then(function (response) {
          var decoded = jwt(response.data.token);
          console.log(decoded);

          if (decoded.message) {
            console.log(decoded.message);
            const role = [decoded.role];
            const token = response.data.token;
            const ruta = response.data.token;

            setAuth({ role, token, name });
            console.log(auth);
            sessionStorage.setItem('user-token', token);
            //sessionStorage.setItem('user-ruta', ruta);

            setName('');
            setPassword('');
            
            navigate(from, { replace: true });
          }
        })
        .catch(function (error) {
          console.log(error);
        });

    }
    useEffect(() => {
      sessionStorage.clear();
    }, []);
  return (
        <div className="login-main-page" style={{backgroundImage:"url("+ loginbg +")"}}>
            <div className="login-wrapper">
                <div className="login-aside-left" style={{backgroundImage:"url("+ login +")"}}>
                    <Link to="/dashboard" className="login-logo">
                        <img src={logo} alt="" />
                      </Link>
                    <div className="login-description">
                        <h2 className="mb-2">Check the Status</h2>
                        <p className="fs-12">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,</p>
                        <ul className="social-icons mt-4">
                            <li><Link to={"#"}><i className="fab fa-facebook-f"></i></Link></li>
                            <li><Link to={"#"}><i className="fab fa-twitter"></i></Link></li>
                            <li><Link to={"#"}><i className="fab fa-linkedin-in"></i></Link></li>
                        </ul>
                        <div className="mt-5">
                            <Link to={"#"} className=" me-4">Privacy Policy</Link>
                            <Link to={"#"} className=" me-4">Contact</Link>
                            <Link to={"#"} className="">© 2023 DexignZone</Link>
                        </div>
                    </div>
                </div>
                <div className="login-aside-right">
                    <div className="row m-0 justify-content-center h-100 align-items-center">
                      <div className="col-xl-7 col-xxl-7">
                        <div className="authincation-content">
                          <div className="row no-gutters">
                            <div className="col-xl-12">
                              <div className="auth-form-1">
                                <div className="mb-4">
                                    <h3 className="text-primary mb-1">Welcome to Karciz</h3>
                                    <p className="">Sign in by entering information below</p>
                                </div>
                                {props.errorMessage && (
                                    <div className='bg-red-300 text-red-900 border border-red-900 p-1 my-2'>
                                        {props.errorMessage}
                                    </div>
                                )}
                                {props.successMessage && (
                                    <div className='bg-green-300 text-green-900 border border-green-900 p-1 my-2'>
                                        {props.successMessage}
                                    </div>
                                )}
                                <form onSubmit={onLogin}>
                                    <div className="form-group">
                                        <label className="mb-2 ">
                                          <strong>Email</strong>
                                        </label>
                                        <input type="email" className="form-control"
                                          value={name}
                                           onChange={(e) => setName(e.target.value)}
                                        />
                                      {errors.name && <div className="text-danger fs-12">{errors.name}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label className="mb-2 "><strong>Password</strong></label>
                                        <input
                                          type="password"
                                          className="form-control"
                                          value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                        {errors.password && <div className="text-danger fs-12">{errors.password}</div>}
                                    </div>
                                    <div className="form-row d-flex justify-content-between mt-4 mb-2">
                                      <div className="form-group">
                                        <div className="form-check custom-checkbox ms-1 ">
                                          <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="basic_checkbox_1"
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="basic_checkbox_1"
                                          >
                                            Remember my preference
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-center">
                                      <button
                                        type="submit"
                                        className="btn btn-primary btn-block"
                                      >
                                        Sign In
                                      </button>
                                    </div>
                                </form>
                                <div className="new-account mt-2">
                                  <p className="">
                                    Don't have an account?{" "}
                                    <Link className="text-primary" to="/page-register">
                                      Sign up
                                    </Link>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
            
    )
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage,
        successMessage: state.auth.successMessage,
        showLoading: state.auth.showLoading,
    };
};
export default Login;