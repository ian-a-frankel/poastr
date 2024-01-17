import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";

function NavBar({currentUser, navigate}) {
    function HomeButton() { return <button onClick={() => {navigate(`/profiles/${currentUser.handle}`); window.location.reload(false)}}>My Profile</button>}
    function LogoutButton() {return <button onClick={() => {navigate(`/logout`)}}>Logout Page</button>}
    function DraftButton() {return <button onClick={() => {navigate(`/compose/0`)}}>New Thread</button>}
    function LoginButton() {return <button onClick={() => {navigate(`/login`)}}>Login</button>}

    return (<p>{currentUser ? [<HomeButton/>, <LogoutButton/>, <DraftButton/>] : [<LoginButton/>]}</p>)
}

export default NavBar