"use client"

import React, { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import { useSocket } from '@/providers/SocketIOProvider';

import { Contact, Message } from "@/typings";
import { getHourAndMinute } from "@/lib/utils";

interface ChatMessagesProps {
    contact: Contact
    newMessage: string
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ contact, newMessage }) => {
    const { data: session } = useSession();
    const socket = useSocket();
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (socket && session) {
            socket.on("receive_message", (message: Message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            });
        }
    }, [socket, session]);

    useEffect(() => {
        const fetchMessages = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/message/fetch?chatUserId=${contact.id}`, {
                headers: {
                    Authorization: `Bearer ${session?.user.token}`,
                },
            });
            const data = await response.json();
            if (data.success) {
                setMessages(data.messages);
            }
        };

        fetchMessages();
    }, [contact, session]);

    useEffect(() => {
        if (newMessage) {
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    id: Date.now().toString(),
                    senderId: session?.user.id as string,
                    receiverId: contact.id,
                    content: newMessage,
                    createdAt: new Date().toISOString(),
                },
            ]);
        }
    }, [newMessage, contact.id, session?.user.id]);

    return (
        <div className="h-full mx-20 flex flex-col-reverse overflow-y-auto scrollbar-hide">
            <div>
                <div className="w-fit py-2 px-3 my-4 bg-white text-[#838A95] rounded-xl mx-auto">
                    Today
                </div>
                <ul className="space-y-5">
                    {messages.map((message) => (
                        <li
                            key={message.id}
                            className={`max-w-lg ${message.senderId === session?.user.id ? 'ms-auto' : 'flex gap-x-2 sm:gap-x-4'}`}
                        >
                            <div className={`${message.senderId === session?.user.id ? 'bg-[#DEE9FF]' : 'bg-white border border-gray-200'} rounded-2xl p-4 space-y-3`}>
                                <p className="text-sm text-[#011627]">
                                    {message.content}
                                </p>
                                <div className="flex justify-end mt-1">
                                    <time className="text-xs text-[#011627]">{getHourAndMinute(message.createdAt!)}</time>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ChatMessages