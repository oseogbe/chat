const ChatListItem = () => {
    return (
        <div className="flex items-center gap-4 py-3 px-4 hover:bg-[#F5F5F5] cursor-pointer">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#6E80A4] text-white font-medium uppercase">
                <div className="w-3 h-3 rounded-full bg-[#15CF74] absolute top-0 right-0"></div>
                jd
            </div>
            <div className="flex flex-1 items-center justify-between">
                <div className="">
                    <h4 className="text-[#011627] font-semibold">Jessica Drew</h4>
                    <p className="text-sm text-[#707991]">Ok, see you later</p>
                </div>
                <div className="w-12 flex flex-col items-end">
                    <div className="text-xs text-[#707991] mb-1">8:30pm</div>
                    <div className="w-[18px] h-[18px] bg-[#3758F9] flex items-center justify-center text-xs text-white rounded-full">2</div>
                </div>
            </div>
        </div>
    )
}

export default ChatListItem