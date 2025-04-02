import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home"
import Login from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import UserProblem from "./pages/UserProblem";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserProblem />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
