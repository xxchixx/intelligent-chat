'use client'; // for client-side hooks

import { useSession, signOut } from 'next-auth/react';

const Profile = () => {
  const { data: session } = useSession();

  // Default image if no user image exists
  const defaultImage = '/default-profile-pic.jpg';

  return (
    <div className="flex items-center space-x-4">
      {session?.user?.image ? (
        <img
          src={session.user.image}
          alt="Profile Picture"
          className="w-12 h-12 rounded-full"
        />
      ) : (
        <img
          src={defaultImage}
          alt="Default Profile Picture"
          className="w-12 h-12 rounded-full"
        />
      )}
      <button
        onClick={() => signOut()}
        className="text-white bg-blue-500 px-4 py-2 rounded-full"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
