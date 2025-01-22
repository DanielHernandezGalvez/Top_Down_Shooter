import React, { useState, useEffect } from 'react';

const Transcription = () => {
  const [transcription, setTranscription] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    // Verifica si SpeechRecognition está disponible en el navegador
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      alert("Lo siento, tu navegador no soporta SpeechRecognition.");
      return;
    }

    // Asigna la API de SpeechRecognition
    const speechRecognitionInstance = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    speechRecognitionInstance.continuous = true;
    speechRecognitionInstance.interimResults = true;

    // Evento cuando se recibe una transcripción parcial o final
    speechRecognitionInstance.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setTranscription(transcript);
    };

    // recognition.lang = 'es-419'; // Español latinoamericano
    // recognition.continuous = true; // Para que siga transcribiendo sin parar
    // recognition.interimResults = true; // Para mostrar resultados intermedios mientras se habla
    // recognition.maxAlternatives = 1; // Solo una alternativa (puedes cambiar esto según tu necesidad)


    // Evento cuando ocurre un error
    speechRecognitionInstance.onerror = (event) => {
      console.error("Error de reconocimiento de voz: ", event.error);
    };

    // Guardar la instancia de reconocimiento
    setRecognition(speechRecognitionInstance);

    return () => {
      // Detener la grabación al desmontar el componente
      if (speechRecognitionInstance) {
        speechRecognitionInstance.stop();
      }
    };
  }, []);

  // Iniciar la grabación
  const startRecording = () => {
    if (recognition) {
      recognition.start();
      setIsRecording(true);
    }
  };

  // Detener la grabación
  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center p-5 bg-white rounded shadow-lg">
        <h1 className="text-2xl mb-4">Transcripción en tiempo real</h1>
        
        <div className="mb-4">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className="bg-blue-500 text-white p-2 rounded"
          >
            {isRecording ? 'Detener grabación' : 'Iniciar grabación'}
          </button>
        </div>

        <div className="bg-gray-200 p-4 rounded mt-4">
          <p className="text-sm">Texto transcrito:</p>
          <p>{transcription}</p>
        </div>
      </div>
    </div>
  );
};

export default Transcription;
