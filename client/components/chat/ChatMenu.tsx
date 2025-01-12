import Image from "next/image";
import { Search } from "lucide-react";
import ChatListItem from "./ChatListItem";

const ChatMenu = () => {
    return (
        <div className='flex flex-col gap-y-4 w-[380px] border-r border-[#D9DCE0] shadow-sm'>
            <div className="flex items-center h-[70px] px-4">
                <Image
                    src="/img/chat-logo.svg"
                    width={100}
                    height={100}
                    alt='chat logo'
                />
            </div>
            <div className="relative px-4">
                <Search className="absolute top-2.5 left-7 h-5 w-5 text-[#707991]" />
                <input type="text" className="h-10 pl-10 pr-4 bg-[#F5F5F5] w-full rounded-[22px] text-sm text-[#6E80A4] focus:border-none focus:ring-0 focus:outline-[#6E80A4]" placeholder="Search" />
            </div>
            <div className="overflow-y-scroll overscroll-y-none scrollbar-hide">
                <ChatListItem />
            </div>
        </div>
    );
};

export default ChatMenu;
