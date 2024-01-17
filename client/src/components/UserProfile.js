import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import UpdateForm from "./UpdateForm";

function UserProfile({updating, navigate, userData, currentUser, setUpdating, setBio, setNickname, handleSubmit}) {
    
    const followerHandles = userData.followers ? userData.followers.map(u => u.handle) : []
    const amFollower = currentUser && userData.followers && followerHandles.includes(currentUser.handle)
    const deleting = amFollower ? 'yes' : 'no'
    const deleteButtonText = amFollower ? 'Unfollow' : 'Follow'
    
    function FollowButton() {
      if (!currentUser || currentUser.handle === userData.handle) {
        return <></>
      }
      return <button onClick={handleClick}>{deleteButtonText}</button>
    }

    function handleClick() {
      fetch(`http://localhost:5555/api/follows`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          reader_handle: currentUser.handle,
          writer_handle: userData.handle,
          deleting: deleting
        })
      })
      .then(res => {window.location.reload(false)})
    }

    const followTable = <table className="my-table">
      <tbody>
        <tr>
          <td><p>Followers:</p></td>
          <td><p>Following:</p></td>
        </tr>
        <tr>
          <td>{userData.followers ? <div className='demithread'> {userData.followers.map(item => <p>{item.nickname} (<NavLink onClick={() => {navigate(`/profiles/${item.handle}`); window.location.reload(false)}} key={item.handle}>@{item.handle}</NavLink>)</p>)}</div> : <></>}</td>
          <td>{userData.following ? <div className='demithread'> {userData.following.map(item => <p>{item.nickname} (<NavLink onClick={() => {navigate(`/profiles/${item.handle}`); window.location.reload(false)}} key={item.handle + item.nickname}>@{item.handle}</NavLink>)</p>)}</div> : <></>}</td>
        </tr>
      </tbody>
    </table>
    
    return (<div className="bio">
    <a onClick={() => {console.log(currentUser)}}>{userData.nickname} (@{userData.handle}) <FollowButton/></a>
    <p>bio: {userData.bio} </p>
    {currentUser && currentUser.handle === userData.handle && updating ? <UpdateForm handleSubmit={handleSubmit} setBio={setBio} setNickname={setNickname}/> : <></>}
    {currentUser && currentUser.handle === userData.handle && !updating ? <button onClick={() => {setUpdating(true)}}>Edit Profile</button> : <></>}
    {updating ? UpdateForm : <></>}
    {followTable}
    </div>)
  }

  export default UserProfile