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
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
