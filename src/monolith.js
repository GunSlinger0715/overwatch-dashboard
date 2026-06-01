const observations = [];

export function storeObservation(observation) {

    observations.push({
        timestamp: new Date().toISOString(),
        observation
    });

    return observations.length;
}

export function getObservationCount() {
    return observations.length;
}

export function getObservations() {
    return observations;
}