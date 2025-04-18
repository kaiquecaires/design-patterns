import User from "./User";
import UserRepository, { UserRepositoryMemory } from "./UserRepository";

export default class Signup {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(input: Input) {
        const user = User.create(input.name, input.email, input.password);
        await this.userRepository.save(user);
    }
}

type Input = {
    name: string,
    email: string,
    password: string,
};
