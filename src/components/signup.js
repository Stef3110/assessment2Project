import { useState } from "react";
import Axios from "axios";
import HomeHiveLogo from './resources/homehive.png';
 
const SignUp = () => {
  
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");
   
  const register = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/register", {
      email: email,
      username: username,
      password: password,
      mobile: mobile,
    }).then((response) => {
      console.log(response);
      if(response.data.message){
        setRegisterStatus(response.data.message);
      }else{
        setRegisterStatus("ACCOUNT CREATED SUCCESSFULLY");
      }
    })
  }
   
  let imgs = [
    'https://as2.ftcdn.net/v2/jpg/03/39/70/91/1000_F_339709132_H9HSSTtTmayePcbARkTSB2qoZTubJ6bR.jpg',
  ];
  return (
<div className="row">
<div className="container" style={{ paddingTop: '100px' }}>
    <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <form>
                    <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                        <h1>Create Your Account</h1>
                    </div>
                    
                    <div className="form-outline mb-4">
                        <label className="form-label">Name and Lastname</label>
                        <input type="text" className="form-control form-control-lg" placeholder="Enter Name and Lastname" onChange={(e) => { setUsername(e.target.value) }} required />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label">Email Address</label>
                        <input type="email" className="form-control form-control-lg" onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter your Email Address" required />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label">Mobile</label>
                        <input type="mobile" className="form-control form-control-lg" onChange={(e) => { setMobile(e.target.value) }} placeholder="Enter your phone number" required />
                    </div>
                    <div className="form-outline mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control form-control-lg" onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter your Password" required />
                    </div>
                    <p>
                        <h1 style={{ fontSize: '15px', textAlign: 'center', marginTop: '20px' }}>{registerStatus}</h1>
                    </p>
                    <div className="text-center text-lg-start mt-4 pt-2">
                        <button type="button" className="btn btn-primary btn-lg" onClick={register}>Sign Up</button>
                        <p className="small fw-bold mt-2 pt-1 mb-0">Login to your account <a href="login" className="link-danger">Login</a></p>
                    </div>
                    
                </form>
            </div>
            <div className="col-md-9 col-lg-6 col-xl-5">
                <img src={HomeHiveLogo} className="img-fluid" />
            </div>
        </div>
    </div>
</div>
</div>
  );
};
  
export default SignUp;