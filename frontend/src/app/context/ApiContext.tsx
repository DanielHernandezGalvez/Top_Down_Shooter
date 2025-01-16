import { createContext, useContext, ReactNode } from "react";
import axios from "axios";

// Definición de tipos para los parámetros de las funciones
interface User {
  // Aquí se agregan los campos correspondientes al usuario
  username: string;
  password: string;
}

interface GymDay {
  // Aquí se agregan los campos correspondientes al día de gimnasio
  date: string;
  duration: number;
}

interface BodyPart {
  // Aquí se agregan los campos correspondientes a las partes del cuerpo
  name: string;
}

interface FormData {
  // Aquí se agregan los campos para los datos del formulario (ej. foto)
  file: File;
}

interface ApiContextType {
  registerUser: (user: User) => Promise<any>;
  registerGymDay: (gymDay: GymDay) => Promise<any>;
  uploadPhoto: (formData: FormData) => Promise<any>;
  registerBodyPart: (bodyPart: BodyPart) => Promise<any>;
  getGymDays: (userId: string) => Promise<any>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

interface ApiProviderProps {
  children: ReactNode;
}

export const ApiProvider = ({ children }: ApiProviderProps) => {
  const baseUrl = "http://your-api-domain/api/endpoints"; // Cambia por tu dominio

  // Registrar un usuario
  const registerUser = async (user: User) => {
    const response = await axios.post(`${baseUrl}/users.php`, user);
    return response.data;
  };

  // Registrar un día de gimnasio
  const registerGymDay = async (gymDay: GymDay) => {
    const response = await axios.post(`${baseUrl}/gym_days.php`, gymDay);
    return response.data;
  };

  // Subir una foto mensual
  const uploadPhoto = async (formData: FormData) => {
    const response = await axios.post(`${baseUrl}/photos.php`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  };

  // Registrar partes del cuerpo entrenadas
  const registerBodyPart = async (bodyPart: BodyPart) => {
    const response = await axios.post(`${baseUrl}/body_parts.php`, bodyPart);
    return response.data;
  };

  // Obtener los días de gimnasio
  const getGymDays = async (userId: string) => {
    const response = await axios.get(`${baseUrl}/gym_days.php`, {
      params: { user_id: userId },
    });
    return response.data;
  };

  return (
    <ApiContext.Provider
      value={{
        registerUser,
        registerGymDay,
        uploadPhoto,
        registerBodyPart,
        getGymDays,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
