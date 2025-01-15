"use client"

import React, { useState } from 'react';
import Image from "next/image";
import { signOut } from "next-auth/react";

import ChatListItem from "./ChatListItem";
import ChatRequestSendModal from './ChatRequestSendModal';
import ChatRequestsViewModal from './ChatRequestsViewModal';

import { Search, LogOut, UserPlus, Bell } from "lucide-react";

import { Contact } from '@/typings';

interface ChatMenuProps {
    onSelectContact: (contact: Contact) => void;
}

const ChatMenu: React.FC<ChatMenuProps> = ({ onSelectContact }) => {
    const [isChatRequestSendModalOpen, setChatRequestSendModalOpen] = useState(false);
    const [isChatRequestsViewModalOpen, setChatRequestsViewModalOpen] = useState(false);

    const toggleChatRequestSendModal = () => {
        setChatRequestSendModalOpen(!isChatRequestSendModalOpen);
    };

    const toggleChatRequestsViewModal = () => {
        setChatRequestsViewModalOpen(!isChatRequestsViewModalOpen);
    }

    const handleLogout = () => {
        signOut({
            callbackUrl: '/sign-in',
        });
    };

    return (
        <div className='flex flex-col gap-y-4 w-[380px] border-r border-[#D9DCE0] shadow-sm relative'>
            <div className="flex items-center justify-between h-[70px] px-4">
                <Image
                    src="/img/chat-logo.svg"
                    width={100}
                    height={100}
                    alt='chat logo'
                />
                <div className='flex items-center gap-x-3'>
                    <UserPlus size={20} className='cursor-pointer' onClick={toggleChatRequestSendModal} />
                    <ChatRequestSendModal isOpen={isChatRequestSendModalOpen} onClose={toggleChatRequestSendModal} />

                    <div className='relative'>
                        <Bell size={20} className='cursor-pointer' onClick={toggleChatRequestsViewModal} />
                        <div className="w-1.5 h-1.5 rounded-full bg-[#15CF74] absolute top-0 right-0.5"></div>
                        <ChatRequestsViewModal isOpen={isChatRequestsViewModalOpen} onClose={toggleChatRequestsViewModal} />
                    </div>
                </div>
            </div>
            <div className="relative px-4">
                <Search className="absolute top-2.5 left-7 h-5 w-5 text-[#707991]" />
                <input type="text" className="h-10 pl-10 pr-4 bg-[#F5F5F5] w-full rounded-[22px] text-sm text-[#6E80A4] focus:border-none focus:ring-0 focus:outline-[#6E80A4]" placeholder="Search" />
            </div>
            <div className="overflow-y-scroll overscroll-y-none scrollbar-hide flex-1 mb-4">
                <ChatListItem onSelectContact={onSelectContact} />
            </div>
            <button onClick={handleLogout} className="flex items-center justify-center gap-x-2 bg-[#F5F5F5] text-[#6E80A4] h-12 w-full absolute bottom-0 left-0 border-t border-[#D9DCE0] hover:bg-[#E5E5E5]">
                <LogOut className="h-5 w-5" />
                Logout
            </button>
        </div>
    );
};

export default ChatMenu;
