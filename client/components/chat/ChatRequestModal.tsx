"use client"

import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import axios from 'axios';
import toast from 'react-hot-toast';

import { XIcon } from "lucide-react";

import { Contact } from '@/typings';

interface ChatRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ChatRequestModal: React.FC<ChatRequestModalProps> = ({ isOpen, onClose }) => {
    const { data: session } = useSession();
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState<Contact[]>([]);
    const [selectedUser, setSelectedUser] = useState<Contact | null>(null);

    useEffect(() => {
        if (searchQuery) {
            const timeoutId = setTimeout(() => {
                axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/search?query=${searchQuery}`, {
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
            axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/chat-request/send`, { receiverId: selectedUser.id }, {
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
                <h2 className="text-2xl font-medium mb-4">Send Chat Request</h2>
                <XIcon size={20} className='cursor-pointer absolute top-3 right-3' onClick={onClose} />
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <ul className="max-h-40 overflow-y-auto mb-4">
                    {users.map(user => (
                        <li
                            key={user.id}
                            onClick={() => {
                                setSelectedUser(user);
                                setSearchQuery(user.name);
                            }}
                            className={`p-2 cursor-pointer ${selectedUser?.id === user.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
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
                    Send Request
                </button>
            </div>
        </div>
    );
};

export default ChatRequestModal;