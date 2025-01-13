"use client"

import { useState } from 'react';
import { useSession } from 'next-auth/react';

import Topbar from '@/components/chat/Topbar';
import ChatMenu from '@/components/chat/ChatMenu';
import ContactDetailsMenu from '@/components/chat/ContactDetailsMenu';
import ChatInput from '@/components/chat/ChatInput';
import ChatMessages from '@/components/chat/ChatMessages';

import { Contact } from '@/typings';

const Home = () => {
  const { data: session } = useSession();
  const [isContactDetailsMenuOpen, setContactDetailsMenuOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact>();

  if (!session) {
    return null;
  }

  const openContactDetailsMenu = () => {
    setContactDetailsMenuOpen(true);
  };

  const closeContactDetailsMenu = () => {
    setContactDetailsMenuOpen(false);
  };

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
  };

  return (
    <div className='h-screen flex flex-1'>
      <ChatMenu onSelectContact={handleSelectContact} />
      {
        !selectedContact ? (
          <div className='bg-[#f5f5f5] h-screen flex flex-1'></div>
        ) : (
          <div className='relative flex flex-col flex-1'>
            <Topbar onClick={openContactDetailsMenu} contactName={selectedContact?.name} />
            <div className='relative bg-[#f5f5f5] flex-1 pb-24 overflow-y-auto scrollbar-hide'>
              <ChatMessages />
            </div>
            <ChatInput />
          </div>
        )
      }
      <ContactDetailsMenu
        isOpen={isContactDetailsMenuOpen}
        onClose={closeContactDetailsMenu}
        contact={selectedContact}
      />
    </div>
  )
}

export default Home
