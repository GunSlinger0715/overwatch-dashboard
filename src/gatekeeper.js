export async function runGateKeeperScan(target) {

    const startTime = Date.now();

    const findings = [];

    try {
        new URL(target);
    } catch {

        return {
            status: "INVALID_TARGET",
            target,
            findings: [{
                type: "INVALID_TARGET",
                severity: "HIGH"
            }],
            responseTime: 0
        };
    }


    try {

        const response =
            await fetch(target);

        if (response.ok) {

            findings.push({
                type: "ENDPOINT_REACHABLE",
                severity: "INFO"
            })
        }

        const endTime = Date.now();

        return {
            status:
                response.ok
                    ? "ONLINE"
                    : "OFFLINE",

            httpStatus:
                response.status,

            target: target,

            findings,

            responseTime:
                endTime - startTime
        };

    } catch (error) {

        console.error(
            "GateKeeper Scan Failed:",
            error
        );

        findings.push({
            type: "ENDPOINT_UNREACHABLE",
            severity: "HIGH"
        });

        const endTime = Date.now();

        return {
            status: "OFFLINE",

            httpStatus: null,

            target: target,

            findings,

            responseTime:
                endTime - startTime
        };
    }
}
