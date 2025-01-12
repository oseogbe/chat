import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const providers = [
    CredentialsProvider({
        name: "credentials",
        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, {
                email: credentials?.email,
                password: credentials?.password,
            });

            if (res.data.token) {
                return { id: res.data.userId, email: credentials?.email };
            }

            return null;
        }
    })
];

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
        };
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
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.id && session.user) {
                session.user.id = token.id as string;
            }
            return session;
        }
    }
};

const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };