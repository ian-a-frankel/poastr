import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";

function UpdateForm({bio, setBio, nickname, setNickname, handleSubmit}) {
      
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="bio">Bio:</label>
        <textarea id="bio" onChange={(e) => setBio(e.target.value)} />
        <br />
        <label 
  htmlFor="nickname">Nickname:</label>      
  <input
  type="text"        
  id="nickname"
  onChange={(e) => {setNickname(e.target.value)}}
        />
        <br />
        <button type="submit">Update Profile</button>
      </form>
    );
  }

  export default UpdateForm