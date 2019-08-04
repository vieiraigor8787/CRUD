import './App.css'
import React from 'react'

import Main from '../components/templates/Main'
import Nav from '../components/templates/Nav'
import Logo from '../components/templates/Logo'
import Footer from '../components/templates/Footer'

export default props =>
    <div className="app">
        <Logo />
        <Nav />
        <Main />
        <Footer />
    </div>