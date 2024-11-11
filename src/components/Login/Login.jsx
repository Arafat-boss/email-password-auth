import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import auth from "../../firebase.init";
import { Link } from "react-router-dom";

const Login = () => {
    const [success, setSuccess] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const emailRef = useRef()

    const handelForgetPassword =()=>{
        const email = emailRef.current.value
            if(!email){
                console.log('Please provide a valid email address')
            }
            else{
                sendPasswordResetEmail(auth, email)
                .then(()=>{
                    alert('Reset Email..Please Check Your Mail')
                })
            }
    }


    const handelLogin = (e)=>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);


        // reset-----------------
        setSuccess(false)
        setErrorMsg('')

        //firebase auth
        signInWithEmailAndPassword(auth, email, password)
        .then(res=>{
            console.log(res.user);
//verification condition
            if(!res.user.emailVerified){
                setErrorMsg('Please verify your email address')
            }
            else{
                setSuccess(true)
            }
            // --------------------------
           
        })
        .catch(error=>{
            console.log("Error", error);
            setErrorMsg(error.message)
        })
    }

  return (
    <div className="card bg-base-100 w-full max-w-sm mx-auto shrink-0 shadow-2xl">
      <form onSubmit={handelLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            ref={emailRef}
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
          <label onClick={handelForgetPassword} className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
          <p>New  to this website please <Link className="text-blue-700 underline" to="/register">Register Now</Link></p>
        </div>
        {
            success && <p className="text-green-500">User Login success</p>
        }
        {
            errorMsg && <p className="text-red-500">{errorMsg}</p>
        }
      </form>
    </div>
  );
};

export default Login;
