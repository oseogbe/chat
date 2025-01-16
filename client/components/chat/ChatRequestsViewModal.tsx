"use client"

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import apiClient from '@/lib/apiClient';
import { multiFormatDateString } from '@/lib/utils';

import { XIcon } from 'lucide-react';

import { ChatRequest } from '@/typings';

interface ChatRequestsViewModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ChatRequestsViewModal: React.FC<ChatRequestsViewModalProps> = ({ isOpen, onClose }) => {
    const { data: session } = useSession();
    const [chatRequests, setChatRequests] = useState<ChatRequest[]>([]);

    useEffect(() => {
        if (isOpen) {
            const fetchChatRequests = () => {
                apiClient.get('/api/v1/chat-request/all', {
                    headers: {
                        Authorization: `Bearer ${session?.user?.token}`
                    }
                }).then(response => {
                    setChatRequests(response.data.data);
                }).catch(error => {
                    console.error(error);
                });
            }

            fetchChatRequests();
        }
    }, [isOpen, session]);

    const handleAccept = async (requestId: string) => {
        try {
            await apiClient.post('/api/v1/chat-request/update-status', { requestId, status: 'ACCEPTED' }, {
                headers: {
                    Authorization: `Bearer ${session?.user?.token}`
                }
            });
            toast.success('Chat request accepted!');
            onClose();
        } catch (error) {
            toast.error('Failed to accept chat request.');
        }
    };

    const handleReject = async (requestId: string) => {
        try {
            await apiClient.post(`/api/v1/chat-request/update-status`, { requestId, status: 'REJECTED' }, {
                headers: {
                    Authorization: `Bearer ${session?.user?.token}`
                }
            });
            toast.success('Chat request rejected!');
            onClose();
        } catch (error) {
            toast.error('Failed to reject chat request.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-20">
                <h2 className="text-xl font-medium mb-4">Your Chat Requests</h2>
                <XIcon size={20} className='cursor-pointer absolute top-3 right-3' onClick={onClose} />
                <div className="mt-6">
                    <ul className="max-h-[500px] overflow-y-auto space-y-6 p-3 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                        {chatRequests.map((request, index) => (
                            <li key={index} className="flex justify-between items-start gap-x-6">
                                <img src="/icons/bell-circle.svg" alt="Notification Icon" />
                                <div>
                                    <div className="text-sm text-[#262626]">
                                        {
                                            request.senderId === session?.user?.id ?
                                                `You have sent a chat request to ${request.receiver.name}.` :
                                                `You have received a chat request from ${request.sender.name}.`
                                        }
                                        {' '}
                                        {request.status === 'PENDING' && request.senderId === session?.user?.id && <span className="text-yellow-500">[Pending]</span>}
                                        {request.status === 'REJECTED' && <span className="text-red-500">[Rejected]</span>}
                                        {request.status === 'ACCEPTED' && <span className="text-green-500">[Accepted]</span>}
                                    </div>
                                    <div className="text-sm text-[#8C8C8C] mt-[2px]">{multiFormatDateString(request.createdAt)}</div>
                                    {request.status === 'PENDING' && request.senderId !== session?.user?.id && (
                                        <div className="flex gap-x-3 mt-2">
                                            <button onClick={() => handleAccept(request.id)} className="px-3 py-1.5 bg-[#15CF74] text-white text-xs rounded-[22px]">Accept</button>
                                            <button onClick={() => handleReject(request.id)} className="px-3 py-1.5 bg-[#FF4A4A] text-white text-xs rounded-[22px]">Reject</button>
                                        </div>
                                    )}
                                </div>
                                <img src="/icons/notification-dot.svg" className="mt-2" alt="Notification Dot" />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default ChatRequestsViewModal