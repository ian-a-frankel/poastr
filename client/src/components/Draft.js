import {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Poast from './Poast'

function Draft({currentUser}) {

  const [text, setText] = useState('');
  const params = useParams()
  const par_id = Number(params.parent_id)
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(params)

    if (currentUser && text) {
        let bod = {
            text: text,
            user_id: currentUser.id
        }
        if (par_id > 0) {
            bod = {...bod, 'parent_id': par_id }
        }
        console.log(bod)
        fetch('http://localhost:5555/api/poasts', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bod)
        })
        .then(res => res.json())
        .then(data => {
            let head = ""
            let i = 0
            while (data.ancestry[i] && data.ancestry[i] !== "_") {
                head = head + data.ancestry[i]
                i++
            }
            console.log(head)
            navigate(`/threads/${head}`)
        })
    }

    // Submit the text content here (e.g., send to API, store locally, etc.)
    console.log('Submitted text:', text);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        style={{ width: '80%', height: '40%' }}
      />
      <button type="submit">Submit</button>
    </form>
  )
    
}

export default Draft