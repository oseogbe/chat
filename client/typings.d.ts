type Contact = {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    image: string;
}

type Message = {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    isRead?: boolean;
    createdAt?: string;
}

type ChatRequest = {
    id: string;
    senderId: string;
    sender: Contact;
    receiverId: string;
    receiver: Contact;
    status: PENDING | ACCEPTED | REJECTED;
    createdAt: string;
}

export { Contact, Message, ChatRequest }