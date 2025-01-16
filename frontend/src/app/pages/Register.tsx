import { useState, ChangeEvent, FormEvent } from "react";
import { useApi } from "../context/ApiContext";

// Definición del tipo para el formulario
interface FormData {
  username: string;
  email: string;
  password: string;
}

export default function Register() {
  const { registerUser } = useApi();
  const [form, setForm] = useState<FormData>({ username: "", email: "", password: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await registerUser(form);
    alert(response.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />
      <button type="submit">Register</button>
    </form>
  );
}
