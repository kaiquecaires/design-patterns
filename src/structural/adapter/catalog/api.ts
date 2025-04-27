import GetProduct from "./GetProduct";
import { ProductRepositoryMemory } from "./ProductRepository";
import { ExpressAdapter } from "./HttpServer";

const productRepository = new ProductRepositoryMemory();
const getProduct = new GetProduct(productRepository);

const httpServer = new ExpressAdapter();
httpServer.register("get", "/products/:productId", async (params: any, body: any) => {
    const productId = parseInt(params.productId);
    const output = await getProduct.execute(productId);
    return output;
})
httpServer.listen(3001);
