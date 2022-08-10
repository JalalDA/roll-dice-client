import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import "./register.css";
import { register } from "../../modules/axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import ToastComponent from "../../components/ToastComponent";
import eye from "../../assets/img/eye.png";
import eyeslash from "../../assets/img/eye-slash.png";

const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasswod] = useState("");
  const [load, setLoad] = useState(false);
  const [msg, setMsg] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      setLoad(true);
      const body = {
        username,
        email,
        password,
      };
      const result = await register(body);
      setMsg(result.data.msg);
      setLoad(false);
      setShowToast(!showToast);
      setTimeout(() => {
        navigate("/login");
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
                <h4>Register</h4>
                <label htmlFor="">
                  <input
                    type="text"
                    placeholder="Input your username"
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                  />
                </label>
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
                    src={showPass ? eye : eyeslash}
                    alt="showpass"
                    className="showpass"
                    onClick={() => {
                      setShowPass(!showPass);
                    }}
                  />
                </label>
                <div className="button" onClick={registerUser}>
                  Register
                </div>
              </div>
            </div>{" "}
          </>
        }
      />
    </>
  );
};

export default Register;
