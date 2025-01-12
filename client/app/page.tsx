"use client"

import { useSession, signOut } from 'next-auth/react';

const Home = () => {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  const handleLogout = () => {
    signOut({
      callbackUrl: '/sign-in',
    });
  };

  return (
    <div>
      <h1>Welcome to Chat</h1>
      <div>User #{session.user?.id}</div>
      <div className='mt-4'>
        <button className='bg-[#6E80A4] rounded-md px-12 py-3 text-white font-medium' onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Home
