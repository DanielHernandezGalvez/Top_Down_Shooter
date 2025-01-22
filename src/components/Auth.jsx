import React, { useState, useEffect } from 'react';
import { auth, provider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Monitorear el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in with email: ", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center p-5 bg-white rounded shadow-lg">
        <h1 className="text-2xl mb-4">Iniciar sesión</h1>
        
        {!user ? (
          <>
            {/* Formulario de inicio de sesión con correo y contraseña */}
            <form onSubmit={handleEmailSignIn} className="mb-4">
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 mb-2 border rounded w-full"
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 mb-2 border rounded w-full"
              />
              <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Iniciar sesión</button>
            </form>

            {/* Botón de inicio de sesión con Google */}
            <button
              onClick={handleGoogleSignIn}
              className="bg-blue-500 text-white p-2 rounded mb-2 w-full"
            >
              Iniciar sesión con Google
            </button>
          </>
        ) : (
          <>
            {/* Mostrar botones después de inicio de sesión */}
            <h2 className="mb-4">Bienvenido, {user.displayName || user.email}</h2>
            <button
              onClick={() => navigate('/transcription')}
              className="bg-green-500 text-white p-2 rounded mb-2 w-full"
            >
              Transcribir clase
            </button>
            <button
              onClick={() => navigate('/question')}
              className="bg-yellow-500 text-white p-2 rounded mb-2 w-full"
            >
              Hacer una pregunta
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white p-2 rounded w-full"
            >
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
