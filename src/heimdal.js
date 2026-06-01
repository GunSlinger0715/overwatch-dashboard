export function classifyObservation(scanData) {

    if (!scanData) {
        return {
            classification: "AWAITING_DATA",
            confidence: 0,
            priority: "LOW"
        };
    }

    if (scanData.status === "ONLINE") {
        return {
            classification: "HEALTHY_ENDPOINT",
            confidence: 1.0,
            priority: "LOW"
        };
    }

    return {
        classification: "UNKNOWN",
        confidence: 0.5,
        priority: "MEDIUM"
    };
}