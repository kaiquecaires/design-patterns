import Password, { PasswordFactory } from "./Password";

export default class Account {
    private readonly passwordValidator: Password

    constructor(
        readonly name: string,
        readonly email: string,
        readonly document: string,
        readonly passwordType: string,
        readonly password: string
    ) {
        if (name.length < 3) {
            throw new Error("Invalid name length");
        }

        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            throw new Error("Invalid email");
        }

        if (document.length !== 11) {
            throw new Error("Invalid document");
        }

        this.passwordValidator = PasswordFactory.create(passwordType, password)
    }

    passwordMatches (password: string): boolean {
		return this.passwordValidator.passwordMatches(password);
	}
}
