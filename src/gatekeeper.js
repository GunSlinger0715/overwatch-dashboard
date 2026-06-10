export async function runGateKeeperScan() {

    const startTime = Date.now();

    try {

        const response =
            await fetch(
                "https://httpbin.org/get"
            );

        const endTime = Date.now();

        return {
            status:
                response.ok
                    ? "ONLINE"
                    : "OFFLINE",

            target:
                "https://httpbin.org/get",

            findings: 1,

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

            findings: 0,

            responseTime:
                endTime - startTime
        };
    }
}
