import { CosmosClient } from "../../CosmosClient";
import { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions, RequestOptions } from "../../request";
import { Container } from "../Container";
import { StoredProcedure } from "./StoredProcedure";
import { StoredProcedureDefinition } from "./StoredProcedureDefinition";
import { StoredProcedureResponse } from "./StoredProcedureResponse";

/**
 * Operations for creating, upserting, or reading/querying all Stored Procedures.
 *
 * For operations to read, replace, delete, or execute a specific, existing stored procedure by id, see `container.storedProcedure()`.
 */
export class StoredProcedures {
  private client: CosmosClient;
  /**
   * @param container The parent {@link Container}.
   * @hidden
   */
  constructor(public readonly container: Container) {
    this.client = this.container.database.client;
  }

  /**
   * Query all Stored Procedures.
   * @param query Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   * @param options
   * @example Read all stored procedures to array.
   * ```typescript
   * const querySpec: SqlQuerySpec = {
   *   query: "SELECT * FROM root r WHERE r.id = @sproc",
   *   parameters: [
   *     {name: "@sproc", value: "Todo"}
   *   ]
   * };
   * const {body: sprocList} = await containers.storedProcedures.query(querySpec).toArray();
   * ```
   */
  public query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<StoredProcedureDefinition> {
    return this.client.documentClient.queryStoredProcedures(this.container.url, query, options);
  }

  /**
   * Read all stored procedures.
   * @param options
   * @example Read all stored procedures to array.
   * ```typescript
   * const {body: sprocList} = await containers.storedProcedures.readAll().toArray();
   * ```
   */
  public readAll(options?: FeedOptions): QueryIterator<StoredProcedureDefinition> {
    return this.client.documentClient.readStoredProcedures(this.container.url, options);
  }

  /**
   * Create a StoredProcedure.
   *
   * Azure Cosmos DB allows stored procedures to be executed in the storage tier,
   * directly against an item container. The script
   * gets executed under ACID transactions on the primary storage partition of the
   * specified container. For additional details,
   * refer to the server-side JavaScript API documentation.
   */
  public async create(body: StoredProcedureDefinition, options?: RequestOptions): Promise<StoredProcedureResponse> {
    const response = await this.client.documentClient.createStoredProcedure(this.container.url, body, options);
    const ref = new StoredProcedure(this.container, response.result.id);
    return { body: response.result, headers: response.headers, ref, storedProcedure: ref, sproc: ref };
  }

  /**
   * Upsert a StoredProcedure.
   *
   * Azure Cosmos DB allows stored procedures to be executed in the storage tier,
   * directly against a document container. The script
   * gets executed under ACID transactions on the primary storage partition of the
   *  specified container. For additional details,
   * refer to the server-side JavaScript API documentation.
   *
   */
  public async upsert(body: StoredProcedureDefinition, options?: RequestOptions): Promise<StoredProcedureResponse> {
    const response = await this.client.documentClient.upsertStoredProcedure(this.container.url, body, options);
    const ref = new StoredProcedure(this.container, response.result.id);
    return { body: response.result, headers: response.headers, ref, storedProcedure: ref, sproc: ref };
  }
}
