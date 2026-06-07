export const dashboardData = {
    gatekeeper: {
        status: "ONLINE",
        target: "https://example.com",
        findings: 12
    },

    heimdal: {
        classification: "MISCONFIGURATION",
        confidence: 1.0,
        priority: "MEDIUM"
    },

    monolith: {
        recordsStored: 3
    },

    odin: {
        decision: "CORRECTABLE",
        recommendedAction: "ROUTE_TO_FORGE",
        reason: "Recoverable endpoint misconfiguration",
        confidence: 0.91
    }
};