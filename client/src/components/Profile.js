import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";

function Profile({currentUser}) {

    const [userData, setUserData] = useState({})

    console.log('anything')

    const navigate = useNavigate()
    const params = useParams()
    const handle = params.handle
    useEffect(() => {
    fetch(`http://localhost:5555/api/users/${handle}`)
    .then(r => r.json())
    .then(data => {setUserData(data)})
    },[])

    return (<div>
        <a>{userData.nickname} (@{userData.handle})</a>
        <p>bio: {userData.bio}</p>
    
    </div>
    )
}

export default Profile;