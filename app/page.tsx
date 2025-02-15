export default function Home() {
  return (
    <section className="h-screen overflow-hidden flex items-center justify-center font-mono bg-gradient-to-r 
    from-cyan-500 from-10% via-indigo-500 via-50% to-sky-500 to-100%">
      <div className="flex shadow-2xl">
        <div className="flex flex-col items-center justify-center text-center p-20 gap-6 bg-white rounded-2xl">

          <h1 className="text-5xl font-bold">Welcome</h1> 
            <div className="flex flex-col text-2xl text-left gap-1">
              <span>Email</span>
              <input type="text" className="rounded-md p-1 border-2 outline-none focus:border-cyan-400 focus:bg-slate-50" />
        
            </div>

            <div>
              <div className="flex flex-col text-2xl text-left gap-1">
                <span>Password</span>
                <input type="password"
                className="rounded-md p-1 border-2 outline-none focus:border-cyan-400 focus:bg-slate-50" />
                <div className="flex gap-1 items-center">
                  <input type="checkbox" />
                  <span className="text-base">Remember password?</span>
                </div>

              </div>
              
              <button className="
              mt-4 px-10 py-2 text-2xl rounded-md bg-gradient-to-tr from-green-400 to-blue-500
              hover:from-pink-500 hover:to-yellow-500
              text-white
              ">Login</button>

              <p className="mt-4 font-semibold">Don't have an account? <a href="#" className="text-blue-400 hover:underline">Register</a></p>
            </div>
        </div>
      </div>
    </section>
  );
}