"use client"

import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import toast from 'react-hot-toast';

import apiClient from '@/lib/apiClient';

import { XIcon } from "lucide-react";

import { Contact } from '@/typings';

interface ChatRequestSendModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ChatRequestSendModal: React.FC<ChatRequestSendModalProps> = ({ isOpen, onClose }) => {
    const { data: session } = useSession();
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState<Contact[]>([]);
    const [selectedUser, setSelectedUser] = useState<Contact | null>(null);

    useEffect(() => {
        if (searchQuery) {
            const timeoutId = setTimeout(() => {
                apiClient.get(`/api/v1/user/search?query=${searchQuery}`, {
                    headers: {
                        Authorization: `Bearer ${session?.user?.token}`
                    }
                })
                    .then(response => setUsers(response.data.data))
                    .catch(error => {
                        console.error(error);
                        toast.error(error.response.data.message, {
                            className: 'xl:mt-16'
                        });
                    });
            }, 300);
            return () => clearTimeout(timeoutId);
        }
    }, [searchQuery, session]);

    const handleSendRequest = () => {
        if (selectedUser) {
            apiClient.post('/api/v1/chat-request/send', { receiverId: selectedUser.id }, {
                headers: {
                    Authorization: `Bearer ${session?.user?.token}`
                }
            })
                .then(response => {
                    setSearchQuery('');
                    toast.success(response.data.message, {
                        className: 'xl:mt-16'
                    });
                    onClose();
                })
                .catch(error => {
                    console.error(error);
                    toast.error(error.response.data.message, {
                        className: 'xl:mt-16'
                    });
                });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-20">
                <h2 className="text-xl font-medium mb-4">Chat Request</h2>
                <XIcon size={20} className='cursor-pointer absolute top-3 right-3' onClick={onClose} />
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 text-sm border border-gray-300 rounded"
                />
                <ul className="max-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 mb-4">
                    {users.map(user => (
                        <li
                            key={user.id}
                            onClick={() => {
                                setSelectedUser(user);
                                setSearchQuery(user.name);
                            }}
                            className={`p-2 text-sm cursor-pointer ${selectedUser?.id === user.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                        >
                            {user.name}
                        </li>
                    ))}
                </ul>
                <button
                    onClick={handleSendRequest}
                    disabled={!selectedUser}
                    className="w-full bg-blue-500 text-white p-2 rounded disabled:opacity-50"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatRequestSendModal;