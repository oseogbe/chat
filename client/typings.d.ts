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

export { Contact, Message }