import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Poast from "./Poast"

function Thread({currentUser, base, setBase}) {
    const [data, setData] = useState({poasts: [], users: []})
    const [loaded, setLoaded] = useState(false)
    const [poast_dict, setPoast_dict] = useState({})
    const [handles, setHandles] = useState([])
    const [focusValue, setFocusValue] = useState(0)

    const params = useParams()
    const root_id = Number(params.root_id)
    const navigate = useNavigate()
    const [shown, setShown] = useState([])

    function children_ids(pid) {
        const poast_ = data.poasts.find(poast => poast.poast_id === pid)
        if (poast_.children === "") {
            return []
        } else {
            const kidnums = []
            const kidstrngs = poast_.children.split('_')
            for (let kid of kidstrngs) {
                kidnums.push(Number(kid))
            }
            return kidnums
        }
        
    }

    function anc_ids(pid) {
        const poast_ = data.poasts.find(poast => poast.poast_id === pid)
        if (poast_.ancestry === "") {
            return []
        } else {
            const ancnums = []
            const ancstrngs = poast_.ancestry.split('_')
            for (let anc of ancstrngs) {
                ancnums.push(Number(anc))
            }
            return ancnums
        }   
    }

    function setFocus(pid) {
        setShown(anc_ids(pid).concat(children_ids(pid)))
        setFocusValue(pid, true, true)
    }

    function showReplies(pid) {
        const new_reps = []
        for (let child_id of children_ids(pid)) {
            if (!shown.includes(child_id)) {
                new_reps.push(child_id)
            }
        }
        setShown(shown.concat(new_reps))
    }

    function downstream(pid) {
        if (children_ids(pid) == []) {
            return [pid]
        }
        let desc = []
        for (let child_id of children_ids(pid)) {
            desc = desc.concat(downstream(child_id))
        }
        desc.push(pid)
        return desc
    }

    function hide(pid) {
        let new_ids = []
        for (let shown_id of shown) {
            if (!downstream(pid).includes(shown_id)) {
                new_ids.push(shown_id)
            }
        }
        setShown(new_ids)
    }

    function expandable(pid) {
        let result = false
        for (let child_id of children_ids(pid)) {

            if (!shown.includes(child_id)) {
                result = true
            }
        }
        return result
    }

    function navigateReply(pid) {
        navigate(`/compose/${pid}`)
    }

    function replying_to(ancestry) {
        
        let ancestors = []

        if (loaded) {
            if (ancestry === "") {
                return []
            }
            let anc_ids = ancestry.split('_')
            
            let anc_user_ids = []
            for (let i = 0; i < anc_ids.length - 1; i++) {
                anc_user_ids[i] = '_' + poast_dict[`${anc_ids[i]}`]['user_id']
            }

            
            for (let id of anc_user_ids) {
                
                if (!ancestors.includes(`@${data.users[`${id}`]['handle']}`)) {

                    ancestors.push(data.users[`${id}`]['handle'])
                }
            }
            
        }
        return ancestors;
    }

    function depth_from_ancestry(ancestry) {
        let depth = 0
        for (let i = 0; i < ancestry.length; i++) {
            if (ancestry[i] === '_') {
                depth++;
            }
        }
        return depth
    }

    useEffect(() => {
        fetch(`http://localhost:5555/api/threads/${root_id}`)
        .then(response => response.json())
        .then(res => { 
            setData(res)
            let dictionary = {}
            let allPoastIds = []
            for (let item of res.poasts) {
                allPoastIds.push(item.poast_id)
                dictionary[`${item.poast_id}`] = item
            }
            setPoast_dict(dictionary)
            setShown(allPoastIds)
            let handles_ = []
            for (let val of Object.values(res.users)) {    
                handles_.push(`${val.handle}`)
            }
            setHandles(handles_)
        })
        .then(
            setLoaded(true)
        )

    }, [root_id]);

    const shownPoasts = data.poasts.filter(poast => shown.includes(poast.poast_id))
    
        return(<div className="thread">
            {shownPoasts.map((item) => {
            return <Poast key={item.poast_id}
            handles={handles} 
            replying_to={replying_to(item.ancestry)}
            navigateReply={navigateReply} 
            poast={item} 
            author={data.users[`_${item.user_id}`]} 
            currentUser={currentUser} 
            depth={depth_from_ancestry(item.ancestry)} 
            hide={hide} 
            showReplies={showReplies} 
            expandable={expandable(item.poast_id)} 
            focusValue={focusValue}
            setFocus={setFocus}/>})}
        </div>)
    
}

export default Thread;