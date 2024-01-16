import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import UpdateForm from "./UpdateForm";
import UserProfile from "./UserProfile";

function Profile({currentUser}) {

    const [userData, setUserData] = useState({handle: "", nickname: "", bio: ""})
    const [loaded, setLoaded] = useState(false)

    const [bio, setBio] = useState('');
    const [nickname, setNickname] = useState('');
    const [updating, setUpdating] = useState(false)

    const navigate = useNavigate()
    const params = useParams()
    const handle = params.handle
    useEffect(() => {
    fetch(`http://localhost:5555/api/users/${handle}`)
    .then(r => r.json())
    .then(data => {console.log(data); setUserData(data)})
    .then(setLoaded(true))
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();      
        try {
          const response = await fetch(`http://localhost:5555/api/users/${userData.handle}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({ bio: bio, nickname: nickname }),
          });
    
          if (response.ok) {
            // Handle successful update
            console.log('User data updated successfully!');
            setUpdating(false)
            // Clear form fields or redirect as needed
          } else {
            // Handle error
            console.error('Error updating user data:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      function LoadedProfile() {
        return (<div className="bio">
        <a>{userData.nickname} (@{userData.handle})</a>
        <p>bio: {userData.bio}</p>
        {currentUser.handle === params.handle && updating ? <UpdateForm handleSubmit={handleSubmit} setBio={setBio} setNickname={setNickname}/> : <></>}
        {currentUser.handle === params.handle && !updating ? <button onClick={() => {setUpdating(true)}}>Edit Profile</button> : <></>}
        {updating ? UpdateForm : <></>}
        </div>)
      }
        
    return (userData.bio ? <UserProfile
        currentUser={currentUser}
        navigate={navigate}
        userData={userData}
        handleSubmit={handleSubmit}
        updating={updating}
        setBio={setBio}
        setUpdating={setUpdating}
        setNickname={setNickname}/> : <h1>Loading...</h1>)

    

}

export default Profile;