import ApplyForLoan from "./ApplyForLoan";
import GetLoan from "./GetLoan";
import { MortgageLoanFactory } from "./LoanFactory";
import { RepositoryMemoryFactory } from "./RepositoryFactory";

test("Deve solicitar um financiamento imobiliário", async () => {
    const repositoryFactory = new RepositoryMemoryFactory();
    const loanFactory = new MortgageLoanFactory();

    const applyForLoan = new ApplyForLoan(repositoryFactory, loanFactory);

    const input = {
        amount: 100_000,
        income: 10_000,
        installments: 240,
    };
    const outputApplyForLoan = await applyForLoan.execute(input);

    const getLoan = new GetLoan(repositoryFactory);
    const outputGetLoan = await getLoan.execute(outputApplyForLoan);

    expect(outputGetLoan.amount).toBe(100_000);
    expect(outputGetLoan.income).toBe(10_000);

    expect(outputGetLoan.installments[0].number).toBe(1);
    expect(outputGetLoan.installments[0].amount).toBe(1250);
    expect(outputGetLoan.installments[0].amortization).toBe(416.67)
    expect(outputGetLoan.installments[0].interest).toBe(833.33)
    expect(outputGetLoan.installments[0].balance).toBe(99_583.33);

    expect(outputGetLoan.installments[239].number).toBe(240);
    expect(outputGetLoan.installments[239].amount).toBe(420.14);
    expect(outputGetLoan.installments[239].amortization).toBe(416.67)
    expect(outputGetLoan.installments[239].interest).toBe(3.47)
    expect(outputGetLoan.installments[239].balance).toBe(0);
});
