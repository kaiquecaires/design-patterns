import Location from "./Location";
import * as crypto from "crypto";
import Segment, { DistanceSegment, TimeSegment } from "./Segment";

export default abstract class Ride {
    rideId: string;
    lastLocation: Location;

    constructor(location: Location) {
        this.rideId = crypto.randomUUID();
        this.lastLocation = location;
    }

    updateLocation(newLocation: Location) {
        this.lastLocation = newLocation;
    }

    abstract calculateFare(segments: Segment[]): number

    abstract createSegment(rideId: string, from: Location, to: Location): Segment;
}

export class DistanceRide extends Ride {
    calculateFare(segments: DistanceSegment[]) {
        let total = 0;
        for (const segment of segments) {
            total += segment.getDistance();
        }
        return total * 4;
    }

    createSegment(rideId: string, from: Location, to: Location): Segment {
        return new DistanceSegment(rideId, from, to);
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

    createSegment(rideId: string, from: Location, to: Location): Segment {
        return new TimeSegment(rideId, from, to);
    }
}
