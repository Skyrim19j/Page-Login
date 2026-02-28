import './RegisterForm.css'
import { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

    
const RegisterForm = () => {

    const [password, setPassword] = useState(""); 
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
    return (
        <div className="wrapper">

            <form action="">
                
                <h1>Register</h1>
                <div className="input-box">
                    <input type="text" placeholder="Username" required/>
                    <FaUser className='icon'/>
                </div>
               

               
                <div className="input-box">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder='Password' 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    
                    {password.length > 0 && (
                        <span onClick={togglePasswordVisibility} className="icon">
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    )}
                    
                    {password.length === 0 && <FaLock className='icon' />}
                </div>



                <div className="input-box">
                    <input 
                        type={showPassword ? "text" : "password"} placeholder='Confirm password' required value={password} 
                        onChange={(e) => setPassword(e.target.value)} />
                    
                    {password.length > 0 && (
                        <span onClick={togglePasswordVisibility} className="icon">
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    )}
                    
                    {password.length === 0 && <FaLock className='icon' />}
                </div>        


                <button type="submit">Register</button>

                <div className="register-link">
                    <p>Already have an account? <Link to="/">Login</Link></p>
                </div>


            </form>

        </div>
    )
}

export default RegisterForm