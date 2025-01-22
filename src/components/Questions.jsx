import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";

const Questions = () => {
  const [question, setQuestion] = useState('');

  const handleTextToSpeech = () => {
    const utterance = new SpeechSynthesisUtterance(question);
    window.speechSynthesis.speak(utterance);
  };

  const handleSubmit = async () => {
    if (question.trim() !== '') {
      try {
        const docRef = await addDoc(collection(db, "questions"), {
          question: question,
          timestamp: new Date(),
        });
        console.log("Question added with ID: ", docRef.id);
        setQuestion(''); // Clear the input after submitting
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Escribe tu pregunta</h1>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
        rows="4"
      ></textarea>
      <button
        onClick={handleTextToSpeech}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        Escuchar Pregunta
      </button>
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white p-2 rounded"
      >
        Enviar Pregunta
      </button>
    </div>
  );
};

export default Questions;
