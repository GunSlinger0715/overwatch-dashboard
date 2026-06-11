// =========================================================
// ODIN Decision Engine
//
// Purpose:
// Transform interpreted observations
// into operational judgments.
//
// Philosophy:
// Wisdom Through Understanding.
//
// Observe.
// Interpret.
// Judge.
//
// =========================================================

export function evaluateObservation(
    heimdalData
) {

    if (
        heimdalData.classification ===
        "HEALTHY_ENDPOINT"
    ) {

        return {
            decision: "ALLOW",
            recommendedAction: "NO_ACTION_REQUIRED",
            reason:
                "Endpoint appears healthy.",
            confidence: 0.95
        };
    }

    if (
        heimdalData.classification ===
        "MISCONFIGURATION"
    ) {

        return {
            decision: "CORRECTABLE",
            recommendedAction: "ROUTE_TO_FORGE",
            reason:
                "Recoverable endpoint misconfiguration",
            confidence: 0.91
        };
    }

    if (
        heimdalData.classification ===
        "MALICIOUS"
    ) {

        return {
            decision: "ESCALATE",
            recommendedAction: "INITIATE_RESPONSE",
            reason:
                "Potential hostile activity detected",
            confidence: 0.99
        };
    }

    if (
        heimdalData.classification ===
        "RESOURCE_NOT_FOUND"
    ) {

        return {
            decision: "VERIFY_RESOURCE_PATH",
            recommendedAction: "CHECK_ENDPOINT_URL",

            reason: "Target resource does not exist.",
            confidence: 0.95
        };
    }

    if (
        heimdalData.classification ===
        "ACCESS_DENIED"
    ) {

        return {
            decision: "VERIFY_ACCESS",
            recommendedAction: "CHECK_AUTHORIZATION",

            reason:
                "Target resource exists but access is denied.",

            confidence: 0.95
        };
    }

    if (
        heimdalData.classification ===
        "INVALID_TARGET"
    ) {

        return {
            decision: "CORRECT_INPUT",
            recommendedAction: "VERIFY_TARGET_FORMAT",

            reason:
                "Target is not a valid URL.",

            confidence: 1.0
        };
    }


    if (
        heimdalData.classification ===
        "OFFLINE_ENDPOINT"
    ) {

        return {
            decision: "REVIEW_REQUIRED",
            recommendedAction: "INVESTIGATE_CONNECTIVITY",

            reason:
                "Target endpoint could not be reached.",
            confidence: 0.90
        };
    }

    return {
        decision: "UNKNOWN",
        recommendedAction: "REVIEW_REQUIRED",
        reason:
            "Additional analysis required",
        confidence: 0.50
    };
}

console.log("ODIN LOADED");