import { PriceInstallmentCalculator, SACInstallmentCalculator } from "./InstallmentCalculator";
import { MortgageLoan } from "./Loan";

test("Deve calcular as parcelas utilizando SAC", () => {
    const installmentCalculator = new SACInstallmentCalculator();
    const loan = MortgageLoan.create(100_000, 10_000, 240);
    const installments = installmentCalculator.calculate(loan);

    expect(installments).toHaveLength(240);

    expect(installments[0].number).toBe(1);
    expect(installments[0].amount).toBe(1250);
    expect(installments[0].amortization).toBe(416.67)
    expect(installments[0].interest).toBe(833.33)
    expect(installments[0].balance).toBe(99_583.33);

    expect(installments[239].number).toBe(240);
    expect(installments[239].amount).toBe(420.14);
    expect(installments[239].amortization).toBe(416.67)
    expect(installments[239].interest).toBe(3.47)
    expect(installments[239].balance).toBe(0);
});

test("Deve calcular as parcelas utilizando Price", () => {
    const installmentCalculator = new PriceInstallmentCalculator();
    const loan = MortgageLoan.create(100_000, 10_000, 240);
    const installments = installmentCalculator.calculate(loan);

    // expect(installments).toHaveLength(240);
    expect(installments[0].number).toBe(1);
    expect(installments[0].amount).toBe(965.02);
    expect(installments[0].amortization).toBe(131.69)
    expect(installments[0].interest).toBe(833.33)
    expect(installments[0].balance).toBe(99_868.31);

    expect(installments[239].number).toBe(240);
    expect(installments[239].amount).toBe(965.02);
    expect(installments[239].amortization).toBe(957.03)
    expect(installments[239].interest).toBe(7.99)
    expect(installments[239].balance).toBe(0);
});

