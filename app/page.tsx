"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";  // Import the router to redirect after login

export default function Home() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);  // New state to track hydration
  const router = useRouter();  // For routing after login

  // Ensure we only render the form after hydration is complete
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (login)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");  // Clear any previous error

    try {
      const signInResult = await signIn("credentials", {
        redirect: false,
        username: formData.username,
        password: formData.password,
      });

      if (signInResult?.error) {
        setError("Failed to log in. Please check your credentials.");
      } else {
        // Redirect to the chat page after successful login
        router.push("/chat");
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
    <section className="h-screen overflow-hidden flex items-center justify-center font-mono bg-gradient-to-r 
    from-cyan-500 from-10% via-indigo-500 via-50% to-sky-500 to-100%">
      <div className="flex shadow-2xl">
        <div className="flex flex-col items-center justify-center text-center p-20 gap-6 bg-white rounded-2xl">

          <h1 className="text-5xl font-bold">Welcome</h1> 
            <div className="flex flex-col text-2xl text-left gap-1">
              <span>Username</span>
              <input type="text" name="username"  value={formData.username} onChange={handleChange} 
              className="rounded-md p-1 border-2 outline-none focus:border-cyan-400 focus:bg-slate-50" />
        
            </div>

            <div>
              <div className="flex flex-col text-2xl text-left gap-1">
                <span>Password</span>
                <input type="password" name="password" value={formData.password} onChange={handleChange}
                className="rounded-md p-1 border-2 outline-none focus:border-cyan-400 focus:bg-slate-50" />
                <div className="flex gap-1 items-center">
                  <input type="checkbox" />
                  <span className="text-base">Remember password?</span>
                </div>

              </div>
              
              <button onClick={handleSubmit} 
              className="mt-4 px-10 py-2 text-2xl rounded-md bg-gradient-to-tr from-green-400 to-blue-500
              hover:from-pink-500 hover:to-yellow-500 text-white">
              Login</button>

              <p className="mt-4 font-semibold">Don't have an account? 
                <Link href="/register" className="text-blue-400 hover:underline"> Register</Link></p>
            </div>

            {error && <p className="text-red-500">{error}</p>}  {/* Show error if login fails */}
        </div>
      </div>
    </section>
  );
}