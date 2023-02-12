import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Adduser from  './Adduser';
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import UsersPage from './UsersPage'
import Edituser from './EditUser';
import Viewuser from './ViewUser';

function MyRoutes() {
  return (
    <>
        <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/register' element= {<RegisterPage />} />
            <Route path='/users' element= {<UsersPage />} />
            <Route path='/adduser' element= {<Adduser/>} />
            <Route path='/edituser/:id' element= {<Edituser/>} />
            <Route path='/viewuser/:id' element= {<Viewuser/>} />
        </Routes>
    </>
  )
}

export default MyRoutes