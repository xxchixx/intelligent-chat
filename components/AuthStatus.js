import { signIn, signOut, useSession } from "next-auth/react";

const AuthStatus = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <div>
        <p>Welcome, {session.user.name}!</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  } else {
    return (
      <div>
        <p>You are not logged in. Please log in to chat.</p>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }
};

export default AuthStatus;
