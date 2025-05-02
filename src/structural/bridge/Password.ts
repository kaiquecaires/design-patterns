import crypto from "crypto";

export default interface Password {
    password: string
    passwordMatches(password: string): boolean
}

export class PasswordPlainText implements Password {
    constructor (readonly password: string) {}

    passwordMatches(password: string): boolean {
        return this.password === password;
    }
}

export class PasswordSHA1 implements Password {
    password: string;

    constructor (password: string) {
        this.password = crypto.createHash("sha1").update(password).digest("hex")
    }

    passwordMatches(password: string): boolean {
        return this.password === crypto.createHash("sha1").update(password).digest("hex");
    } 
}

export class PasswordFactory {
    static create(passwordType: string, password: string) {
        if (passwordType === "plaintext") {
            return new PasswordPlainText(password);
        }

        if (passwordType === "sha1") {
            return new PasswordSHA1(password);
        }

        throw new Error("Method not implemented")
    }
}
