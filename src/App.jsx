import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import UserProblem from "./pages/UserProblem";
import { ForgotPassword } from "./pages/ForgotPassword";
import UserHomePage from "./pages/UserHomePage";
import UserProfile from "./pages/UserProfile";
import EditProfile from "./pages/EditProfile";


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<Home />} /> 
        <Route index element={<Login />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/UserHomePage" element={<UserHomePage />} /> 
        <Route path="/UserProblem" element={<UserProblem />} /> 
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/EditProfile" element={<EditProfile/>}/>
        <Route path="/signup" element={<SignUp />} /> 
      </Routes>
    </BrowserRouter>
  );

}

export default App;
