'use client';

import { useSession, signOut } from 'next-auth/react';

const Sidebar = () => {
  const { data: session } = useSession();

  // Default image if no user image exists
  const defaultImage = 'https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1.jpg';

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
          <h2 className="text-lg font-semibold">{session?.user?.username || 'User'}</h2>
        </div>
        
        {/* Logout Button - Properly Positioned */}
        <button
        onClick={() => signOut({callbackUrl: '/'}) } 
        className="text-sm bg-gradient-to-r from-cyan-500 from-10% via-indigo-500 via-50% 
        to-sky-500 to-100% px-4 py-2 my-10 rounded-md">
        Logout
      </button>
      </div>

      
    </div>
  );
};

export default Sidebar;


