import CalculateFare from "./CalculateFare";
import Location from "./Location";
import { DistanceRide, TimeRide } from "./Ride";
import { RideRepositoryMemory } from "./RideRepository";
import { SegmentRepositoryMemory } from "./SegmentRepository";
import UpdateLocation from "./UpdateLocation";

test("Deve atualizar a localização de uma corrida por distância", async () => {
    const rideRepository = new RideRepositoryMemory();
    const segmentRepository = new SegmentRepositoryMemory();

    const location = new Location(-27.584905257808835, -48.545022195325124, new Date("2021-03-01T10:00:00"));
    const ride = new DistanceRide(location);

    rideRepository.save(ride);

    const updateLocation = new UpdateLocation(rideRepository, segmentRepository);

    const input = {
        rideId: ride.rideId,
        lat: -27.496887588317275,
		long: -48.522234807851476,
		date: new Date("2021-03-01T12:00:00"),
    };

    await updateLocation.execute(input);

    const calculateFare = new CalculateFare(rideRepository, segmentRepository);
    const output = await calculateFare.execute(ride.rideId);

    expect(output.fare).toBe(40);
});

test("Deve atualizar a localização de uma corrida por tempo", async () => {
    const rideRepository = new RideRepositoryMemory();
    const segmentRepository = new SegmentRepositoryMemory();

    const location = new Location(-27.584905257808835, -48.545022195325124, new Date("2021-03-01T10:00:00"));
    const ride = new TimeRide(location);

    rideRepository.save(ride);

    const updateLocation = new UpdateLocation(rideRepository, segmentRepository);

    const input = {
        rideId: ride.rideId,
        lat: -27.496887588317275,
		long: -48.522234807851476,
		date: new Date("2021-03-01T12:00:00"),
    };

    await updateLocation.execute(input);

    const calculateFare = new CalculateFare(rideRepository, segmentRepository);
    const output = await calculateFare.execute(ride.rideId);

    expect(output.fare).toBe(120);
});
