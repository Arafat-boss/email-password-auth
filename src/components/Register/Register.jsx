import React, { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import auth from "../../firebase.init";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  const [errorMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  //password toggle step--1
  const [showPassword, setShowPassword] = useState(false);

  const handelRegister = (e) => {
    e.preventDefault();
    // console.log('all ok', e.target.email.value);
    const email = e.target.email.value;
    const password = e.target.password.value;
    const checkbox = e.target.terms.checked;
    console.log(email, password,checkbox);

    //reset error and status
    setErrMsg("");
    setSuccess(false);

    if(!checkbox){
      setErrMsg('please accept Our terms and Conditions')
      return
    }

    if (password.length < 6) {
      setErrMsg("Password should be 6 characters or longer");
      return;
    }

    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(password)) {
      setErrMsg("plz Use One A-Z, 0-9, a-z, @#$%^&*");
      return;
    }
    //fireBase------------
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user);
        setSuccess(true);

        //send verification email
        sendEmailVerification(auth.currentUser)
        .then(()=>{
          console.log('verifation is Done');
        })
      })
      .catch((error) => {
        console.log("ERROR", error);
        setErrMsg(error.message);
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm mx-auto shrink-0 shadow-2xl">
      <form onSubmit={handelRegister} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
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
            //password toggle step--2
            type={showPassword ? "text" : "password"}
            //-----------------------------
            name="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
          <button
            //password toggle step--3
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-12 top-44"
          >
            {showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
            {/* --------------------------- */}
          </button>
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        {/* -----checkBox---- */}
        <div className="form-control">
          <label className="label justify-start cursor-pointer">
            <input
              type="checkbox"
              name="terms"
              defaultChecked
              className="checkbox checkbox-primary"
            />
            <span className="label-text ml-3">Remember me</span>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
          <p>Already have a account <Link className="text-blue-700 underline" to="/login">Log in</Link></p>
        </div>
        {errorMsg && <p className="text-red-400 underline">{errorMsg}</p>}
        {success && (
          <p className="text-green-500 underline">Successfully Register</p>
        )}
      </form>
    </div>
  );
};

export default Register;
