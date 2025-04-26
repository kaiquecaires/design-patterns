import LoanRepository from "./LoanRepository";
import InstallmentRepository from "./InstallmentRepository";
import RepositoryFactory from "./RepositoryFactory";
import LoanFactory from "./LoanFactory";

export default class ApplyForLoan {
    readonly loanRepository: LoanRepository
    readonly installmentRepository: InstallmentRepository
    
    constructor (
        readonly repositoryFactory: RepositoryFactory,
        readonly loanFactory: LoanFactory,
    ) {
        this.loanRepository = repositoryFactory.createLoanRepository();
        this.installmentRepository = repositoryFactory.createInstallmentRepository();
    }

    async execute (input: Input): Promise<Output> {
        const loan = this.loanFactory.createLoan(input.amount, input.income, input.installments);
        const installmentCalculator = this.loanFactory.createInstallmentCalculator();
        const installments = installmentCalculator.calculate(loan);
        await this.loanRepository.save(loan);
        for (const installment of installments) {
            await this.installmentRepository.save(installment);
        }
        return {
            loanId: loan.loanId,
        };
    }
}

type Input = {
    amount: number,
    income: number,
    installments: number,
};

type Output = {
    loanId: string,
};
