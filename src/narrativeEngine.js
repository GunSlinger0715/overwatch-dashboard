export function generateNarrative(
    heimdalData,
    recordCount,
    odinData
) {


    let assessment = "";

    if (heimdalData.classification === "HEALTHY_ENDPOINT") {

        assessment = `
OVERWATCH Assessment

The endpoint appears healthy.

No immediate escalation is required.

The observation has been archived
    for future correlation.
`;

    } else if (heimdalData.classification === "MISCONFIGURATION") {

        assessment = `
OVERWATCH Assessment

A recoverable configuration issue
has been identified.

Corrective action is recommended.

The finding has been routed
to Forge for review.
`;

    } else if (heimdalData.classification === "MALICIOUS") {

        assessment = `
OVERWATCH Assessment

Potential hostile indicators
have been detected.

Immediate escalation
is recommended.
`;

    } else {

        assessment = `
OVERWATCH Assessment

Additional analysis is required.

The observation has been retained
    for further investigation.
`;
    }

    return `
GateKeeper completed a scan
against the target endpoint.

Heimdal classified the endpoint
as ${heimdalData.classification}.

Monolith currently contains
${recordCount} observations.

Odin determined the condition
was ${odinData.decision} and
recommended ${odinData.recommendedAction}.

 Reason:
${odinData.reason}

Assessment confidence:
${Math.round(odinData.confidence * 100)}%.

 ${assessment}
 `;


}