import Location from "./Location";
import { DistanceRide, TimeRide } from "./Ride";
import Segment, { DistanceSegment, TimeSegment } from "./Segment";

test("Deve criar e calcular a tarifa de uma corrida por distância", () => {
    const location = new Location(-27.584905257808835, -48.545022195325124, new Date("2021-03-01T10:00:00"));
    const newLocation = new Location(-27.496887588317275, -48.522234807851476, new Date("2021-03-01T12:00:00"));

    const ride = new DistanceRide(location);

    const segment = new DistanceSegment(
        ride.rideId,
        location,
        newLocation,
    );

    ride.updateLocation(newLocation);

    const fare = ride.calculateFare([segment]);

    expect(fare).toBe(40);
});

test("Deve criar e calcular a tarifa de uma corrida por tempo", () => {
    const location = new Location(-27.584905257808835, -48.545022195325124, new Date("2021-03-01T10:00:00"));
    const newLocation = new Location(-27.496887588317275, -48.522234807851476, new Date("2021-03-01T12:00:00"));

    const ride = new TimeRide(location);

    const segment = new TimeSegment(
        ride.rideId,
        location,
        newLocation,
    );

    ride.updateLocation(newLocation);

    const fare = ride.calculateFare([segment]);

    expect(fare).toBe(120);
});
