import axios from 'axios';
import { useRef, useState, useEffect } from 'react';
import useAuth from './hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';


const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    // const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        const url = `http://localhost:1337/api/auth/local`;
        // console.log(user, pwd)
        try {
            const response = await axios.post(url, {
                identifier: user,
                password: pwd, 
            });
            console.log(response?.data);
            console.log(response);
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken})
            setUser('');
            setPwd('');
            // setSuccess(true);
            navigate(from, { replace: true })
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password')
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
        
    }

  return (
    <>
    {/* {
        success ? (
            <section>
                <h1>You are logged in!</h1><br />
                <p>
                    <a href="#">Go to Home</a>
                </p>
            </section>
        ) : ( */}
    
    <section>
        <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreeen'} aria-live='assertive'>{errMsg}</p>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input type="text" id='username'
            ref={userRef} autoComplete='off'
            onChange={(e) => setUser(e.target.value)}
            value={user} required />

            <label htmlFor="pasword">Password:</label>
            <input type="password" id='password'     
            onChange={(e) => setPwd(e.target.value)}
            value={pwd} required />

            <button>Sign In</button>
        </form>
        <p>
            Need an Account?<br />
            <span className='line'>
                {/* input router link here */}
                <a href="#">Sign Up</a>
            </span>
        </p>
    </section>
            {/* )
        } */}
    </>
  )
}

export default Login