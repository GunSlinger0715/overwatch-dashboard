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

        transportStatus: "DELIVERED",

        latency: "0ms",

        timestamp:
            new Date().toISOString()
    };
}