import HomePage from "pages/homePage";
import LoginPage from "pages/loginPage";
import ProfilePage from "pages/profilePage";
import RegisterPage from "pages/registerPage";
import AuthState from "context/AuthState.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
    <AuthState>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/profile/:id" element={<ProfilePage/>}/>
        </Routes>
      </BrowserRouter>
    </AuthState>
  );
}

export default App;
