import React from 'react'
import Header from '../Header'
import './layout.css'

const Layout = ({children}) => {
  return (
    <section>
        <Header/>
    <div className="color"></div>
    <div className="color"></div>
    <div className="color"></div>
    <div className="color"></div>
    <div className="color"></div>
    {children}
    </section>
  )
}

export default Layout