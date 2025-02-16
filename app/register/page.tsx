"use client";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isClient, setIsClient] = useState(false);  // New state to track hydration

  // Ensure we only render the form after hydration is complete
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); 
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Registration successful! 🎉");
        setFormData({ username: "", password: "", confirmPassword: "" }); // Reset form

        // Sign in the user after successful registration
        const signInResult = await signIn("credentials", {
            redirect: false,
            username: formData.username,
            password: formData.password,
          });

          if (signInResult?.error) {
            setError("Failed to log in automatically.");
          } else {
            // Redirect to the chat page after sign-in
            window.location.href = "/chat";  // Assuming "/chat" is your chat page route
          }
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (error) {
      setError("Failed to connect to server.");
    }
  };

  // Render the component only after it's hydrated (client-side)
  if (!isClient) {
    return null;  // Return null until the client is ready
  }

  return (
    <section className="h-screen flex items-center justify-center font-mono bg-gradient-to-r 
    from-cyan-500 from-10% via-indigo-500 via-50% to-sky-500 to-100%">
      <div className="w-full max-w-md shadow-2xl">
        <div className="flex flex-col items-center justify-center text-center p-10 gap-6 bg-white rounded-2xl">
          <h1 className="text-3xl font-bold">A new experience awaits...</h1> 
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <input 
              type="text" 
              name="username"
              placeholder="Username" 
              className="w-full rounded-md p-2 border-2 outline-none focus:border-cyan-400 focus:bg-slate-50"
              value={formData.username}
              onChange={handleChange}
            />
            <input 
              type="password" 
              name="password"
              placeholder="Password" 
              className="w-full rounded-md p-2 border-2 outline-none focus:border-cyan-400 focus:bg-slate-50"
              value={formData.password}
              onChange={handleChange}
            />
            <input 
              type="password" 
              name="confirmPassword"
              placeholder="Confirm Password" 
              className="w-full rounded-md p-2 border-2 outline-none focus:border-cyan-400 focus:bg-slate-50"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <button className="mt-4 px-10 py-2 text-2xl rounded-md bg-green-500 text-white hover:bg-green-600 w-full">
              Register
            </button>
          </form>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </div>
      </div>
    </section>
  );
}
