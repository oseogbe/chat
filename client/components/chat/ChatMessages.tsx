const ChatMessages = () => {
    return (
        <div className="h-full mx-20 flex flex-col-reverse overflow-y-auto scrollbar-hide">
            <div>
                <div className="w-fit py-2 px-3 my-4 bg-white text-[#838A95] rounded-xl mx-auto">
                    Today
                </div>
                <ul className="space-y-5">
                    <li className="max-w-lg flex gap-x-2 sm:gap-x-4">
                        <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3">
                            <p className="text-sm text-[#011627]">
                                OMG do you remember what you did last night at the work night out?
                            </p>
                            <div className="flex justify-end mt-1">
                                <time className="text-xs text-[#011627]">12:45</time>
                            </div>
                        </div>
                    </li>
                    <li className="max-w-lg ms-auto mt-1 gap-x-2 sm:gap-x-4">
                        <div className="grow text-end space-y-3">
                            <div className="inline-block bg-[#DEE9FF] rounded-2xl p-4 shadow-sm">
                                <p className="text-sm text-[#011627]">
                                    no haha
                                </p>
                                <div className="flex justify-end mt-1">
                                    <time className="text-xs text-[#011627]">12:48</time>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="max-w-lg ms-auto flex justify-end gap-x-2 sm:gap-x-4">
                        <div className="grow text-end space-y-3">
                            <div className="inline-block bg-[#DEE9FF] rounded-2xl p-4 shadow-sm">
                                <p className="text-sm text-[#011627]">
                                    i don't remember anything
                                </p>
                                <div className="flex justify-end mt-1">
                                    <time className="text-xs text-[#011627]">12:50</time>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ChatMessages