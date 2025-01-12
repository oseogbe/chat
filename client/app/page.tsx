"use client"

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Topbar from '@/components/chat/Topbar';
import ChatMenu from '@/components/chat/ChatMenu';
import ContactDetailsMenu from '@/components/chat/ContactDetailsMenu';
import ChatInput from '@/components/chat/ChatInput';
import ChatMessages from '@/components/chat/ChatMessages';

const Home = () => {
  const { data: session } = useSession();
  const [isContactDetailsMenuOpen, setContactDetailsMenuOpen] = useState(false);

  if (!session) {
    return null;
  }

  const handleLogout = () => {
    signOut({
      callbackUrl: '/sign-in',
    });
  };

  const openContactDetailsMenu = () => {
    setContactDetailsMenuOpen(true);
  };

  const closeContactDetailsMenu = () => {
    setContactDetailsMenuOpen(false);
  };

  return (
    <div className='h-screen flex flex-1'>
      <ChatMenu />
      <div className='flex flex-col flex-1'>
        <Topbar onClick={openContactDetailsMenu} />
        <div className='relative flex flex-col flex-1 bg-[#f5f5f5]'>
          <ChatMessages />
          <ChatInput />
        </div>
      </div>
      <ContactDetailsMenu isOpen={isContactDetailsMenuOpen} onClose={closeContactDetailsMenu} />
      {/* <h1>Welcome to Chat</h1>
      <div>User #{session.user?.id}</div>
      <div className='mt-4'>
        <button className='bg-[#6E80A4] rounded-md px-12 py-3 text-white font-medium' onClick={handleLogout}>
          Logout
        </button>
      </div> */}
    </div>
  )
}

export default Home
