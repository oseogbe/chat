'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { io, Socket } from 'socket.io-client';

interface SocketIOProviderProps {
    children: React.ReactNode;
}

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => useContext(SocketContext);

export default function SocketIOProvider({ children }: SocketIOProviderProps) {
    const { data: session } = useSession();
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (session) {
            const newSocket = io(process.env.NEXT_PUBLIC_API_URL);
            newSocket.emit("join", session.user.id);
            setSocket(newSocket);

            // Clean up the socket connection on component unmount
            return () => {
                newSocket.disconnect();
            };
        }
    }, [session]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}