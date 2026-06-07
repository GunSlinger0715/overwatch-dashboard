export function generateNarrative(
    heimdalData,
    recordCount,
    odinData
) {

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
`;
}