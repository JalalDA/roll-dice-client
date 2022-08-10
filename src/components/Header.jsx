import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../modules/axios";
import Loading from "./loading/Loading";
import ToastComponent from "./ToastComponent";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [msg, setMsg] = useState("");
  const [load, setLoad] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const logoutServer = async () => {
    try {
      setLoad(true);
      const result = await logout(token);
      localStorage.removeItem("token");
      setMsg(result.data.msg);
      setLoad(false);
      setShowToast(true);
      setShowModal(false);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.log(error);
      setMsg(error.response.data.msg);
      setLoad(false);
      setShowToast(true);
      setShowModal(false);
    }
  };
  return (
    <>
      {load ? <Loading /> : ""}
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
      >
        <ModalHeader>
          <ModalTitle>Logout</ModalTitle>
        </ModalHeader>
        <ModalBody>Do you want to logout?</ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={logoutServer}>
            YES
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setShowModal(false);
            }}
          >
            NO
          </Button>
        </ModalFooter>
      </Modal>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <div className="navbar-brand">Roll Dice</div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <div
                  className="nav-link active"
                  aria-current="page"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Home
                </div>
              </li>
              {token ? (
                <>
                  <li className="nav-item">
                    <div
                      className="nav-link active"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setShowModal(!showModal);
                      }}
                    >
                      Logout
                    </div>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <div
                      className="nav-link active"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      Login
                    </div>
                  </li>
                  <li className="nav-item">
                    <div
                      className="nav-link active"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigate("/register");
                      }}
                    >
                      Register
                    </div>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <ToastComponent
        showToast={showToast}
        setShowToast={setShowToast}
        message={msg}
      />
    </>
  );
};

export default Header;
