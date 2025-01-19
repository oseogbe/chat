"use client"


import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image"
import { io, Socket } from "socket.io-client";
import { useSocket } from '@/providers/SocketIOProvider';

import { Contact } from "@/typings";

let socket: Socket;

interface ChatInputProps {
    contact: Contact;
    onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ contact, onSendMessage }) => {
    const { data: session } = useSession();
    const socket = useSocket();

    const [newMessage, setNewMessage] = useState<string>("");

    const handleSendMessage = () => {
        if (newMessage.trim() && socket) {
            socket.emit("private_message", {
                senderId: session?.user.id,
                receiverId: contact.id,
                message: newMessage,
            });

            // Add the message locally
            onSendMessage(newMessage);

            setNewMessage("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    return (
        <div className='absolute bottom-6 left-20 right-20'>
            <div className="relative">
                <input
                    type='text'
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className='h-14 pl-4 pr-16 bg-white w-full text-[#707991] focus:border-none focus:ring-0 focus:outline-[#6E80A4] rounded-xl'
                    placeholder='Message'
                />
                <Image
                    src="/img/send.svg"
                    width={24}
                    height={24}
                    alt='send icon'
                    className='absolute top-4 right-4 cursor-pointer'
                    onClick={handleSendMessage}
                />
            </div>
        </div>
    )
}

export default ChatInput