'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';

interface ClientSessionProviderProps {
    children: React.ReactNode;
    session?: Session;
}

export default function SessionProvider({
    children,
    session,
}: ClientSessionProviderProps) {
    return <NextAuthSessionProvider session={session}>{children}</NextAuthSessionProvider>;
}