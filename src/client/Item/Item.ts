import { Constants, UriFactory } from "../../common";
import { CosmosClient } from "../../CosmosClient";
import { RequestOptions, Response } from "../../request";
import { Container } from "../Container";

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

    public read(options?: RequestOptions): Promise<Response<any>>;
    public read<T>(options?: RequestOptions): Promise<Response<T>>;
    public read<T>(options?: RequestOptions): Promise<Response<T>> {
        options = options || {};
        if ((!options || !options.partitionKey) && this.primaryKey) {
            options.partitionKey = this.primaryKey;
        }
        return this.client.documentClient.readDocument(this.url, options) as Promise<Response<T>>;
    }

    public replace(body: any, options?: RequestOptions): Promise<Response<any>>;
    public replace<T>(body: T, options?: RequestOptions): Promise<Response<T>>;
    public replace<T>(body: T, options?: RequestOptions): Promise<Response<T>> {
        options = options || {};
        if ((!options || !options.partitionKey) && this.primaryKey) {
            options.partitionKey = this.primaryKey;
        }
        return this.client.documentClient.replaceDocument(this.url, body, options) as Promise<Response<T>>;
    }

    public delete(options?: RequestOptions): Promise<Response<any>>;
    public delete<T>(options?: RequestOptions): Promise<Response<T>>;
    public delete<T>(options?: RequestOptions): Promise<Response<T>> {
        options = options || {};
        if ((!options || !options.partitionKey) && this.primaryKey) {
            options.partitionKey = this.primaryKey;
        }
        return this.client.documentClient.deleteDocument(this.url, options) as Promise<Response<T>>;
    }
}
