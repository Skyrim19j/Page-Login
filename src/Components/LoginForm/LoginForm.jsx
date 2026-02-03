import './LoginForm.css'
import { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

const LoginForm = () => {

    // 2. CREAR ESTADOS
    // Uno para guardar el texto de la contraseña
    const [password, setPassword] = useState(""); 
    // Otro para saber si mostramos la contraseña o no
    const [showPassword, setShowPassword] = useState(false);

    // Función para alternar el ojo
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="wrapper">

            <form action="">
                
                <h1>Login</h1>
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

                <div className="remember-forgot">
                    <label><input type="checkbox" />Remember me</label>
                    <a href="#">Forgot Password?</a>
                </div>

                <button type="submit">Login</button>

                <div className="register-link">
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                </div>

            </form>

        </div>
        )
    }

export default LoginForm