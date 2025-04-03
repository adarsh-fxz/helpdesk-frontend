import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home"
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
