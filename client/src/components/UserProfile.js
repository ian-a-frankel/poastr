import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import UpdateForm from "./UpdateForm";

function UserProfile({updating, navigate, userData, currentUser, setUpdating, setBio, setNickname, handleSubmit}) {
    
    const followTable = <table className="my-table">
      <tbody>
        <tr>
          <td><p>Followers:</p></td>
          <td><p>Following:</p></td>
        </tr>
        <tr>
          <td>{userData.followers ? userData.followers.map((item) => <p>{item.nickname} (<NavLink onClick={() => {navigate(`/profiles/${item.handle}`); window.location.reload(false)}} key={item.handle}>@{item.handle}</NavLink>)</p>) : <></>}</td>
          <td>{userData.following ? userData.following.map((item) => <p>{item.nickname} (<NavLink onClick={() => {navigate(`/profiles/${item.handle}`); window.location.reload(false)}} key={item.handle + item.nickname}>@{item.handle}</NavLink>)</p>) : <></>}</td>
        </tr>
      </tbody>
    </table>
    
    return (<div className="bio">
    <a onClick={() => {console.log(currentUser)}}>{userData.nickname} (@{userData.handle})</a>
    <p>bio: {userData.bio}</p>
    {currentUser && currentUser.handle === userData.handle && updating ? <UpdateForm handleSubmit={handleSubmit} setBio={setBio} setNickname={setNickname}/> : <></>}
    {currentUser && currentUser.handle === userData.handle && !updating ? <button onClick={() => {setUpdating(true)}}>Edit Profile</button> : <></>}
    {updating ? UpdateForm : <></>}
    {followTable}
    </div>)
  }

  export default UserProfile