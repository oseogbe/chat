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

export { getInitials, getHourAndMinute };