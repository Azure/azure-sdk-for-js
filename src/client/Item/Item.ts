import { UriFactory } from "../../common";
import { CosmosClient } from "../../CosmosClient";
import { RequestOptions, Response } from "../../request";
import { Container } from "../Container";
import { ItemResponse } from "./ItemResponse";

export class Item {

    private client: CosmosClient;
    public get url() {
        return UriFactory.createDocumentUri(this.container.database.id, this.container.id, this.id);
    }

    constructor(
        public readonly container: Container,
        public readonly id: string,
        public readonly primaryKey: string) {
        this.client = this.container.database.client;
    }

    public read(options?: RequestOptions): Promise<ItemResponse<any>>;
    public read<T>(options?: RequestOptions): Promise<ItemResponse<T>>;
    public async read<T>(options?: RequestOptions): Promise<ItemResponse<T>> {
        options = options || {};
        if ((!options || !options.partitionKey) && this.primaryKey) {
            options.partitionKey = this.primaryKey;
        }
        const response = await (this.client.documentClient.readDocument(this.url, options) as Promise<Response<T>>);
        return {body: response.result, headers: response.headers, ref: this, item: this};
    }

    public replace(body: any, options?: RequestOptions): Promise<ItemResponse<any>>;
    public replace<T>(body: T, options?: RequestOptions): Promise<ItemResponse<T>>;
    public async replace<T>(body: T, options?: RequestOptions): Promise<ItemResponse<T>> {
        options = options || {};
        if ((!options || !options.partitionKey) && this.primaryKey) {
            options.partitionKey = this.primaryKey;
        }
        const response = await (this.client.documentClient
            .replaceDocument(this.url, body, options) as Promise<Response<T>>);
        return {body: response.result, headers: response.headers, ref: this, item: this};
    }

    public delete(options?: RequestOptions): Promise<ItemResponse<any>>;
    public delete<T>(options?: RequestOptions): Promise<ItemResponse<T>>;
    public async delete<T>(options?: RequestOptions): Promise<ItemResponse<T>> {
        options = options || {};
        if ((!options || !options.partitionKey) && this.primaryKey) {
            options.partitionKey = this.primaryKey;
        }
        const response = await (this.client.documentClient.deleteDocument(this.url, options) as Promise<Response<T>>);
        return {body: response.result, headers: response.headers, ref: this, item: this};
    }
}
