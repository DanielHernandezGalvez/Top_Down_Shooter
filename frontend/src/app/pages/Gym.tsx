import { useState, ChangeEvent } from "react";
import { useApi } from "../context/ApiContext";

// Definición de tipos para los datos del gimnasio
interface GymDay {
    user_id: number;
    date: string;
  }

interface GymDayData {
  date: string;
}

export default function Gym() {
  const { registerGymDay, getGymDays } = useApi();
  const [date, setDate] = useState<string>("");
  const [gymDays, setGymDays] = useState<GymDayData[]>([]);

  const handleRegister = async () => {
    const gymDay = { user_id: 1, date }; // Cambia `user_id` según el usuario
    await registerGymDay(gymDay as any); // Pasar como `any` si el tipo no coincide
    alert("Gym day registered!");
  };

  const fetchGymDays = async () => {
    const data = await getGymDays("1"); // Convertir 1 a string
    setGymDays(data);
  };

  return (
    <div>
      <h1>Register Gym Day</h1>
      <input
        type="date"
        value={date}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
      />
      <button onClick={handleRegister}>Register Day</button>

      <h2>Gym Days</h2>
      <button onClick={fetchGymDays}>Fetch Gym Days</button>
      <ul>
        {gymDays.map((day, index) => (
          <li key={index}>{day.date}</li>
        ))}
      </ul>
    </div>
  );
}
