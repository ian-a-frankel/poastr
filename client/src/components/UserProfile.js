import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import UpdateForm from "./UpdateForm";

function UserProfile({updating, userData, currentUser, setUpdating, setBio, setNickname, handleSubmit}) {
    return (<div className="bio">
    <a onClick={() => {console.log(currentUser)}}>{userData.nickname} (@{userData.handle})</a>
    <p>bio: {userData.bio}</p>
    {currentUser && currentUser.handle === userData.handle && updating ? <UpdateForm handleSubmit={handleSubmit} setBio={setBio} setNickname={setNickname}/> : <></>}
    {currentUser && currentUser.handle === userData.handle && !updating ? <button onClick={() => {setUpdating(true)}}>Edit Profile</button> : <></>}
    {updating ? UpdateForm : <></>}
    </div>)
  }

  export default UserProfile