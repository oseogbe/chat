"use client"

import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useSocket } from '@/providers/SocketIOProvider';

import apiClient from '@/lib/apiClient';
import { getHourAndMinute, getInitials } from '@/lib/utils';

import { Contact, Message } from '@/typings';

interface ContactDetailsProps {
    onSelectContact: (contact: Contact) => void;
}

const ChatListItem: React.FC<ContactDetailsProps> = ({ onSelectContact }) => {
    const { data: session } = useSession();
    const socket = useSocket();
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [lastMessages, setLastMessages] = useState<{ [key: string]: Message }>({});
    const [connectedUsers, setConnectedUsers] = useState<Set<string>>(new Set());

    useEffect(() => {
        if (session && socket) {
            fetchContactsAndMessages();

            // Listen for connected users
            socket.on("user_connected", (userId) => {
                setConnectedUsers((prev) => new Set([...prev, userId]));
            });

            // Listen for disconnected users
            socket.on("user_disconnected", (userId) => {
                setConnectedUsers((prev) => {
                    const newSet = new Set(prev);
                    newSet.delete(userId);
                    return newSet;
                });
            });

            // Listen for refresh contact list event
            socket.on("refresh_contact_list", ({ receiverId, senderId }) => {
                if ([receiverId, senderId].includes(session?.user.id)) {
                    fetchContactsAndMessages();
                }
            });
        }
    }, [session, socket]);

    const fetchContactsAndMessages = async () => {
        try {
            const response = await apiClient.get('/api/v1/user/get-contacts', {
                headers: {
                    Authorization: `Bearer ${session?.user.token}`
                }
            });
            setContacts(response.data.data);
            response.data.data.forEach(async (contact: Contact) => {
                try {
                    // TODO: change to call an endpoint that only retrieves the last message
                    const messageResponse = await apiClient.get(`/api/v1/message/fetch?chatUserId=${contact.id}`, {
                        headers: {
                            Authorization: `Bearer ${session?.user.token}`
                        }
                    });
                    const messages = messageResponse.data.messages;
                    if (messages.length > 0) {
                        setLastMessages(prevState => ({
                            ...prevState,
                            [contact.id]: messages[messages.length - 1]
                        }));
                    }
                } catch (error) {
                    console.error(error);
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {contacts.map(contact => (
                <div key={contact.id} className="flex items-center gap-4 py-3 px-4 hover:bg-[#F5F5F5] cursor-pointer" onClick={() => onSelectContact(contact)}>
                    <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#6E80A4] text-white font-medium uppercase">
                        {/* green badge to show a contact is online */}
                        {connectedUsers.has(contact.id) && (
                            <div className="w-3 h-3 rounded-full bg-[#15CF74] absolute top-0 right-0"></div>
                        )}
                        {getInitials(contact.name)}
                    </div>
                    <div className="flex flex-1 items-center justify-between">
                        <div className="">
                            <h4 className="text-[#011627] font-semibold">{contact.name}</h4>
                            <p className="text-sm text-[#707991]">
                                {lastMessages[contact.id]?.content || "No messages yet"}
                            </p>
                        </div>
                        <div className="w-16 flex flex-col items-end">
                            <div className="text-xs text-[#707991] mb-1">
                                {lastMessages[contact.id]?.createdAt ? getHourAndMinute(lastMessages[contact.id]!.createdAt!) : ""}
                            </div>
                            <div className="w-[18px] h-[18px] bg-[#3758F9] flex items-center justify-center text-xs text-white rounded-full">0</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ChatListItem