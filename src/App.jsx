import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/LoginForm/LoginForm';
import RegisterForm from './Components/RegisterForm/RegisterForm';
import ParticleBackground from './Components/Fondo';
import './App.css';

function App() {
  const audioRef = useRef(null);

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(error => {
          console.log("El navegador bloqueó el autoplay inicialmente:", error);
        });
      }
    };

    // Escucha el clic en la ventana para activar el audio
    window.addEventListener('click', playAudio, { once: true });

    // Limpieza al desmontar el componente
    return () => window.removeEventListener('click', playAudio);
  }, []);

  return (
    <>
      {/* Si moviste el archivo a la carpeta public, usa src="/shine.mp3" */}
      <audio ref={audioRef} id='music' src="./Shine.mp3" controls autoPlay preload='auto' />
      
      <ParticleBackground />
      
      <BrowserRouter basename="/Page-Login">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;