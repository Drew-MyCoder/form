
import './App.css'
import { Register } from './Register'
import Login from './Login'
import Layout from './components/Layout'
import { Route, Routes } from 'react-router-dom'
import Editor from './components/Editor'
import Admin from './components/Admin'
import Lounge from './components/Lounge'
import Missing from './components/Missing'
import Home from './components/Home'
import Unauthorized from './components/Unauthorized'
import LinkPage from './components/LinkPage'
import RequireAuth from './components/RequiredAuth'

function App() {


  return (
    <>
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* Public roytes */}
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='linkpage' element={<LinkPage />} />
        <Route path='unauthorized' element={<Unauthorized />} />

        {/* we want to protect these routes, allowed roles not implemented */}
        <Route element={<RequireAuth allowedRoles={[2001]}/>} >
        <Route path='/' element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[1984]}/>} >
        <Route path='editor' element={<Editor />} />
        </Route>

        <Route element={<RequireAuth/>} >
        <Route path='admin' element={<Admin />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[1984, 5150]}/>} >
        <Route path='lounge' element={<Lounge />} />
        </Route>

        {/* catch all */}
        <Route path='*' element={<Missing />} />
      </Route>
    </Routes>
    </>
  );
}

export default App
