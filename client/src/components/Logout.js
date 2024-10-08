import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

function Logout({logout, currentUser, setCurrentUser}) {

    const navigate = useNavigate();
    const [pressed, setPressed] = useState(false);

    return (
        <>
        <div className="logout-container">
            <div id='logouttext' >
            {pressed ? <h2>Are you sure you want to log out?</h2> : <></>}
            </div>
        </div>

            <button id='logoutbtn' onClick={()=>{
                logout()
                navigate('/')
            }}>Log Out</button>
            <NavBar currentUser={currentUser} navigate={navigate}/>
        <div className="logoutimg">
        </div>
        </>
    );

}

export default Logout