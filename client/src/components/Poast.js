import React, {useState, useEffect} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';




function Poast({base, setBase, focusValue, setFocus, handles, expandable, hide, showReplies, poast, author, replying_to, depth, currentUser, navigateReply}) {
    function indenter() {
        let indent
        let indentation = ""
        for (let i = 0; i < depth; i++) {
            indentation = indentation + ""
            indent = indentation + "----"
        }
        return [indentation,indent]
    }

    function replies() {
        if (replying_to[0]) {
            breakTextByHandles()
            let replying_to_ = []
            for (let i = 0; i < replying_to.length; i++) {
                if (!replying_to_.includes(replying_to[i])) {
                    replying_to_.push(replying_to[i])
                }
            }

            return <p> {indenter()[0]} replying to {replying_to_.map(item => <NavLink to={`/profiles/${item}`} key={'@'+item+'_'+poast.poast_id} >@{item} </NavLink>)} </p>
        } else {
            return <></>
        }
    }
        
    

    const FocusButton = <button onClick={() => setFocus(poast.poast_id)}>Focus Poast</button>
    const HideButton = <button onClick={() => hide(poast.poast_id)}>Hide</button>
    const ExpandButton = <button onClick={() => showReplies(poast.poast_id)}>Show Replies</button>
    
    function breakTextByHandles() {

        const regex = /\B@[a-zA-Z0-9]+\b/g;
        let matches = poast.text.match(regex);
        if (!matches) {
            matches = []
        }
        const parts = poast.text.split(regex);
        
        const result = [];
        for(let i = 0; i < parts.length; i++) {
            result.push(parts[i]);
            if(i < matches.length) {
            result.push(matches[i]);
            }
        }
        return result;
    }

    function makeLink(str) {
        if (str.length && str.charAt(0) === '@' && handles.includes(str.slice(1))) {
            return <NavLink to={`/profiles/${str.slice(1)}`}>{str}</NavLink>
        } else {
            return <>{str}</>
        }
    }

    const depthClass = Math.min(depth, 5)

    return (<div className={poast.poast_id === focusValue ? "focused" : `unfocused${depthClass}`}>
        
        <p>{indenter()[0]} {author.nickname} (<NavLink to={`/profiles/${author.handle}`}> @{author.handle} </NavLink>) at {poast.timestamp} {FocusButton} {HideButton} {expandable ? ExpandButton : <></>}</p>
        {replying_to[0] ? replies() : <></>}
        <p>{indenter()[1]} {breakTextByHandles().map(s => makeLink(s))} {currentUser ? <button onClick={() => {navigateReply(poast.poast_id)}}>Reply</button> : <></>}</p>
    </div>)

}

export default Poast;