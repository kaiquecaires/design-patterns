import UserRepository, { UserRepositoryMemory } from "./UserRepository";

export default class Login {
    constructor (private readonly userRepository: UserRepository) {}

    async execute(input: Input): Promise<Output> {
        const user = await this.userRepository.getByEmail(input.email);

        const success = user.passwordMatches(input.password)
        
        return {
            success,
        };
    }
}

type Input = {
    email: string,
    password: string,
};

type Output = {
    success: boolean,
};