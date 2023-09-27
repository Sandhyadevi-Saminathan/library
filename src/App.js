import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Login from './profile/Login';
import Home from './Home';
import Portal from './Portal/Portal';
import Userlist from './User/Userlist';
import Viewuser from './User/Viewuser';
import Edituser from './User/Edituser';
import Createuser from './User/Createuser';
import Managebooks from './Librarian/Library/Managebook';
import Viewbook from './Librarian/Library/Viewbook';
import Editbook from './Librarian/Library/Editbook';
import Createbook from './Librarian/Library/Createbook';
import Withdraw from './Librarian/Withdraw/Withdraw';
import Withdrawlist from './Librarian/Withdraw/Withdrawlist';
import Viewwd from './Librarian/Withdraw/Viewwd';
import Editwd from './Librarian/Withdraw/Editwd';

import { Userprovider } from './Usercontext';
import Register from './profile/Register';
import Profile from './profile/Profile';
import Withdrawdetails from './User/Withdrawdetails';
import Forget from './password/Forget';
import Verification from './password/Verification';
import Changepassword from './password/Changepassword';





function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Userprovider>
          <Routes>

            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path='/portal' element={<Portal />}>
              <Route path='profile/:id' element={<Profile />} />
              <Route path='userlist' element={<Userlist />} />
              <Route path='viewuser/:id' element={<Viewuser />} />
              <Route path='edituser/:id' element={<Edituser />} />
              <Route path='createuser' element={<Createuser />} />
              <Route path='withdrawlist' element={<Withdrawlist />} />
              <Route path='createbook' element={<Createbook />} />
              <Route path='managebooks' element={<Managebooks />} />
              <Route path='viewbook/:id' element={< Viewbook />} />
              <Route path='editbook/:id' element={<Editbook />} />
              <Route path='withdraw' element={<Withdraw />} />
              <Route path='viewwd/:id' element={<Viewwd />} />
              <Route path='editwd/:id' element={<Editwd />} />
              <Route path='withdrawlist/:id' element={<Withdrawdetails />} />
              <Route path="/portal/managebooks" element={<Managebooks />} />
            </Route>
            <Route path="/forget" element={<Forget/>} />
            <Route path="/verification/:id" element={<Verification />} />
            <Route path="/Changepassword/:id" element={<Changepassword/>} />
          </Routes>
        </Userprovider>

      </BrowserRouter>
    </div >
  );
}

export default App;
