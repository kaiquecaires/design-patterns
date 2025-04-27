import FlightTicketBuilder from "./FlightTicketBuilder";

test("Deve criar uma passagem aérea", async () => {
    const flightTicket = new FlightTicketBuilder()
        .setFlight("Azul", "9876")
        .setTrip("FLN", "GRU")
        .setPassenger("John Doe", "john.doe@gmail.com", "111.111.111-11", "M")
        .setEmergencyContact("Bob simpson", "5511999999999")
        .setSeat("8A")
        .setCheckedBags(2)
        .setCheckinInformation(true, "1", "4A")
        .setPriority(5)
        .build();

    expect(flightTicket.passengerName).toBe("John Doe");
});
