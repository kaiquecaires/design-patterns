import Account from "./Account";

export default class Passenger extends Account {
    constructor(
        readonly name: string,
        readonly email: string,
        readonly document: string,
        readonly cardHolder: string,
        readonly cardNumber: string,
        readonly expDate: string,
        readonly cvv: string,
        readonly passwordType: string,
        readonly password: string
    ) {
        super(name, email, document, passwordType, password);

        if (cvv.length !== 3) {
            throw new Error("Invalid CVV");
        }
    }
}
