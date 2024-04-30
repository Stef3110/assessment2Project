import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Login from "./components/login";
import SignUp from "./components/signup";
import PropertyList from "./components/buyProperty";
import PropertyDetail from "./components/buyPropertyDetail";
import ConfirmProperty from "./components/confirmProperty";
import DeleteProperty from "./components/deleteProperty";
import RentProperty from "./components/rentProperty";
import RentPropertyDetail from "./components/rentPropertyDetail";
import UserProfile from "./components/userProfile";
import MyInfo from "./components/myInfo";
import SellProperty from "./components/sellProperty";
import MyProperties from "./components/myProperties";
import Home from "./components/home";
import About from "./components/about";

 
function App() {

  

  

  return (
    <div className="app container-fluid">
        

        <BrowserRouter>
        <Navbar />
            <Routes>
              <Route path="/" element={<Navbar />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/buyProperty" element={<PropertyList />} />
              <Route path="/buyProperty/:propertyID" element={<PropertyDetail />} />
              <Route path="/confirmProperty" element={<ConfirmProperty />} />
              <Route path="/deleteProperty" element={<DeleteProperty />} />
              <Route path="/rentProperty" element={<RentProperty />} />
              <Route path="/rentProperty/:propertyID" element={<RentPropertyDetail />} />
              <Route path="/userProfile" element={<UserProfile />} />
              <Route path="/myInfo" element={<MyInfo />} />
              <Route path="/sellProperty" element={<SellProperty />} />
              <Route path="/myProperties" element={<MyProperties />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}
  
export default App;