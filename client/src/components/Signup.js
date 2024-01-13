import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Signup({currentUser, attemptSignup}) {

    const [userInfo, setUserInfo] = useState({
        nickname: '',
        password: '',
        handle: ''
    });

    const handleChange = (event) => {
        setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        attemptSignup(userInfo);
        navigate('/login');
    }

    const navigate = useNavigate();

    return (
        <>

        <div className="signupOuterContainer">  
                <div className="signupInnerContainer">
                    <h1 className="heading">💬 Sign Up</h1>

                    <h2 className="subHeading">Welcome to Poastr</h2>
            <form onSubmit={(e)=>{
                handleSubmit(e)
                navigate('/login')
            }}>
                <label className="label">Enter your handle</label>
                <input className="joinInput" onChange={handleChange} type="text" name="handle" placeholder="handle" /><br/>
                <label className="label1">Create Password</label>
                <input className="joinInput1" onChange={handleChange} type="text" name="password" placeholder="Password" /><br/>
                <label className="label2">Enter Nickname</label>
                <input className="joinInput2" onChange={handleChange} type="text" name="nickname" placeholder="nickname (this can be changed)" /><br/>
                <button type="submit">Sign Up</button>
            </form>
        
        </div>
        </div>
        </>
    );



}

export default Signup