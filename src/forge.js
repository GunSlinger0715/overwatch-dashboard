// =========================================================
// FORGE Remediation Engine
//
// Purpose:
// Transform intelligence findings
// into actionable recommendations.
//
// Philosophy:
// Understanding Without Action
// Creates No Value.
//
// =========================================================

export function generateRecommendation(
    classification
) {

    if (classification === "HEALTHY_ENDPOINT") {

        return {
            action: "NO_ACTION_REQUIRED",
            recommendation:
                "No corrective action is required at this time.",
            priority: "LOW"
        };
    }

    if (classification === "MISCONFIGURATION") {

        return {
            action: "REMEDIATE_CONFIGURATION",
            recommendation:
                "Review endpoint configuration, validate security headers, and verify access controls.",
            priority: "MEDIUM"
        };
    }

    if (classification === "MALICIOUS") {

        return {
            action: "ESCALATE_INCIDENT",
            recommendation:
                "Preserve evidence, escalate immediately, and route for investigation.",
            priority: "HIGH"
        };
    }

    return {
        action: "REVIEW_REQUIRED",
        recommendation:
            "Additional investigation is required before action can be determined.",
        priority: "UNKNOWN"
    };
}