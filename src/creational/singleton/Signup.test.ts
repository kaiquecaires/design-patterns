import Login from "./Login";
import Signup from "./Signup";
import { UserRepositoryMemory } from "./UserRepository";

test("Deve criar uma conta de usuário", async () => {
    const userRepository = UserRepositoryMemory.getInstance();

    const signup = new Signup(userRepository);

    const inputSignup = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        password: "123",
    };

    await signup.execute(inputSignup);

    const login = new Login(userRepository);

    const inputLogin = {
        email: "john.doe@gmail.com",
        password: "123",
    };

    const outputLogin = await login.execute(inputLogin);

    expect(outputLogin.success).toBe(true);
});