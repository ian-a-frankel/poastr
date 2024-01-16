import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function MiniPoast({timestamp, navigate, text, ancestry, setFocusValue}) {

    const ancestor = ancestry.split('_')[0]
    const ancestors = ancestry.split('_')
    const ind = ancestors.length - 1
    
    return <div className="unfocused0">
        <p>{timestamp}<button onClick={() => {console.log(ancestors[ind]); setFocusValue(Number(ancestors[ind])); navigate(`/Threads/${ancestor}`)}}>Go To Poast</button></p>
        <p>{text}</p>
    </div>
}

export default MiniPoast;