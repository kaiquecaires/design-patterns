import Account from "./Account";

export default class Driver extends Account {
    constructor(
        readonly name: string,
        readonly email: string,
        readonly document: string,
        readonly carPlate: string,
        readonly passwordType: string,
        readonly password: string,
    ) {
        super(name, email, document, passwordType, password);

        if (carPlate.length !== 7) {
            throw new Error("Invalid car plate");
        }
    }
}