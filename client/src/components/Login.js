import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";

function Login({attemptLogin, currentUser}) {
    
    const [pressed, setPressed]=useState(false)
    const [userInfo, setUserInfo]=useState({
        handle:'',
        password: ''
    })

    function handleChange(event) {
        setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
        setPressed(false)
    }

    function handleSubmit(e) {
        attemptLogin(userInfo)
        setPressed(true)
    }

    function handleclick(){
        navigate(`/profiles/${userInfo.handle}`)
    }


    const navigate = useNavigate()
    return(
        <>
        <div className="login-form">
        {pressed && !currentUser ? (
                <>
                <h1>Ha! Thought you logged in? You need to click another button!</h1>
                <button id='yesbtn' onClick={handleclick}>Okay, fine</button>
                </>
            ) : (
                <>
                    <h2>Log In</h2>
                    <p>Enter your username and password to log in.</p>
                    <form onSubmit={(e)=>{
                        e.preventDefault();
                        handleSubmit(e)
                        setPressed(true)
                    }}>

                        <label className="UsernameLabel">Handle</label>
                        <input className="UsernameSignUp" onChange={handleChange} type="text" name="handle" placeholder="enter your handle" /><br/>
                        <label className="UsernameLabel">Password</label>
                        <input className="UsernameSignUp" onChange={handleChange} type="text" name="password" placeholder="enter your password" /><br/>

                        <button className="login-button" type="submit">Log in</button>
                    </form>
                    <div className="signup-link">
                    <NavLink  to="/signup">Click here if you do not have an account</NavLink>
                    </div>
                </>
            )}

        </div>
        </>
    )

}

export default Login