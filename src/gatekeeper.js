export async function runGateKeeperScan() {

    const startTime = Date.now();

    const response = await fetch("https://httpbin.org/get");

    const endTime = Date.now();

    return {
        status:
            response.ok
                ? "ONLINE"
                : "OFFLINE",

        target: "https://httpbin.org/get",

        findings: 1,

        responseTime:
            endTime - startTime
    };
}