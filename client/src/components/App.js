import React, { useEffect, useState } from "react";
import {createBrowserRouter, RouterProvider, Switch, Route, useParams, useNavigate} from "react-router-dom"
import Thread from "./Thread";
import Login from "./Login";
import Logout from "./Logout";
import Signup from "./Signup";
import Profile from "./Profile";
import Feed from "./Feed";
import Draft from "./Draft";

function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const params = useParams()
  const [haveUser, setHaveUser] = useState(null)
  const [base, setBase] = useState(null)

  const POST_HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }

  useEffect(() => {
    fetch('/api/check_session')
    .then(res => {
      if (res.ok) {
        res.json()
        .then(userData => {
          setCurrentUser(userData)          
        })
      }
    })
  }, [])

  // SIGNUP //
  async function attemptSignup(userInfo) {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: POST_HEADERS,
      body: JSON.stringify(userInfo)
    })
    if (res.ok) {
      const data = await res.json()
      setCurrentUser(data)
    } else {
      alert('Invalid sign up')
    }
  }

  // LOGIN //
  async function attemptLogin(userInfo) {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: POST_HEADERS,
      body: JSON.stringify(userInfo)
    })
    if (res.ok) {
      const data = await res.json()
      setCurrentUser(data)
    } else {
      alert('Invalid sign in')
    }
  }

  // LOGOUT //
  function logout() {
    setCurrentUser(null)
    fetch('/api/logout', { method: "DELETE" })
  }

  const routes = [
    {
      path: "/login",
      element: <Login attemptLogin={attemptLogin}/>
    },
    {
      path: "/",
      element: <Login attemptLogin={attemptLogin}/>
    },
    {
      path: "/logout",
      element: <Logout logout={logout} currentUser={currentUser}/>
    },
    {
      path: "/signup",
      element: <Signup attemptSignup={attemptSignup} currentUser={currentUser} />
    },
    {
      path: `/profiles/:handle`,
      element: <Profile currentUser={currentUser}/>
    },
    {
      path: `/threads/:root_id`,
      element: <Thread currentUser={currentUser} base={base} setBase={setBase}/>
    },
    {
      path: `/feeds`,
      element: <Feed currentUser={currentUser}/>
    },
    {
      path: '/compose/:parent_id',
      element: <Draft currentUser={currentUser} base={base} setBase={setBase}/>
    }

  ]

  const router = createBrowserRouter(routes)

  return(<>
  <h1>Welcome to Poastr, the free Poasting App</h1>
  <RouterProvider router={router}/>
  </>);
}

export default App;