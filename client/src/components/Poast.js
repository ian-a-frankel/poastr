import React, {useState, useEffect} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Poast({base, setBase, setFocus, hide, showReplies, poast, author, replying_to, depth, currentUser, navigateReply}) {

    function indenter() {
        let indent
        let indentation = ""
        for (let i = 0; i < depth; i++) {
            indentation = indentation + "................"
            indent = indentation + "----"
        }
        return [indentation,indent]
    }

    function replies() {
        if (replying_to[0]) {
            let replying_to_ = []
            for (let i = 0; i < replying_to.length; i++) {
                if (!replying_to_.includes(replying_to[i])) {
                    replying_to_.push(replying_to[i])
                }
            }

            return <p> {indenter()[0]} replying to {replying_to_.map(item => <NavLink to={`/profiles/${item}`} key={'@'+item+'_'+poast.poast_id} >@{item} </NavLink>)} </p>
        } else {return <></>}
        
    }

    const FocusButton = <button onClick={() => setFocus(poast.poast_id)}>Focus Poast</button>
    const HideButton = <button onClick={() => hide(poast.poast_id)}>Hide</button>
    const ExpandButton = <button onClick={() => showReplies(poast.poast_id)}>Show Replies</button>
    
    return (<div>
        
        <p>{indenter()[0]} {author.nickname} (<NavLink to={`/profiles/${author.handle}`}> @{author.handle} </NavLink>) at {poast.timestamp} {FocusButton} {HideButton} {ExpandButton}</p>
        {replying_to[0] ? replies() : <></>}
        <p> {indenter()[1]} {poast.text} {currentUser ? <button onClick={() => {navigateReply(poast.poast_id)}}>Reply</button> : <></>}</p>
    </div>)

}

export default Poast;