import { Navigate, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import HomePage from "./components/HomePage";
import { useState } from "react";
import Songs from "./components/Songs";

function App() {
  const [login, setLogin] = useState(false);
  const [token, setToken] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [buttonPath, setButtonPath] = useState('');

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Str buttonText={buttonText} buttonPath={buttonPath}/>,
      children: [
        {
          path: '/',
          element: <HomePage setButtonText={setButtonText} setButtonPath={setButtonPath} />
        },
        {
          path: '/song/:id',
          element: login ? <Songs token={token}/> : <Navigate replace to="/signin"/>
        },
        {
          path: '/signin',
          element: <SignIn setButtonText={setButtonText} setButtonPath={setButtonPath} setLogin={setLogin} setToken={setToken}/>
        },
        {
          path: '/signup',
          element: <SignUp setButtonText={setButtonText} setButtonPath={setButtonPath} setLogin={setLogin} setToken={setToken}/>
        }
      ]
    }
  ])
  function Str({buttonText, buttonPath}) {
    return (
      <>
        <header className="fixed w-full"><Navbar buttonText={buttonText} buttonPath={buttonPath}/></header>
        <main><Outlet/></main>
      </>
    )
  }

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;