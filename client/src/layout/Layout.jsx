import React from 'react'
import { AuthState } from "../context/auth";
import { UserState } from "../context/user";
import { AlertState } from "../context/alert";
import Navbar from '../components/common/Navbar';
import Alert from '../components/Alert';
import Routing from '../routing/Routing';
import Footer from '../components/common/Footer';


const Layout = () => {
  return (
    <div>
      <AlertState>
        <AuthState>
          <UserState>
            <Navbar />
            <Alert />
            <Routing />
            <Footer />
          </UserState>
        </AuthState>
      </AlertState>
    </div>
  )
}

export default Layout