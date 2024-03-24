import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.scss";
import Logo from "../../assets/Logo/vocabverse-logo.png";
import SignupValidation from "../SignupValidation/SignupValidation";

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  const handleInput = (e) => {
    const { id, value } = e.target;
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = SignupValidation(values);
    setErrors(validationErrors);
    
    const hasNoErrors = Object.values(validationErrors).every((val) => val === "");
    
    if (hasNoErrors) {
      try {
        await axios.post("http://localhost:3001/signup", values);
        navigate("/");
      } catch (err) {
        console.error(err);
        alert("Error signing up, there may be another user with the same credentials");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="bg-white p-3 rounded" style={{ width: '25%' }}>
        <div className="logosignup"><img src={Logo} alt="" /></div>
        <form onSubmit={handleSubmit}>
          {Object.entries(values).map(([key, value]) => (
            <div key={key} className="mb-3">
              <label htmlFor={key}>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}</strong>
              </label>
              <input
                onChange={handleInput}
                className="form-control"
                type={key === 'password' ? 'password' : 'text'}
                placeholder={`Enter ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                id={key}
                name={key}
                required
              />
              {errors[key] && <p className="text-danger">{errors[key]}</p>}
            </div>
          ))}
          <button type="submit" className="btn btn-success w-100">Sign up</button>
          <p className="mt-3">Already have an account?</p>
          <Link to="/" className="btn btn-default border w-100 mt-2 text-decoration-none">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;

