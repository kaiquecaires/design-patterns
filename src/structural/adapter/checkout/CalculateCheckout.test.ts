import CalculateCheckout from "./CalculateCheckout";
import { CatalogGatewayHttp } from "./CatalogGateway";
import { AxiosAdapter } from "./HttpClient";

test("Deve calcular o checkout", async () => {
    const input = {
        items: [
            { productId: 1, quantity: 1 },
            { productId: 2, quantity: 2 },
            { productId: 3, quantity: 3 },
        ]
    };

    const httpClient = new AxiosAdapter();
    const catelogGateway = new CatalogGatewayHttp(httpClient);
    const calculateCheckout = new CalculateCheckout(catelogGateway);
    const output = await calculateCheckout.execute(input);
    expect(output.total).toBe(1400);
});
