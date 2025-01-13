type Contact = {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    image: string;
}

type Message = {
    content: string;
    createdAt: string;
}

export { Contact, Message }