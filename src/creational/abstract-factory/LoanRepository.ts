import Loan from "./Loan";

export default interface LoanRepository {
    save (loan: Loan): Promise<void>;
    getById (loanId: string): Promise<Loan>;
}

export class LoanRepositoryMemory implements LoanRepository {
    static instance: LoanRepository;

    loans: Loan[];

    private constructor () {
        this.loans = [];
    }

    static getInstance() {
        if (!LoanRepositoryMemory.instance) {
            LoanRepositoryMemory.instance = new LoanRepositoryMemory();
        }
        return this.instance
    }

    async save (loan: Loan): Promise<void> {
        this.loans.push(loan)
    }

    async getById(loanId: string): Promise<Loan> {
        const loan = this.loans.find((loan) => loan.loanId === loanId);
        if (!loan) throw new Error("Loan not found");
        return loan
    }
}
