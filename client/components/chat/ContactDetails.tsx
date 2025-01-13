import React from 'react';

import { getInitials } from '@/lib/utils';

interface ContactDetailsProps {
    onClick: () => void;
    contactName: string;
}

const ContactDetails: React.FC<ContactDetailsProps> = ({ onClick, contactName }) => {
    return (
        <div className="flex items-center gap-3 cursor-pointer" onClick={onClick}>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#6E80A4] text-white font-medium uppercase overflow-hidden">
                {getInitials(contactName)}
            </div>
            <h3 className="text-[#011627] font-semibold">{contactName}</h3>
        </div>
    )
}

export default ContactDetails