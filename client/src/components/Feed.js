import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MiniPoast from "./MiniPoast";

function Feed({handle, setFocusValue, navigate}) {
    const [poasts,setPoasts] = useState([])

    useEffect(() => {
        if (handle) {
            fetch(`http://localhost:5555/api/poasts_by_user/${handle}`)
            .then(response => response.json())
            .then(data => {console.log(data.poasts);
                setPoasts(data.poasts)})
        }
    },[handle])

    return <div className="thread">{poasts.map(p => <MiniPoast ancestry={p.ancestry} navigate={navigate} handle={p.handle} text={p.text} timestamp={p.timestamp} setFocusValue={setFocusValue}/>)}</div>

}

export default Feed