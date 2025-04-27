import express, { Express } from "express";

export default interface HttpServer {
    register(method: 'get' | 'post', url: string, callback: Function): void;
    listen(port: number): void;
}

export class ExpressAdapter implements HttpServer {
    app: Express;

    constructor () {
        this.app = express();
    }

    register(method: 'get' | 'post', url: string, callback: Function): void {
        this.app[method](url, async (req, res) => {
            const output = await callback(req.params, req.body);
            res.json(output);
        });
    }

    listen(port: number): void {
       this.app.listen(port); 
    }
}