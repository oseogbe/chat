import React from 'react';

interface ContactDetailsProps {
    onClick: () => void;
}

const ContactDetails: React.FC<ContactDetailsProps> = ({ onClick }) => {
    return (
        <div className="flex items-center gap-3 cursor-pointer" onClick={onClick}>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#6E80A4] text-white font-medium uppercase overflow-hidden">
                jd
            </div>
            <h3 className="text-[#011627] font-semibold">Jessica Drew</h3>
        </div>
    )
}

export default ContactDetails