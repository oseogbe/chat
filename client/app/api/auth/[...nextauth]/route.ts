import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import apiClient from "@/lib/apiClient";

type UserType = {
    id: string;
    email: string;
    token: string;
}

const providers = [
    CredentialsProvider({
        name: "credentials",
        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials: Record<"email" | "password", string> | undefined): Promise<UserType | null> {
            const res = await apiClient.post('/api/v1/auth/login', {
                email: credentials?.email,
                password: credentials?.password,
            });

            if (res.data.token) {
                return {
                    id: res.data.userId,
                    email: credentials?.email as string,
                    token: res.data.token
                };
            }

            return null;
        }
    })
];

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            token: string;
        };
    }

    interface User {
        id: string;
        email: string;
        token: string;
    }
}

export const OPTIONS: NextAuthOptions = {
    providers,
    pages: {
        signIn: '/sign-in'
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.token = user.token;
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.id && session.user) {
                session.user.id = token.id as string;
                session.user.token = token.token as string;
            }
            return session;
        }
    }
};

const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
