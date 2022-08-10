import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { login } from "../../modules/axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import ToastComponent from "../../components/ToastComponent";
import eye from "../../assets/img/eye.png";
import eyeslash from "../../assets/img/eye-slash.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPasswod] = useState("");
  const [load, setLoad] = useState(false);
  const [msg, setMsg] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      setLoad(true);
      const body = {
        email,
        password,
      };
      const result = await login(body);
      setMsg(result.data.msg);
      localStorage.setItem("token", result.data.token);
      setLoad(false);
      setShowToast(!showToast);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);
      setMsg(error.response.data.msg);
      setLoad(false);
      setShowToast(!showToast);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      {load ? <Loading /> : ""}
      <Layout
        children={
          <>
            <ToastComponent
              showToast={showToast}
              setShowToast={setShowToast}
              message={msg}
            />
            <div className="container-register">
              <div className="form">
                <h4>Login</h4>
                <label htmlFor="">
                  <input
                    type="text"
                    placeholder="Input your email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </label>
                <label htmlFor="">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Input your password"
                    onChange={(e) => {
                      setPasswod(e.target.value);
                    }}
                  />
                  <img
                    onClick={() => {
                      setShowPass(!showPass);
                    }}
                    src={showPass ? eye : eyeslash}
                    alt="showpass"
                    className="showpass"
                  />
                </label>
                <div className="button" onClick={loginUser}>
                  Login
                </div>
              </div>
            </div>
          </>
        }
      />
    </>
  );
};

export default Login;
