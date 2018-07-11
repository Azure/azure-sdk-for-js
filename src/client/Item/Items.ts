import { DocumentClient } from "../../documentclient";
import { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions, RequestOptions, Response } from "../../request";
import { Container } from "../Container";
import { Item } from "./Item";
import { ItemResponse } from "./ItemResponse";

export class Items {
    private client: DocumentClient;
    constructor(public readonly container: Container) {
        this.client = this.container.database.client.documentClient;
    }

    public query(query: string | SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
    public query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
    public query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T> {
        return this.client.queryDocuments(this.container.url, query, options) as QueryIterator<T>;
    }

    public readAll(options?: FeedOptions): QueryIterator<any>;
    public readAll<T>(options?: FeedOptions): QueryIterator<T>;
    public readAll<T>(options?: FeedOptions): QueryIterator<T> {
        return this.client.readDocuments(this.container.url, options) as QueryIterator<T>;
    }

    /**
     * Create a item.
     * <p>
     * There is no set schema for JSON items. They may contain any number of custom properties as \
     * well as an optional list of attachments. <br>
     * A item is an application resource and can be authorized using the master key or resource keys
     * </p>
     * @param body  - Represents the body of the item. Can contain any number of user defined properties.
     */
    public async create(body: any, options?: RequestOptions): Promise<ItemResponse<any>>;
    public async create<T>(body: T, options?: RequestOptions): Promise<ItemResponse<T>>;
    public async create<T>(body: T, options?: RequestOptions): Promise<ItemResponse<T>> {
        const response = await (this.client.createDocument(this.container.url, body, options) as Promise<Response<T>>);
        const ref = new Item(this.container, (response.result as any).id, options.partitionKey as string);
        return {body: response.result, headers: response.headers, ref, item: ref};
    }

    /**
     * Upsert an item.
     * <p>
     * There is no set schema for JSON items. They may contain any number of custom properties.<br>
     * An Item is an application resource and can be authorized using the master key or resource keys
     * </p>
     */
    public async upsert(body: any, options?: RequestOptions): Promise<ItemResponse<any>>;
    public async upsert<T>(body: T, options?: RequestOptions): Promise<ItemResponse<T>>;
    public async upsert<T>(body: T, options?: RequestOptions): Promise<ItemResponse<T>> {
        const response = await this.client.upsertDocument(this.container.url, body, options);
        const ref = new Item(this.container, (response.result as any).id, options.partitionKey as string);
        return {body: response.result, headers: response.headers, ref, item: ref};
    }
}
