import Location from "./Location";
import Segment, { DistanceSegment, TimeSegment } from "./Segment";

export default abstract class Ride {
    lastLocation: Location;

    constructor(readonly rideId: string, location: Location) {
        this.lastLocation = location;
    }

    updateLocation(newLocation: Location) {
        this.lastLocation = newLocation;
    }

    abstract calculateFare(segments: Segment[]): number

    abstract createSegment(from: Location, to: Location): Segment;
}

export class DistanceRide extends Ride {
    calculateFare(segments: DistanceSegment[]) {
        let total = 0;
        for (const segment of segments) {
            total += segment.getDistance();
        }
        return total * 4;
    }

    createSegment(from: Location, to: Location): Segment {
        return new DistanceSegment(this.rideId, from, to);
    }

    static create(location: Location) {
        const rideId = crypto.randomUUID();
        return new DistanceRide(rideId, location);
    }
}

export class TimeRide extends Ride {
    calculateFare(segments: TimeSegment[]) {
        let total = 0;
        for (const segment of segments) {
            total += segment.getDiffInMinutes();
        }
        return total * 1;
    }

    createSegment(from: Location, to: Location): Segment {
        return new TimeSegment(this.rideId, from, to);
    }

    static create(location: Location) {
        const rideId = crypto.randomUUID();
        return new TimeRide(rideId, location);
    }
}
