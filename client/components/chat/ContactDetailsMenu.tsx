import Image from "next/image";
import { XIcon } from "lucide-react";

import { getInitials } from '@/lib/utils';

import { Contact } from "@/typings";

interface ContactDetailsMenuProps {
    isOpen: boolean;
    onClose: () => void;
    contact?: Contact;
}

const ContactDetailsMenu = ({ isOpen, onClose, contact }: ContactDetailsMenuProps) => {
    return (
        <div className={`transition-all duration-300 ${isOpen ? 'w-[380px]' : 'w-0'}`}>
            <div className={`flex flex-col gap-y-4 w-auto p-4 border-r bg-white border-[#D9DCE0] ${isOpen ? 'block' : 'hidden'}`}>
                <XIcon size={20} className="cursor-pointer" onClick={onClose} />
                <div className="flex flex-col flex-1 items-center">
                    <div className="flex items-center justify-center w-[135px] h-[135px] rounded-full bg-[#6E80A4] text-3xl text-white font-medium uppercase overflow-hidden">
                        {getInitials(contact?.name || '')}
                    </div>
                    <div className="mt-5 text-[#011627] font-semibold">
                        {contact?.name}
                    </div>
                    <div className="mt-2 text-sm text-[#707991]">
                        {contact?.phoneNumber}
                    </div>
                    <div className="mt-2 text-sm text-[#707991]">
                        {contact?.email}
                    </div>
                    <hr className="mt-8 w-full bg-[#D4D4D4]" />
                </div>
            </div>
        </div>
    );
};

export default ContactDetailsMenu;
