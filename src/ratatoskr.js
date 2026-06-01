export function createMessage(
    source,
    destination,
    messageType,
    payload
) {

    return {
        messageId:
            `MSG-${Date.now()}`,

        source,
        destination,
        messageType,
        payload,

        timestamp:
            new Date().toISOString()
    };
}