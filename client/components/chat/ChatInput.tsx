import Image from "next/image"

const ChatInput = () => {
    return (
        <div className='absolute bottom-6 left-20 right-20'>
            <div className="relative">
                <input type='text' className='h-14 pl-4 pr-16 bg-white w-full text-[#707991] focus:border-none focus:ring-0 focus:outline-[#6E80A4] rounded-xl' placeholder='Message' />
                <Image
                    src="/img/send.svg"
                    width={24}
                    height={24}
                    alt='send icon'
                    className='absolute top-4 right-4 cursor-pointer'
                />
            </div>
        </div>
    )
}

export default ChatInput