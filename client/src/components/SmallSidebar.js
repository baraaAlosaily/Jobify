import React, { useState } from 'react'
import Wrapper from '../assets/wrappers/SmallSidebar'
import {FaTimes} from 'react-icons/fa'
import Logo from './Logo'
import { useAppContext } from '../context/appContext'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import links from '../utils/links'
import NavLinks from './NavLinks'

const SmallSidebar = () => {
  const {showSideBar,toggleSideBar} =useAppContext();
  return (
      <Wrapper>
        <div className={showSideBar?'sidebar-container show-sidebar':'sidebar-container'}>
         
          <div className='content'>
            <button className='close-btn' onClick={toggleSideBar}>
              <FaTimes/>
            </button>
            <header>
              <Logo/>
            </header>
            <NavLinks toggleSideBar={toggleSideBar}/>
          </div>
        </div>
    </Wrapper>
  )
}

export default SmallSidebar