import { CosmosClient } from "../../CosmosClient";
import { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions, RequestOptions, Response } from "../../request";
import { Container } from "../Container";
import { UserDefinedFunction } from "./UserDefinedFunction";
import { UserDefinedFunctionDefinition } from "./UserDefinedFunctionDefinition";
import { UserDefinedFunctionResponse } from "./UserDefinedFunctionResponse";

export class UserDefinedFunctions {
  private client: CosmosClient;
  constructor(public readonly container: Container) {
    this.client = this.container.database.client;
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
  public async create(
    body: UserDefinedFunctionDefinition,
    options?: RequestOptions
  ): Promise<UserDefinedFunctionResponse> {
    const response = await this.client.documentClient.createUserDefinedFunction(this.container.url, body, options);
    const ref = new UserDefinedFunction(this.container, response.result.id);
    return { body: response.result, headers: response.headers, ref, userDefinedFunction: ref, udf: ref };
  }

  /**
   * Upsert a UserDefinedFunction.
   * <p>
   * Azure Cosmos DB supports JavaScript UDFs which can be used inside queries, stored procedures and triggers. <br>
   * For additional details, refer to the server-side JavaScript API documentation.
   * </p>
   */
  public async upsert(
    body: UserDefinedFunctionDefinition,
    options?: RequestOptions
  ): Promise<UserDefinedFunctionResponse> {
    const response = await this.client.documentClient.upsertUserDefinedFunction(this.container.url, body, options);
    const ref = new UserDefinedFunction(this.container, response.result.id);
    return { body: response.result, headers: response.headers, ref, userDefinedFunction: ref, udf: ref };
  }
}
