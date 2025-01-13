"use client"

import { useState } from 'react';
import { useSession } from 'next-auth/react';
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

  const openContactDetailsMenu = () => {
    setContactDetailsMenuOpen(true);
  };

  const closeContactDetailsMenu = () => {
    setContactDetailsMenuOpen(false);
  };

  return (
    <div className='h-screen flex flex-1'>
      <ChatMenu />
      <div className='relative flex flex-col flex-1'>
        <Topbar onClick={openContactDetailsMenu} />
        <div className='relative bg-[#f5f5f5] flex-1 pb-24 overflow-y-auto scrollbar-hide'>
          <ChatMessages />
        </div>
        <ChatInput />
      </div>
      <ContactDetailsMenu isOpen={isContactDetailsMenuOpen} onClose={closeContactDetailsMenu} />
    </div>
  )
}

export default Home
