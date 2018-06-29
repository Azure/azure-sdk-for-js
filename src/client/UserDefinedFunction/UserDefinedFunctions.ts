import { CosmosClient } from "../../CosmosClient";
import { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions, RequestOptions, Response } from "../../request";
import { Container } from "../Container";
import { UserDefinedFunction } from "./UserDefinedFunction";
import { UserDefinedFunctionDefinition } from "./UserDefinedFunctionDefinition";

export class UserDefinedFunctions {
    private client: CosmosClient;
    constructor(public readonly container: Container) {
        this.client = this.container.database.client;
     }

    public get(id: string): UserDefinedFunction {
        return new UserDefinedFunction(this.container, id);
    }

    public query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<UserDefinedFunctionDefinition> {
        return this.client.documentClient.queryUserDefinedFunctions(this.container.url, query, options);
    }

    public readAll(options?: FeedOptions): QueryIterator<UserDefinedFunctionDefinition> {
        return this.client.documentClient.readUserDefinedFunctions(this.container.url, options);
    }

    /**
     * Create a UserDefinedFunction.
     * <p>
     * Azure Cosmos DB supports JavaScript UDFs which can be used inside queries, stored procedures and triggers. <br>
     * For additional details, refer to the server-side JavaScript API documentation.
     * </p>
     */
    public create(
        body: UserDefinedFunctionDefinition,
        options?: RequestOptions,
    ): Promise<Response<UserDefinedFunctionDefinition>> {
        return this.client.documentClient.createUserDefinedFunction(this.container.url, body, options);
    }

    /**
     * Upsert a UserDefinedFunction.
     * <p>
     * Azure Cosmos DB supports JavaScript UDFs which can be used inside queries, stored procedures and triggers. <br>
     * For additional details, refer to the server-side JavaScript API documentation.
     * </p>
     */
    public upsert(
        body: UserDefinedFunctionDefinition,
        options?: RequestOptions,
    ): Promise<Response<UserDefinedFunctionDefinition>> {
        return this.client.documentClient.upsertUserDefinedFunction(this.container.url, body, options);
    }
}
