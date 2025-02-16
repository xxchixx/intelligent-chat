'use client';

import { useSession, signOut } from 'next-auth/react';

const Sidebar = () => {
  const { data: session } = useSession();

  // Default image if no user image exists
  const defaultImage = '/default-profile-pic.jpg';

  return (
    <div className="h-screen bg-gray-800 text-white w-64 p-4 flex flex-col justify-between">
      {/* Profile Section */}
      <div>
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={session?.user?.image || defaultImage}
            alt="Profile Picture"
            className="w-16 h-16 rounded-full"
          />
          <h2 className="text-lg font-semibold">{session?.user?.name || 'User'}</h2>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-4">
          <a href="#" className="text-lg hover:text-blue-300">Settings</a>
        </nav>
        
        {/* Logout Button - Properly Positioned */}
        <button
        onClick={() => signOut()} 
        className="text-sm bg-gradient-to-r from-cyan-500 from-10% via-indigo-500 via-50% 
        to-sky-500 to-100% px-4 py-2 my-10 rounded-md">
        Logout
      </button>
      </div>

      
    </div>
  );
};

export default Sidebar;


