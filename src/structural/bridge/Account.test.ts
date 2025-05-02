import Driver from "./Driver";
import Passenger from "./Passenger";

test("Deve criar uma conta de usuário do tipo passageiro", async () => {
    const account = new Passenger("John Doe", "johndoe@email.com", "11111111111", "JOHN DOE", "1111 1111 1111 1111", "08/28", "123", "sha1", "123456");
    expect(account.name).toBe("John Doe");
    expect(account.email).toBe("johndoe@email.com");
    expect(account.passwordMatches("123456"));
});

test("Não deve criar uma conta de usuário do tipo passageiro com dados inválidos", async () => {
    expect(() => new Passenger("Jo", "johndoe@email.com", "11111111111", "JOHN DOE", "1111 1111 1111 1111", "08/28", "123", "sha1", "123456")).toThrow("Invalid name length");
    expect(() => new Passenger("John", "johndoe.com", "11111111111", "JOHN DOE", "1111 1111 1111 1111", "08/28", "123", "sha1", "123456")).toThrow("Invalid email");
    expect(() => new Passenger("John", "johndoe@email.com", "111", "JOHN DOE", "1111 1111 1111 1111", "08/28", "123", "sha1", "123456")).toThrow("Invalid document");
    expect(() => new Passenger("John", "johndoe@email.com", "11111111111", "JOHN DOE", "1111 1111 1111 1111", "08/28", "12", "sha1", "123456")).toThrow("Invalid CVV");
});

test("Deve criar uma conta de usuário do tipo motorista", async () => {
    const account = new Driver("John Doe", "johndoe@email.com", "11111111111", "aaa1234", "plaintext", "123456");
    expect(account.name).toBe("John Doe");
    expect(account.email).toBe("johndoe@email.com");
    expect(account.passwordMatches("123456"));
});

test("Não deve criar uma conta de usuário do tipo motorista com dados inválidos", async () => {
    expect(() => new Driver("Jo", "johndoe@email.com", "11111111111", "aaa1234", "sha1", "123456")).toThrow("Invalid name length");
    expect(() => new Driver("John", "johndoe.com", "11111111111", "aaa1234", "sha1", "123456")).toThrow("Invalid email");
    expect(() => new Driver("John", "johndoe@email.com", "1111", "aaa1234", "sha1", "123456")).toThrow("Invalid document");
    expect(() => new Driver("John", "johndoe@email.com", "11111111111", "aaa123", "sha1", "123456")).toThrow("Invalid car plate");
});
