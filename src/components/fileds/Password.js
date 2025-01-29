import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]{6,}$/;
    return regex.test(password);
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(e);
    setIsValid(validatePassword(newValue));
  };

  return (
    <div className="position-relative">
      <input
        type={showPassword ? "text" : "password"}
        className='form-control'
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
      />
      <FontAwesomeIcon
        icon={showPassword ? faEye : faEyeSlash}
        className="position-absolute top-50 end-0 translate-middle-y me-3"
        onClick={() => setShowPassword(!showPassword)}
        style={{ cursor: "pointer" }}
      />
      {!isValid && (
        <div className="invalid-feedback text-start">
          Password must contain letter, number, and special character.
        </div>
      )}
    </div>
  );
};

export default PasswordInput;