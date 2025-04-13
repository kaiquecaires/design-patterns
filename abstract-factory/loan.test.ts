import { CarLoan, MortgageLoan } from "./Loan";

test("Deve criar um financiamento imobiliário", () => {
    const loan = MortgageLoan.create(100_000, 10_000, 240);
    expect(loan.loanId).toBeDefined();
    expect(loan.amount).toBe(100_000);
    expect(loan.income).toBe(10_000);
    expect(loan.installments).toBe(240);
});

test("Não deve criar um financiamento imobiliário com prazo superior a 420", () => {
    expect(() => MortgageLoan.create(100_000, 10_000, 450)).toThrow(new Error("The maximum number of installments for mortgage loan is 420"));    
});

test("Não deve criar um financiamento imobiliário caso a parcela ocupe um valor superior a 25% da renda mensal", () => {
    expect(() => MortgageLoan.create(200_000, 1000, 420)).toThrow(new Error("The installment amount could not exceed 25% of monthly income"));    
});

test("Não deve criar um financiamento veicular com prazo superior a 60 meses", () => {
    expect(() => CarLoan.create(100_000, 10_000, 72)).toThrow(new Error("The maximum number of installments for car loan is 60"));    
});

test("Não deve criar um financiamento veicular caso a parcela ocupe um valor superior a 30% da renda mensal", () => {
    expect(() => CarLoan.create(200_000, 1000, 60)).toThrow(new Error("The installment amount could not exceed 30% of monthly income"));    
});