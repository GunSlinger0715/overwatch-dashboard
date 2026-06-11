export async function runGateKeeperScan() {

    const startTime = Date.now();

    const findings = [];

    try {

        const response =
            await fetch(
                "https://httpbin.org/get"
            );

        if (response.ok) {

            findings.push({
                tpe: "ENDPOINT_REACHABLE",
                severity: "INFO"
            })
        }

        const endTime = Date.now();

        return {
            status:
                response.ok
                    ? "ONLINE"
                    : "OFFLINE",

            target:
                "https://httpbin.org/get",

            findings,

            responseTime:
                endTime - startTime
        };

    } catch (error) {

        console.error(
            "GateKeeper Scan Failed:",
            error
        );

        const endTime = Date.now();

        return {
            status: "OFFLINE",

            target:
                "https://httpbin.org/get",

            findings: [],

            responseTime:
                endTime - startTime
        };
    }
}
