function getInitials(name: string) {
    return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .join('')
        .substring(0, 2);
}

function getHourAndMinute(date: string) {
    return new Date(date).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
    // new Date(message.createdAt!).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function formatDateString(dateString: string) {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
    }

    const date = new Date(dateString)
    const formattedDate = date.toLocaleDateString("en-US", options)

    const time = date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
    })

    return `${formattedDate} at ${time}`
}

function multiFormatDateString(timestamp: string) {
    const timestampNum = Math.round(new Date(timestamp).getTime() / 1000)
    const date: Date = new Date(timestampNum * 1000)
    const now: Date = new Date()

    const diff: number = now.getTime() - date.getTime()
    const diffInSeconds: number = diff / 1000
    const diffInMinutes: number = diffInSeconds / 60
    const diffInHours: number = diffInMinutes / 60
    const diffInDays: number = diffInHours / 24

    switch (true) {
        case Math.floor(diffInDays) >= 30:
            return formatDateString(timestamp)
        case Math.floor(diffInDays) === 1:
            return `${Math.floor(diffInDays)} day ago`
        case Math.floor(diffInDays) > 1 && diffInDays < 30:
            return `${Math.floor(diffInDays)} days ago`
        case Math.floor(diffInHours) >= 1:
            return `${Math.floor(diffInHours)} hours ago`
        case Math.floor(diffInMinutes) >= 1:
            return `${Math.floor(diffInMinutes)} minutes ago`
        default:
            return "Just now"
    }
}

export { getInitials, getHourAndMinute, formatDateString, multiFormatDateString };