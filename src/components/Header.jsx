import React from 'react'

const Header = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <div className="navbar-brand">Roll Dice</div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <div className="nav-link active" aria-current="page">Home</div>
        </li>
        <li className="nav-item">
          <div className="nav-link active" style={{cursor:'pointer'}}>Login</div>
        </li>
        <li className="nav-item">
          <div className="nav-link active" style={{cursor:'pointer'}}>Register</div>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </>
  )
}

export default Header